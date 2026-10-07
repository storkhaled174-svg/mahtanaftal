# Payment Reference
> Fact layer - deterministic extraction plus attributed inference. Verify against code and live platform status.

## Explicit Requirements
- none

## Inferred Payment Profile
- target_markets: values=DZ; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:F02, page:B01
- product_types: values=physical; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:B01
- billing_modes: values=one_time; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:B01
- payment_rails: values=fiat; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:F02, page:B01

## Selected Providers
- providers=none

## Recommended Providers
- providers=stripe, clink
- note=none
- 推荐项是候选集合，不会自动替代用户明确选择；provider 仍未确认时必须进入一次支付问卷。

## Implemented Providers
- providers=none

## NOWPayments Pricing
- none

## Checkout And Order Model
- payment_pages=none
- payment_interfaces=none
- order_models=model:TireOrder
- status_fields=model:TireOrder#status

## Callbacks And Verification
- callback_pages=none
- infrastructure=server/thirdparty/payment-definitions.ts, server/thirdparty/payment/alipay.ts, server/thirdparty/payment/amount.ts, server/thirdparty/payment/clink.ts, server/thirdparty/payment/nowpayments.ts, server/thirdparty/payment/stripe.ts
- 回跳页面不是支付成功事实源；验签、幂等和终态保护仍须回项目源码确认。

## Evidence And Confidence
- target_markets: values=DZ; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:F02, page:B01
- product_types: values=physical; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:B01
- billing_modes: values=one_time; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:B01
- payment_rails: values=fiat; source=ai_inferred; confidence=0.95; confirmed=false; evidence=page:F01, page:F02, page:B01

## Conflicts And Missing Decisions
- none

## Freshness
- generated_at=2026-10-05T10:13:13.406385+00:00
- 本文件是 SPEC 生成时快照；平台 Secret 完整度、统计 API 可用性和交易状态以实时数据为准。
