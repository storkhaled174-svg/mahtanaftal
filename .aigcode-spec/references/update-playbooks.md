# Update Playbooks
> Derived guidance - verify against code.
> 更新后内容为当前累计修正；初版内容保留首次生成结果。关键结论仍以源码和最新确定性 reference 为准。

## 更新后内容

### 业务域修改入口与影响面导航

#### 1. 后台仪表盘与安全锁屏（Admin Security & Operations）
- **主要入口页面**：`page:B01`（`app/(backend)/admindashboard/page.tsx`）
- **核心组件与关注文件**：
  - `src/backend/components/AdminDashboard/AdminLockScreen.tsx`（订单操作安全锁屏界面）
  - `src/backend/components/AdminDashboard/UpdatePasswordModal.tsx`（管理密码修改弹窗）
  - `src/backend/components/AdminDashboard/AdminSecurityBar.tsx`（安全操作状态栏）
  - `src/components/layout/backend/Sidebar.tsx`、`app/(backend)/layout.tsx`（后台布局与侧边栏导航）
- **修改核对要点**：
  - 需核对安全锁的解锁密码校验及更新逻辑。
  - 订单状态流转（`NEW` $\rightarrow$ `PROCESSING` $\rightarrow$ `COMPLETED` / `CANCELLED`）与模态窗交互均受安全锁状态控制。
- **关联检查页面**：`page:B02`（管理员登录入口，默认用户为 `admin`）。

#### 2. 库存与价格管理（Stock Management）
- **主要入口页面**：`page:B04`（`app/(backend)/adminstockmanagement/page.tsx`）
- **核心组件与关注文件**：
  - `src/backend/components/AdminStockManagement/FilterToolbar.tsx`（缺货/低库存快速筛选工具栏）
  - `src/backend/components/AdminStockManagement/StockTable.tsx`（库存表格与状态展示）
- **修改核对要点**：
  - 检查库存不足（低于最小阈值）与无货状态的快速筛选条件及样式指示。
  - 确认库存归零时可供状态自动切换逻辑。
- **关联检查页面**：`page:B01`（包含库存预警概览）。

#### 3. 前台订购与目录展示（Home & Order Placement）
- **主要入口页面**：`page:F01`
- **核心组件与关注文件**：
  - `src/frontend/components/HomePage/Hero.tsx`（首页头部视觉与搜索引导）
  - `src/frontend/components/HomePage/TireCatalog.tsx`（轮胎规格检索与筛选）
  - `src/frontend/components/HomePage/OrderFormSection.tsx`（订购表单与字段重置清空操作）
  - `src/frontend/components/HomePage/algerianWilayasData.ts`（阿尔及利亚 58 州及下属区县完整数据集）
- **修改核对要点**：
  - 核验 58 州与区县级联选择器数据完整性及表单清空重置逻辑。
  - 校验订购表单必填字段（包括证件号与卡号格式）的客户端校验规则。
- **关联检查页面**：`page:F02`（订单凭证查询与追踪）。

#### 4. 用户与管理员认证体系（Authentication & Accounts）
- **客户认证入口**：`page:F03`（登录）、`page:F04`（注册）
- **管理认证入口**：`page:B02`（管理员登录）、`page:B03`（管理员注册）
- **修改核对要点**：
  - 客户与管理员认证通道保持隔离，角色固定分配（客户为 `CUSTOMER`，管理端为 `ADMIN`）。
  - 后台受保护路由与安全锁校验需基于管理会话状态。

#### 5. 内容与客服支持（Content & Support）
- **主要入口页面**：`page:B05`（`app/(backend)/admincontentsupport/page.tsx`）
- **关联展示页面**：`page:F01`（首页 FAQ 与客服通道展示区）
- **修改核对要点**：
  - 确认 FAQ 分类及客服通道启用状态（`is_active`）对前台展示的过滤影响。

## 初版内容

#### 1. 轮胎预订与订单提交流程变更 (Order Submission & Validation)

当需要调整前台轮胎预订逻辑、修改客户表单校验项或订单初始化逻辑时，应参考本导航排查与修改。

| 关注维度 | 入口与参考定义 |
| :--- | :--- |
| **前端入口页面** | `page:F01` (`route:HomePage`) |
| **凭证跳转页面** | `page:F02` (`route:OrderTracking`) |
| **核心领域模型** | `model:TireOrder`, `model:AlgerianWilaya`, `model:AccountUser` |
| **关键模型字段** | `field:TireOrder.brand`, `field:TireOrder.status`, `field:TireOrder.orderNumber`, `field:TireOrder.customerId` |
| **业务流与规则参考** | `evidence:flow.002.F01.HomePage`, `evidence:rule.003`, `evidence:rule.007`, `evidence:state.001.F01.HomePage` |

- **关键不变量与检查项**：
  - 品牌限定：表单提交的轮胎品牌仅能为 `CONTINENTAL` 或 `IRIS`（`evidence:rule.004`，`evidence:rule.007`）。
  - 行政区划约束：选择的市镇必须归属于所选的 58 个省份之一 `model:AlgerianWilaya`（`evidence:rule.003`）。
  - 表单校验规则：需严格校验 18 位纯数字金色卡（Carte Dahabia）卡号、MM/YY 有效期、以 05/06/07 开头的联系电话以及 1-4 条的订购数量限制（`evidence:rule.007`）。
  - 状态与编号初始化：新建订单必须生成初始状态为 `NEW` 的 `model:TireOrder` 记录，并生成格式为 `NM-2026-XXXX` 的国家统一订单编号（`evidence:state.001.F01.HomePage`，`evidence:rule.007`）。

---

#### 2. 订单履约状态机与追踪凭证变更 (Order Fulfillment & Lifecycle)

当需要修改订单状态流转控制、履约审核权限或提货凭证查询打印逻辑时，应参考本导航排查与修改。

| 关注维度 | 入口与参考定义 |
| :--- | :--- |
| **后台审核页面** | `page:B01` (`route:AdminDashboard`) |
| **前台查询页面** | `page:F02` (`route:OrderTracking`) |
| **核心领域模型** | `model:TireOrder` |
| **关键模型字段** | `field:TireOrder.status`, `field:TireOrder.orderNumber` |
| **业务流与规则参考** | `evidence:flow.004.F02.OrderTracking`, `evidence:flow.006.B01.AdminDashboard`, `evidence:state.001.F01.HomePage`, `evidence:rule.007` |

- **关键不变量与检查项**：
  - 状态机转移约束：
    - `NEW` $\rightarrow$ `PROCESSING`（管理员后台受理并锁定配额）。
    - `PROCESSING` $\rightarrow$ `COMPLETED`（服务站现场核验提货完成）。
    - `NEW` / `PROCESSING` $\rightarrow$ `CANCELLED`（管理员驳回或取消）。
  - 权限隔离：状态流转操作仅限于 `ADMIN` 角色在 `page:B01` 上执行，前台用户仅能通过 `page:F02` 携带 `field:TireOrder.orderNumber` 和手机号进行只读查询与凭证打印（`evidence:rule.007`，`evidence:flow.004.F02.OrderTracking`）。

---

#### 3. 轮胎目录与库存配额管理变更 (Stock & Catalog Management)

当需要调整轮胎产品规格、更新价格计算规则或修改库存预警阈值时，应参考本导航排查与修改。

| 关注维度 | 入口与参考定义 |
| :--- | :--- |
| **后台库存管理页** | `page:B01` (`route:AdminDashboard`), `page:B04` (`route:AdminStockManagement`) |
| **核心领域模型** | `model:TireStock` |
| **关键模型字段** | `field:TireStock.brand`, `field:TireStock.category` |
| **业务流与规则参考** | `evidence:flow.007.B01.AdminDashboard`, `evidence:rule.004` |

- **关键不变量与检查项**：
  - 品牌与分类枚举：`field:TireStock.brand` 必须为 `CONTINENTAL` 或 `IRIS`；`field:TireStock.category` 必须为 `TOURISM`、`UTILITY` 或 `SUV`（`evidence:rule.004`）。
  - 售罄状态联动：当可用库存降至 0 时，应自动联动下架或标记不可用（`is_available = false`）（`evidence:rule.004`）。
  - 价格计算纯净性：前台单价与总价必须满足严格乘积关系，不允许出现未定义的附加费用（`evidence:rule.007`）。

---

#### 4. 账户鉴权与角色隔离变更 (Authentication & Role Isolation)

当需要调整用户注册登录流、更新密码策略或修改访问控制权限时，应参考本导航排查与修改。

| 关注维度 | 入口与参考定义 |
| :--- | :--- |
| **客户认证页面** | `page:F03` (`route:CustomerLogin`), `page:F04` (`route:CustomerRegister`) |
| **管理认证页面** | `page:B02` (`route:AdminLogin`), `page:B03` (`route:AdminRegister`) |
| **核心领域模型** | `model:AccountUser` |
| **关键模型字段** | `field:AccountUser.role` |
| **业务流与规则参考** | `evidence:flow.005.pages.F03-B03`, `evidence:rule.002` |

- **关键不变量与检查项**：
  - 用户名唯一性：平台内所有用户账号标识在全局范围内必须唯一（`evidence:rule.002`）。
  - 角色强隔离：`field:AccountUser.role` 严格区分为 `CUSTOMER` 与 `ADMIN`。客户与管理员拥有完全独立的登录/注册入口，禁止普通用户自行变更或提升角色（`evidence:rule.002`）。

---

#### 5. 平台 FAQ 与客户支持渠道配置变更 (Content & Support Channel Management)

当需要新增/修改常见问答分类、调整客服渠道热线或变更前台展示过滤时，应参考本导航排查与修改。

| 关注维度 | 入口与参考定义 |
| :--- | :--- |
| **后台内容支持页** | `page:B05` (`route:AdminContentSupport`) |
| **前台展示页面** | `page:F01` (`route:HomePage`) |
| **核心领域模型** | `model:PlatformFaq`, `model:SupportChannel` |
| **关键模型字段** | `field:PlatformFaq.category` |
| **业务流与规则参考** | `evidence:flow.008.B01.AdminDashboard`, `evidence:rule.005`, `evidence:rule.006` |

- **关键不变量与检查项**：
  - FAQ 分类枚举：`field:PlatformFaq.category` 仅限 `ORDERS`、`PAYMENT`、`DELIVERY`、`WARRANTY`（`evidence:rule.005`）。
  - 可见性过滤：仅当 `is_active` 为 true 时，相关内容才允许在公共前台 `page:F01` 呈现（`evidence:rule.005`，`evidence:rule.006`）。

---

#### Unknowns

1. **外部支付网关接入与结算机制**：
   - 订单创建时收集的 18 位 Dahabia 卡号及有效期，具体是在线调用网关接口预授权还是仅作凭证登记用于提货核销，需核对后端基础设施服务实现。
2. **库存扣减的触发阶段**：
   - 订单在 `page:F01` 创建（`status = NEW`）时是否预扣/锁定 `model:TireStock`，还是在管理员转入 `PROCESSING` 时才执行扣减，需根据后端控制器具体事务逻辑确认。
