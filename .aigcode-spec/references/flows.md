# Flows Reference
> Fact layer - grounded expansion. Verify against code before editing.
> 更新后内容为当前累计修正；初版内容保留首次生成结果。关键结论仍以源码和最新确定性 reference 为准。

## 更新后内容

### 前台订单提交与履约追踪流程修正

- **客户预约提货流转（page:F01 $\rightarrow$ page:F02）**：
  - 用户在 page:F01 浏览轮胎目录（限定品牌 `CONTINENTAL` / `IRIS`，车型分类 `TOURISM`、`UTILITY`、`SUV`）并填写预约信息，支持选择 58 个阿尔及利亚省份及其所属市镇联动，录入 18 位 البطاقة الذهبية（Dahabia 卡号）及有效期（`MM/YY`）、双联系电话与生物识别身份证号。
  - 订单创建成功后生成初始状态 `NEW` 的订单记录及 `NM-2026-XXXX` 格式订单号，并跳转/引导至 page:F02（可通过路由参数携带 orderNumber）。
  - page:F02 提供订单凭证查询与核验，凭订单号及登记手机号验证展示订单状态（`NEW`、`PROCESSING`、`COMPLETED`、`CANCELLED`）与可打印的电子提货单据。

### 身份认证与权限分流流程（page:F03 / page:F04 / page:B02 / page:B03）

- **普通客户认证流转**：
  - 客户注册页面 page:F04 提交基本信息后直接赋予 `CUSTOMER` 角色并引导至 page:F03 完成登录；登录后返回 page:F01 自动预填身份信息并绑定订单。
- **管理员认证流转**：
  - 管理员专属注册页面 page:B03 创建 `ADMIN` 角色凭证后引导至 page:B02 完成登录；登录验证成功后进入管理控制台 page:B01。

### 后台履约、库存与配置管理流程（page:B01 / page:B04 / page:B05）

- **订单生命周期管理与安全屏障（page:B01）**：
  - page:B01 具备管理控制台安全锁屏与凭证更新能力；管理员可按 58 省份/市镇、品牌、状态检索订单并执行状态流转（`NEW` $\rightarrow$ `PROCESSING` 锁定库存；`PROCESSING` $\rightarrow$ `COMPLETED` 确认到站提货；异常或不符合条件时流转至 `CANCELLED` 并释放预留库存）。
- **库存与规格管理流转（page:B01 $\rightarrow$ page:B04）**：
  - page:B04 维护轮胎库存、阈值与单价，当可用库存降为 0 时自动切换为不可用状态（`is_available = false`），影响前台 page:F01 的可选规格与展示。
- **内容与客服渠道维护（page:B01 $\rightarrow$ page:B05）**：
  - page:B05 统一维护 FAQ（分类涵盖 `ORDERS`、`PAYMENT`、`DELIVERY`、`WARRANTY`）与官方客服渠道（如 1050 绿色热线）；启用状态（`is_active = true`）的数据直接同步至前台 page:F01 渲染。

### 支付与结算属性（payment:profile）

- 当前业务流程明确为面向阿尔及利亚（`DZ`）本地市场的实体商品（`physical`）单次结算（`one_time`）法定货币（`fiat`）交易模式，关联订单实体进行履约核销。

## 初版内容

### Main Flows

#### 1. 轮胎选购与官方订单预约流程
用户在公共前台浏览官方轮胎规格并提交预约申请。

```
[访客/用户访问 page:F01] 
       │ 
       ▼
[选择品牌/规格/省份市镇] ── (校验 18 位 Dahabia 卡号与手机号)
       │
       ▼
[生成订单 model:TireOrder] ── (初始状态: NEW，生成 NM-2026-XXXX 编号)
       │
       ▼
[跳转/引导至 page:F02 查看凭证]
```

- **业务步骤与规则**：
  1. 访客或已登录用户在 page:F01 浏览认证轮胎目录，品牌严格限制为 `CONTINENTAL` 或 `IRIS`（`evidence:rule.004`，`evidence:flow.002.F01.HomePage`）。
  2. 填写订单信息，选择对应的 58 个阿尔及利亚省份与所属市镇（`evidence:rule.003`，`evidence:rule.007`）。
  3. 必填字段校验（`evidence:rule.007`）：
     - 姓名与两个阿尔及利亚有效手机号（以 05、06、07 开头）。
     - 购买数量仅限 1、2、3、4 条。
     - 生物识别国民身份证号（`national_id_number`）。
     - 18 位纯数字的金色卡（Carte Dahabia）卡号及有效期（`dahabia_expiry`，格式 MM/YY）。
  4. 系统计算总金额 `total_price_dzd` = 单价 `unit_price_dzd` × 数量，不含附加费（`evidence:rule.007`）。
  5. 提交后创建 model:TireOrder 记录，初始状态为 `NEW`（`evidence:state.001.F01.HomePage`），并生成唯一的国家官方订单编号（格式如 `NM-2026-XXXX`）。

---

#### 2. 订单查询与凭证打印流程
用户凭订单编号与手机号查询订单执行进度并打印官方回执。

```
[进入 page:F02] ── (传入 route:OrderTracking 参数 orderNumber)
       │
       ▼
[读取 model:TireOrder] ── (校验手机号与订单编号)
       │
       ▼
[展示订单状态与数字回执/凭证打印]
```

- **业务步骤与规则**：
  1. 用户通过 route:OrderTracking（路径 `/ordertracking`）访问 page:F02（`evidence:flow.004.F02.OrderTracking`）。
  2. 路由支持携带参数 `field:TireOrder.orderNumber`。
  3. 结合用户手机号检索 model:TireOrder，展示当前流转状态（`NEW`、`PROCESSING`、`COMPLETED`、`CANCELLED`）与预约详情。
  4. 支持打印官方数字回执凭证，用于前往 Naftal 服务站提货验证（`evidence:flow.004.F02.OrderTracking`）。

---

#### 3. 管理端订单履约与状态机流转流程
后台管理员集中审核、分配配额、确认提货或取消订单。

```
[管理员登录 page:B02 -> 进入 page:B01]
       │
       ▼
[筛选与检索 model:TireOrder] 
       │
       ├─ [分配配额] ──────────► 状态流转: NEW -> PROCESSING
       ├─ [确认提货核销] ──────► 状态流转: PROCESSING -> COMPLETED
       ├─ [不符合要求驳回] ────► 状态流转: PROCESSING -> CANCELLED
       └─ [直接取消] ──────────► 状态流转: NEW -> CANCELLED
```

- **状态流转规则与不变量**（`evidence:state.001.F01.HomePage`，`evidence:flow.006.B01.AdminDashboard`）：
  - 只有具备 `ADMIN` 权限的管理员可在 page:B01 变更订单状态（`evidence:rule.007`）。
  - `__create__` $\rightarrow$ `NEW`：由前台页面 page:F01 用户提交创建。
  - `NEW` $\rightarrow$ `PROCESSING`：后台管理员在 page:B01 受理订单并锁定对应规格库存。
  - `PROCESSING` $\rightarrow$ `COMPLETED`：服务站核销并确认客户完成提货。
  - `NEW` $\rightarrow$ `CANCELLED` 或 `PROCESSING` $\rightarrow$ `CANCELLED`：信息不合规或配额无法满足时由管理员取消。

---

#### 4. 身份认证与权限隔离流程
区分普通客户与 Naftal 内部管理员的注册与鉴权入口。

```
[客户注册/登录] page:F04 / page:F03 ──► model:AccountUser (role: CUSTOMER) ──► 访问 page:F01, page:F02
[管理注册/登录] page:B03 / page:B02 ──► model:AccountUser (role: ADMIN)    ──► 访问 page:B01, page:B04, page:B05
```

- **业务步骤与规则**（`evidence:rule.002`，`evidence:flow.005.pages.F03-B03`）：
  - 用户名在全平台唯一。
  - 角色 `field:AccountUser.role` 严格区分为 `CUSTOMER` 与 `ADMIN`，运行中角色变更受限。
  - 普通客户通过 page:F03 与 page:F04 完成登录与注册，登录后可绑定订单 `customerId`。
  - 管理员通过专属页面 page:B02 与 page:B03 进行认证，进入后台 page:B01 进行履约管控。

---

#### 5. 后台轮胎库存与规格价格管理流程
管理员在后台维护轮胎目录、调整库存分配及价格。

- **业务步骤与规则**（`evidence:rule.004`，`evidence:flow.007.B01.AdminDashboard`）：
  1. 管理员在 page:B01 或 page:B04 管理 model:TireStock 数据。
  2. 轮胎类别 `field:TireStock.category` 限制为 `TOURISM`、`UTILITY`、`SUV`。
  3. 品牌 `field:TireStock.brand` 仅限 `CONTINENTAL` 与 `IRIS`。
  4. 库存达到 `min_threshold` 触发预警；可用库存降至 0 时自动标记为不可用（`is_available = false`）。

---

#### 6. 内容配置与客户支持渠道维护流程
管理员动态配置常见问答与服务热线。

- **业务步骤与规则**（`evidence:rule.005`，`evidence:rule.006`，`evidence:flow.008.B01.AdminDashboard`）：
  1. 管理员在 page:B05 维护 model:PlatformFaq 与 model:SupportChannel。
  2. FAQ 分类 `field:PlatformFaq.category` 包括 `ORDERS`、`PAYMENT`、`DELIVERY`、`WARRANTY`。
  3. 只有 `is_active` 为 true 的 FAQ 和支持渠道会在公共前台 page:F01 渲染展示。

---

### Cross-Page Lineage

| 源页面 | 目标页面 | 触发操作 / 媒介 | 携带标识与参数 | 写入/更新实体 | 业务影响 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page:F01 | page:F02 | 提交预约订单表单 | `field:TireOrder.orderNumber` (NM-2026-XXXX) | model:TireOrder | 创建 `NEW` 状态订单，持久化金卡与提货身份信息 |
| page:F02 | page:F02 | 输入订单号与手机号查询 | `field:TireOrder.orderNumber`，手机号 | 无 (只读查询) | 展示订单履约状态，生成打印回执 |
| page:F04 | page:F03 | 客户注册完成 | 登录凭证 | model:AccountUser | 创建 `CUSTOMER` 角色用户 |
| page:B03 | page:B02 | 管理员账号注册完成 | 登录凭证 | model:AccountUser | 创建 `ADMIN` 角色用户 |
| page:B01 | page:B04 | 点击进入库存管理 | 路由跳转 | model:TireStock | 调整可用库存、预警阈值与单价 |
| page:B01 | page:B05 | 点击进入内容与渠道管理 | 路由跳转 | model:PlatformFaq, model:SupportChannel | 启停 FAQ、维护官方客服渠道（如 1050 热线） |

---

### Unknowns

1. **支付网关实际交互细节**：
   - 需求中要求收集 18 位金色卡（Dahabia）卡号及过期时间并进行校验，但在代码地图中尚未显式导出外部在线支付网关驱动的 Action 绑定，实际扣款是站内模拟、预授权还是线下提货核销需进一步查看后端实现代码。
2. **库存扣减触发时机**：
   - 是否在订单创建（`status = NEW`）时直接扣减/预留 model:TireStock 中的 `reserved_stock`，还是在管理员将状态置为 `PROCESSING` 时才执行库存扣减，需核对后台控制器具体代码实现。
