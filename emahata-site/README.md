# E-MAHATA: isolated production-source recovery + signed order cards

This directory restores the static HTML/JavaScript + Vercel Node API version of the site. The repository-root Next.js/Prisma application is different and remains unchanged. **No database contents are copied into Git.** This change is a review branch, not a production release. Do not change the project's root directory or merge/promote as part of review.

## Local checks

```sh
cd emahata-site
npm ci
npm test
for f in tests/*.cjs; do node "$f" || exit; done
node scripts/build.mjs
```

The build copies only allowlisted static assets into `public/`. Server code and tests are not served as static files. The dedicated card uses bundled Cairo Arabic/Latin fonts (OFL-1.1), without external font requests. QR generation runs locally using bundled `qrcode` (MIT), not a third-party QR service.

## Runtime configuration (operator action before release)

Keep existing server-only `DATABASE_URL` and `ADMIN_PASSWORD`. No new database or connection is needed. Independently generate a cryptographically random secret with at least 32 bytes, and set it yourself as server-only `ORDER_SHARE_SECRET` in the intended Vercel environment using `vercel env add ORDER_SHARE_SECRET`. Never paste secrets into chat or Git. Redeploy only the intended preview when testing; production release requires separate approval.

No environment values were read or changed for this branch. If signing is not configured, registration still succeeds, but the receipt explicitly says its link is unavailable. Admin issuance returns 503 until configured. The preview environment is not connected to production storage by this change.

## Access model

- New successful registration returns a relative signed `/order#...` path. The confirmation card displays its QR, direct link, QR PNG download, and print/save-as-PDF (browser print dialog).
- Existing orders: authenticated admin opens details or the QR/card button, then generates a fresh signed link. No row changes are necessary. Admin print opens the dedicated card; print there.
- Links expire after 90 days. Rotating `ORDER_SHARE_SECRET` invalidates all existing links, including printed QRs. Generate new links in admin after rotation/expiry. There is no per-order revocation without a future persistence change.
- A link is a **bearer capability**: anyone with it can read that order's permitted customer fields, including identity/address. A signature prevents forging, not forwarding. Do not share links or screenshots publicly. More restrictive distributor access would require authentication beyond this feature.
- Fragment keeps the token out of HTTP URLs/referrers; the browser sends it only to `/api/order` as Authorization. No token storage in localStorage; private/no-store responses, no external resources on the order page, robots excluded, deny framing.
- Read API verifies before accessing storage, scopes a parameterized SELECT to one order, and explicitly returns customer/identity/vehicle/size/quantity/address/date/current status. No payment-card values/expiry, internal notes, or arbitrary JSON fields. Data uses `textContent`, not HTML interpolation.
- State is read from Neon at page load/refresh. An initially new order displays “قيد الانتظار”; other statuses follow existing effective-status semantics. Missing historical fields display “غير مسجل”, never invented values.

## Database safety

Uses existing `mhatati_orders` columns (`id`, `data`, `order_sequence`, `created_at`). Removed recovered request-time CREATE/ALTER from orders and CREATE from visitors; no migration, DDL, backfill, reset, or data deletion is introduced. Existing authenticated order editing/deletion and registration behavior are preserved, not exercised against production during review. New share endpoints execute SELECT only.

## Verification limits

Automated checks use synthetic records and mocked SQL only: signatures, expiry/tamper/rotation, auth, scoped queries, allowlist, live status changes, absent records, QR encode/decode, existing regressions. Real Neon readback, real admin login, customer submission, physical QR scan and printer/PDF output require a configured non-production environment and operator review. Do not seed or submit synthetic customer records to production. No production URLs/domains or settings are changed by this branch.
