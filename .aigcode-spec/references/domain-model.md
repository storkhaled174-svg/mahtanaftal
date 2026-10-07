# Domain Model Reference
> Fact layer - grounded expansion. Verify against code before editing.
> 更新后内容为当前累计修正；初版内容保留首次生成结果。关键结论仍以源码和最新确定性 reference 为准。

## 更新后内容

当前暂无需要覆盖初版的累计修正。

## 初版内容

### Bounded Contexts

系统划分为四个主要界限上下文（Bounded Contexts）：

| 限界上下文 (Context) | 职责边界 | 核心领域模型 |
| :--- | :--- | :--- |
| **Order & Fulfillment Context** | 负责全国轮胎预订订单的创建、主权编号生成、订单全周期状态流转与订单查询追踪 | `model:TireOrder`, `model:AlgerianWilaya` |
| **Inventory & Catalog Context** | 负责官方授权轮胎品牌（Continental 与 Iris）规格、分类、库存数量预警与官方售价维护 | `model:TireStock` |
| **Identity & Access Context** | 负责平台客户（CUSTOMER）及 Naftal 运营管理员（ADMIN）的身份认证与权限管理 | `model:AccountUser` |
| **Platform Content & Support Context** | 负责首页常见问题（FAQ）及官方客服/支持渠道信息的配置与公开展示 | `model:PlatformFaq`, `model:SupportChannel` |

---

### Aggregates

#### 1. TireOrder Aggregate
- **聚合根**: `model:TireOrder`
- **实体说明**: 代表客户在平台登记的官方轮胎预订订单。
- **关联关系**:
  - 关联所属注册客户 `model:AccountUser`（通过 `field:TireOrder.customerId` 可选外键关联）。
  - 依赖行政区划 `model:AlgerianWilaya` 数据校验省份与市镇。

#### 2. TireStock Aggregate
- **聚合根**: `model:TireStock`
- **实体说明**: 管理各轮胎品牌、规格及车辆类别的库存基准数据、预留库存与销售基准价格。

#### 3. AccountUser Aggregate
- **聚合根**: `model:AccountUser`
- **实体说明**: 平台的统一用户凭证模型，通过 `field:AccountUser.role` 区分角色为 `ADMIN` 或 `CUSTOMER`。

#### 4. AlgerianWilaya Aggregate
- **聚合根**: `model:AlgerianWilaya`
- **实体说明**: 阿尔及利亚 58 个省份及下辖市镇的官方标准行政区划数据实体（预置 Seed 数据）。

#### 5. Content & Support Aggregates
- **聚合根**: `model:PlatformFaq`, `model:SupportChannel`
- **实体说明**: 独立的平台服务内容实体，由管理员维护，向访客展示。

---

### Invariants And State Rules

#### 1. 订单状态机规则 (TireOrder Lifecycle)
订单状态 `field:TireOrder.status` 包含四种枚举值：`NEW`（新创建）、`PROCESSING`（处理中/配额分配）、`COMPLETED`（已完成提货）、`CANCELLED`（已取消）。状态流转严格遵循以下约束：

| 起始状态 | 目标状态 | 触发行为 / 操作说明 | 允许操作的角色与页面 | 事实依据 |
| :--- | :--- | :--- | :--- | :--- |
| `__create__` | `NEW` | 客户在前台提交预订表单并校验通过 | GUEST / CUSTOMER 在 `page:F01` | `evidence:state.001.F01.HomePage` |
| `NEW` | `PROCESSING` | 管理员开始处理订单并分配网点库存配额 | ADMIN 在 `page:B01` | `evidence:state.001.F01.HomePage` |
| `PROCESSING` | `COMPLETED` | 客户在 Naftal 官方网点完成核验与轮胎提货 | ADMIN 在 `page:B01` | `evidence:state.001.F01.HomePage` |
| `PROCESSING` | `CANCELLED` | 管理员因数据不符或配额不足取消处理中的订单 | ADMIN 在 `page:B01` | `evidence:state.001.F01.HomePage` |
| `NEW` | `CANCELLED` | 管理员直接驳回或取消新订单 | ADMIN 在 `page:B01` | `evidence:state.001.F01.HomePage` |

- **权限约束**: 订单的状态流转和修改仅允许由授权的管理人员在后台执行，前台用户无法自行变更订单状态（`evidence:rule.007`）。
- **查询规则**: 客户可通过订单编号（`field:TireOrder.orderNumber`）及手机号在 `page:F02` 查询状态并打印凭证（`evidence:flow.004.F02.OrderTracking`）。

#### 2. 订单业务不变量 (TireOrder Invariants)
- **品牌限定**: 预订品牌 `field:TireOrder.brand` 必须严格属于 `CONTINENTAL` 或 `IRIS`（`evidence:rule.007`）。
- **购买数量限制**: 单笔订单的订购轮胎数量必须严格为 1、2、3 或 4 条（`evidence:rule.007`）。
- **金额计算公式**: 总金额为封闭计算，必须满足 `total_price_dzd = unit_price_dzd * quantity`，不允许产生任何额外附加费用（`evidence:rule.007`）。
- **支付卡凭证格式**: 绑定的 EDAHABIA 卡号必须精确为 18 位纯数字字符，不得包含字母或符号，且必须包含 MM/YY 格式的到期日（`evidence:rule.007`）。
- **联系电话格式**: 主要联系电话与次要联系电话均为必填项，且必须符合阿尔及利亚有效移动号段（以 05、06 或 07 开头）（`evidence:rule.007`）。
- **订单编号格式**: 订单主权编号必须符合统一定义的 `NM-2026-XXXX` 格式（`evidence:rule.007`）。

#### 3. 库存与目录不变量 (TireStock Invariants)
- **品牌受限**: 库存项品牌 `field:TireStock.brand` 仅支持 `CONTINENTAL` 与 `IRIS`，禁止录入未授权品牌（`evidence:rule.004`）。
- **自动售罄机制**: 当可用库存 `available_stock` 归零时，该规格的可用状态自动置为不可用（`evidence:rule.004`）。
- **管理权限受限**: 价格与库存数量仅允许具备 `ADMIN` 权限的操作员在 `page:B01` 与 `page:B04` 进行维护调整（`evidence:rule.004`）。

#### 4. 账户与安全不变量 (AccountUser Invariants)
- **用户名唯一性**: 用户名必须在平台全局唯一，不得重复（`evidence:rule.002`）。
- **角色不可篡改**: 账户的 `field:AccountUser.role`（`ADMIN` 或 `CUSTOMER`）严禁用户自行提升或跨权限修改，仅限授权的系统管理人员调整（`evidence:rule.002`）。

#### 5. 行政区划不变量 (AlgerianWilaya Invariants)
- **标准代码与区划联动**: 省份代码为 01 至 58 的阿尔及利亚官方预置数据，选定的市镇（commune）必须隶属于所选择的省份（wilaya），不得跨省选定（`evidence:rule.003`）。

#### 6. 内容与渠道不变量 (PlatformFaq & SupportChannel Invariants)
- **发布状态过滤**: 只有标记为活跃状态（`is_active = true`）的常见问题 `model:PlatformFaq` 与服务渠道 `model:SupportChannel` 才允许在公共页面展示（`evidence:rule.005`, `evidence:rule.006`）。

---

### Unknowns

1. **库存联动扣减时机**: 订单从 `NEW` 转换至 `PROCESSING` 或 `CANCELLED` 时，`TireStock` 中 `available_stock` 与 `reserved_stock` 的具体原子扣减/释放触发机制在当前规范中未显式定义，需查阅后端库存服务代码确认。
2. **身份证号与支付卡加密存储标准**: 规范指明全国身份证号与 18 位 EDAHABIA 卡号为敏感加密存储，具体加密算法（如 AES-GCM 或哈希脱敏）需根据后台具体基础设施代码实现确认。
