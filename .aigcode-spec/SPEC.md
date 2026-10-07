# Project SPEC
> 更新后内容为当前累计修正；初版内容保留首次生成结果。关键结论仍以源码和最新确定性 reference 为准。

## 更新后内容

- **前台服务入口矩阵**：涵盖 page:F01（首页与 58 州区划预约）、page:F02（订单凭证查询与追踪）、page:F03 与 page:F04（客户认证）。详细业务流转与表单联动校验请参阅 `read_spec(reference="flows")`。
- **后台运营与管控入口矩阵**：涵盖 page:B01（管理主面板与安全管控）、page:B02 与 page:B03（管理员认证）、page:B04（库存与规格维护）及 page:B05（内容与渠道支持）。具体权限与数据模型读写关系请参阅 `read_spec(reference="flows")` 与 `read_spec(reference="domain-model")`。
- **支付与订单履约配置**：payment:profile 当前确认采用面向 DZ 市场的单次结算配置（`one_time` / `fiat`），以 model:TireOrder 为核心订单载体驱动履约状态流转。若需排查具体源码映射可配合 references/implementation-map.md 辅助定位。

## 初版内容

### Project Summary
本项目是面向阿尔及利亚市场的官方轮胎在线预约配额与履约管理系统。公共前台支持访客及普通客户浏览 Continental 与 Iris 授权轮胎规格、校验 18 位 Dahabia 金色卡号与行政区划并提交预约订单（生成 `NM-2026-XXXX` 编号），支持凭订单号追踪流转状态与打印凭证；后台支持管理员集中审核订单状态机流转、维护轮胎库存及配置平台支持与常见问答。

### Start Here For Updates
update agent 定位与修改决策路径：
- 已知具体页面、组件或数据表的小改动：优先使用 `page card`、`read_page_info` 或 `search_code` 等局部工具直接定位。
- 业务域或功能入口不明确：先读取 `read_spec(reference="update-playbooks")` 确认业务域对应的实体与入口。
- 涉及 Schema、共享组件、页面生命周期、角色鉴权或三方集成的结构性变更：读取 `read_spec(reference="change-recipes")`，并优先带 section 精确读取（如 `Schema Change Impact`、`Role And Auth Changes` 等）；并发写目标、执行骨架与置信度分别查阅其 `Global Write Targets`、`Planning Shortcuts` 与 `Freshness And Confidence`。
- 复杂业务规则、生命周期约束或状态流转细节：按需读取 `read_spec(reference="domain-model")` 与 `read_spec(reference="flows")`。
- 只有在跨模块源码坐标仍无法厘清时：再读取较重的 `read_spec(reference="implementation-map")` 查询精确文件与动作映射。

### Scope & Limitations
- 本 SPEC 是代码库当前**已实现**状态的静态结构与规则快照，用于辅助导航定位，非未来待办（TODO）列表，亦非运行时的动态状态证明。
- 本文档不作为认证授权、敏感数据加密、并发库存扣减或国际化逻辑正确性的绝对证明，确认具体实现逻辑必须直接查阅源码。
- **陷阱提示 1（生成层禁止手改）**：`implementation-map` 中标注的生成路径（如 RPC 生成层代码）为自动化产物，严禁手动修改。
- **陷阱提示 2（文件存在不等于挂载）**：`INFRA_MAP` 等位置列出的鉴权 Guard 或拦截器文件存在，并不代表其已在实际路由或 Layout 中全局生效，修改鉴权时需确认挂载点。

### Core Flows
- **前台轮胎选购与预约提交流程**：客户在 page:F01 挑选官方规格，填写 58 省区划与 18 位 Dahabia 卡号，提交创建初始状态为 `NEW` 的 model:TireOrder（`evidence:rule.007`, `evidence:flow.002.F01.HomePage`）。
- **订单查询与凭证打印流程**：用户通过 route:OrderTracking 访问 page:F02，凭借 `field:TireOrder.orderNumber` 与手机号查询流转进度并生成打印提货单（`evidence:flow.004.F02.OrderTracking`）。
- **管理端履约与状态机流转**：管理员在 page:B01 审核订单，将 model:TireOrder 状态从 `NEW` 流转至 `PROCESSING`、核销提货置为 `COMPLETED` 或驳回置为 `CANCELLED`（`evidence:state.001.F01.HomePage`, `evidence:flow.006.B01.AdminDashboard`）。
- **多角色认证与权限隔离**：客户通过 page:F04, page:F03 注册登录 `CUSTOMER` 角色；管理员通过 page:B03, page:B02 登录 `ADMIN` 角色并进入后台管控（`evidence:rule.002`, `evidence:flow.005.pages.F03-B03`）。
- **库存目录与服务内容维护**：管理员在 page:B04 维护 model:TireStock 规格库存，在 page:B05 维护 model:PlatformFaq 与 model:SupportChannel（`evidence:rule.004`, `evidence:rule.005`, `evidence:rule.006`）。

### Domain Rules
- **订单状态机流转约束**：`field:TireOrder.status` 仅允许 `NEW` $\rightarrow$ `PROCESSING` $\rightarrow$ `COMPLETED`，以及 `NEW`/`PROCESSING` $\rightarrow$ `CANCELLED`；状态变更仅限 `ADMIN` 角色在后台操作（`evidence:state.001.F01.HomePage`, `evidence:rule.007`）。
- **订单数据与计算不变量**：品牌 `field:TireOrder.brand` 必须为 `CONTINENTAL` 或 `IRIS`；订购数量严格限制为 1 至 4 条；总额必须等于单价乘数量且无附加费（`evidence:rule.007`）。
- **支付凭证与身份格式规则**：Dahabia 金卡卡号必须精确为 18 位纯数字且附带 MM/YY 有效期；手机号必须符合阿尔及利亚 05、06、07 号段（`evidence:rule.007`）。
- **库存品牌受限与自动售罄**：`field:TireStock.brand` 仅支持指定品牌；可用库存降至 0 时规格自动变为不可用状态（`evidence:rule.004`）。
- **账户唯一性与行政区划一致性**：`field:AccountUser.role` 严格区分为 `CUSTOMER` 与 `ADMIN` 且不可越权修改；选定市镇必须严格属于 model:AlgerianWilaya 对应的 58 个省份（`evidence:rule.002`, `evidence:rule.003`）。

### Implementation Entry Points
- **前台客户端入口**：page:F01（首页与预约表单）、page:F02（订单追踪与凭证，对应 route:OrderTracking）、page:F03（客户登录）、page:F04（客户注册）。
- **后台管理端入口**：page:B01（管理主面板）、page:B02（管理登录）、page:B03（管理注册）、page:B04（库存与价格管理）、page:B05（内容与渠道支持）。
- **核心数据模型**：model:TireOrder（轮胎预约订单）、model:TireStock（轮胎库存与规格）、model:AccountUser（账户用户）、model:AlgerianWilaya（行政区划）、model:PlatformFaq（常见问答）、model:SupportChannel（支持渠道）。

### Update Playbooks
- **预约表单与校验规则调整**：检查 page:F01、model:TireOrder、Dahabia 18 位卡号与手机号校验逻辑，以及关联的 model:AlgerianWilaya 联动选择。
- **订单生命周期与履约状态流转**：检查 page:B01 管理操作、`field:TireOrder.status` 枚举及校验、以及 page:F02 凭证回执展示逻辑。
- **轮胎品类与库存预警变更**：检查 page:B04、`field:TireStock.category` 与 `field:TireStock.brand` 枚举约束，以及售罄状态对前台展示的影响。
- **FAQ 与客服支持渠道配置**：检查 page:B05、model:PlatformFaq、model:SupportChannel 及前台 page:F01 活跃状态（`is_active`）过滤条件。

### Known Risks
- **敏感身份与卡号凭证存储风险**：订单收集 18 位 Dahabia 卡号与生物识别身份证号，需确认后端加密与脱敏存储规范是否落实（`evidence:rule.007`）。
- **并发预订库存超卖风险**：`NEW` 订单创建与后台 `PROCESSING` 状态之间的库存扣减/预留逻辑需确认是否存在高并发抢占漏洞（`evidence:rule.004`）。
- **角色鉴权与端点越权风险**：`ADMIN` 与 `CUSTOMER` 均基于 model:AccountUser，需确认所有后台端点均严格校验角色权限（`evidence:rule.002`）。
- **未闭环的外部支付网关风险**：当前流程收集卡号凭证但尚未显式绑定外部自动扣款支付驱动，需注意业务履约闭环边界（`evidence:rule.007`）。

### References
- `read_spec(reference="flows")`：查看完整业务流程、跨页 Lineage 链路与未决流程细节。
- `read_spec(reference="domain-model")`：查看限界上下文划分、聚合根关系、状态机规则及领域不变量。
- `read_spec(reference="update-playbooks")`：按业务功能域组织的修改入口导航，业务域入口不清时优先读取。
- `read_spec(reference="change-recipes")`：结构变更影响面与配方；支持加 section 查看 Schema Change Impact、Global Write Targets、Shared/Component Impact、Role And Auth Changes、Thirdparty Integration Touchpoints 等。
- `read_spec(reference="payment")`：查看阿尔及利亚市场支付画像、Dahabia 卡需求、推荐/已实现支付通道及订单模型触点。
- `read_spec(reference="implementation-map")`：较重的源码精确坐标地图；仅在局部工具和精简 reference 无法定位跨模块代码时读取。
- `read_spec(reference="risks")`：查看跨模块隐藏耦合、状态竞争与安全风险清单。
