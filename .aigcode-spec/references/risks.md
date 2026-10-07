# Known Risks
> Derived guidance - verify against code.
> 更新后内容为当前累计修正；初版内容保留首次生成结果。关键结论仍以源码和最新确定性 reference 为准。

## 更新后内容

### 风险与约束累计修正

- **页面与支付画像工程事实校准**：当前识别到 `page:B01`、`page:B02`、`page:B03`、`page:B04`、`page:B05`、`page:F01`、`page:F02`、`page:F03`、`page:F04` 及 `payment:profile` 的相关元数据与引用关联调整。当前未发现新增跨角色/跨页隐藏耦合、状态机跃迁异常或新增写入侧风险证据。
- **初版已知风险基线维持**：初版关于订单状态流转权限校验、库存扣减与可用性同步、角色隔离、金色卡（Dahabia）及身份数据脱敏、行政区划级联归属校验以及封闭价格核算等已知约束与风险定义保持有效，后续修改涉及模块时需以实际源码实现为准进行核对。

## 初版内容

### 状态机与并发风险 (State Machine & Concurrency Risks)

| 风险项 | 涉及实体与页面 | 核心规则与潜在风险 | 事实依据 |
| :--- | :--- | :--- | :--- |
| **订单状态非法越权跃迁** | `model:TireOrder`<br>`page:F01`, `page:B01` | 订单生命周期中，前台 `page:F01` 仅允许触发 `__create__` $\rightarrow$ `NEW`；后续状态流转（`NEW` $\rightarrow$ `PROCESSING`、`PROCESSING` $\rightarrow$ `COMPLETED`、`NEW/PROCESSING` $\rightarrow$ `CANCELLED`）必须严格限制在后台 `page:B01` 由管理员触发。若后端状态变更接口缺少针对 `ADMIN` 角色的显式校验，可能导致外部调用直接修改 `field:TireOrder.status`。 | `evidence:state.001.F01.HomePage`, `evidence:rule.007` |
| **库存超卖与可用性状态失步** | `model:TireStock`, `model:TireOrder`<br>`page:F01`, `page:B01`, `page:B04` | 轮胎品牌 `field:TireStock.brand` 仅限 `CONTINENTAL` 和 `IRIS`。当 `available_stock` 降至 0 时，规格必须自动变为不可用（`is_available = false`）。在高并发下单场景下，若未在数据库事务中对库存扣减与预留加排他锁，可能导致超卖或库存状态与实际物理可用量不一致。 | `evidence:rule.004`, `evidence:rule.007` |

---

### 权限与数据边界风险 (Authorization & Data Isolation Risks)

| 风险项 | 涉及实体与页面 | 核心规则与潜在风险 | 事实依据 |
| :--- | :--- | :--- | :--- |
| **账户角色越权与提权风险** | `model:AccountUser`<br>`page:F04`, `page:B03`, `page:B01` | 平台存在 `ADMIN` 与 `CUSTOMER` 两种角色隔离。普通用户通过 `page:F04` 注册时，后端必须强制限定角色为 `CUSTOMER`，严禁通过请求体篡改 `field:AccountUser.role`。运行中用户角色的修改必须受严格权限控制。 | `evidence:rule.002` |
| **敏感支付卡与身份数据泄露风险** | `model:TireOrder`<br>`page:F01`, `page:F02` | 订单创建要求收集 18 位金色卡（Dahabia）卡号、有效期以及国民身份证号（`national_id_number`）。在订单追踪页 `page:F02`（`route:OrderTracking`）展示或打印官方回执凭证时，若直接返回明文金卡信息，将产生数据合规与资产安全风险，需在传输和展示层进行脱敏或按安全标准隔离。 | `evidence:rule.007` |

---

### 业务不变量与数据完整性风险 (Business Invariants & Integrity Risks)

| 风险项 | 涉及实体与字段 | 核心规则与潜在风险 | 事实依据 |
| :--- | :--- | :--- | :--- |
| **行政区划归属不匹配** | `model:AlgerianWilaya`, `model:TireOrder`<br>`page:F01` | 阿尔及利亚 58 个省份具有固定的下辖市镇列表。如果前端级联选择器与后端表单校验未联动校验所选 `commune` 是否属于所选 `wilaya`，可能导致产生脏数据并影响后续线下服务站配货。 | `evidence:rule.003` |
| **订单金额封闭计算被篡改** | `model:TireOrder`<br>`page:F01` | 订单总金额具有强约束：`total_price_dzd = unit_price_dzd * quantity`（且数量限制为 1、2、3、4），且不包含附加费用。若服务端直接信任客户端提交的 `total_price_dzd` 而未根据后端轮胎基准价重新核算，存在价格篡改风险。 | `evidence:rule.007` |
| **内容发布状态泄露风险** | `model:PlatformFaq`, `model:SupportChannel`<br>`page:F01`, `page:B05` | 常见问题（FAQ）和支持渠道仅在标记为 `is_active = true` 时方可在前台 `page:F01` 展示。公共查询接口若缺少激活状态过滤条件，会导致未发布或已停用的客服配置暴露。 | `evidence:rule.005`, `evidence:rule.006` |

---

### 跨页面与数据流耦合风险 (Cross-Page & Data Flow Couplings)

- **订单创建到追踪跳转参数链路**：
  - 用户在 `page:F01` 完成预约后，需生成格式为 `NM-2026-XXXX` 的订单号，并跳转或引导至 `page:F02`（`route:OrderTracking`，携带 `field:TireOrder.orderNumber`）。若订单号生成规则冲突或查询端未校验手机号/卡号所有权，将导致用户无法定位自己的订单或发生越权查看。
- **后台目录调整与前台销售实时联动**：
  - 管理员在 `page:B04` 调整 `model:TireStock` 的售价、可用状态或库存预警值时，前端 `page:F01` 必须及时获取最新状态，避免用户提交已停售或已售罄规格的订单申请。

---

### Unknowns

- **金色卡（Dahabia）验证机制**：需求中要求严格校验 18 位纯数字卡号及有效期限，但目前代码中尚未确认是否接入阿尔及利亚国家邮政官方支付网关进行在线扣款或预授权，抑或仅作为提货时的凭据登记。修改相关逻辑前需核实实际支付网关驱动代码。
- **库存扣减的原子触发点**：当前规则未明确库存预留是在 `page:F01` 创建订单（`NEW`）时即锁定，还是在管理员在 `page:B01` 推进至 `PROCESSING` 时锁定。在修改订单创建及履约控制器代码前需检查实际实现。
