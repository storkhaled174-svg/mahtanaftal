# autocoder: existing registration repair, 2026-10-09

## Observed state, not assumptions
- Project `autocoder` is the existing project for `autocoder-wine.vercel.app`.
- Repository main used static export and browser requests to localhost:3100. This security branch supplies a same-origin Next.js RPC server with database-backed Prisma actions.
- Prisma declares `provider = "mysql"`, with AccountUser, TireOrder, TireStock, AlgerianWilaya and content models. This is code configuration, NOT proof that a live MySQL database currently exists or is accessible.
- Scoped Vercel reads show no environment variables and no connected storage for autocoder. Team Supabase resources are suspended and linked to other projects; they are not used as substitutes.
- Runtime logs over 24 hours include POST /api/rpc failures on earlier previews: Cannot find module 'next/dist/compiled/source-map'. The inherited outputFileTracingExcludes removed node_modules/runtime build files. Removed those excludes and explicitly included the generated Prisma runtime. Live deployment regression verification remains necessary.

## Current behavior
- Preserve Arabic RTL, colors, existing sections and database records. Remove only payment-card inputs/receipt field as explicitly requested.
- Store name, primary phone, optional secondary phone (empty string when absent), wilaya, commune, brand, tire size, quantity, national ID and a separate registrationDate column. Preserve database-generated createdAt audit timestamp.
- Registration date is validated server-side and stored as DATE. Historical NULL registrationDate displays existing createdAt; no historical rows are rewritten.
- The create action explicitly lists stored fields: legacy card arguments are ignored, and neither card number nor expiry is written. Legacy nullable columns remain only to preserve existing data. Admin responses return no old card values.
- Success/receipt is emitted only after awaited database save. Storage failures propagate without a success callback; error logging includes class/code only, not Prisma error bodies or submitted personal data.
- Authorized admin actions read the same Prisma TireOrder model. Dashboard refreshes every 15 seconds while visible/signed in and on focus, with overlap guards. Private routes/actions require verified sessions and database roles.

## Required before deployment to production
1. Confirm the ACTUAL existing database provider and current table schema with its operator. Do not create a database, invent a URL or attach another project's storage. If it is not MySQL, this Prisma provider/schema must be adapted to the verified database before release.
2. Rotate credentials previously committed in the public main branch and old seeded administrator credentials. Never paste secrets in chat, public logs or NEXT_PUBLIC_ variables.
3. Configure server-only DATABASE_URL for the verified existing database and JWT_SECRET (random >=32 characters) in Vercel → autocoder → Settings → Environment Variables. Confirm environments before testing. No provider-managed credentials are modified by this code change.
4. Back up and inspect the existing schema. The former 20261008 card-truncation script is superseded and MUST NOT run. Review prisma/manual-migrations/20261009-order-registration.sql: only required additive columns/index and nullable legacy payment columns; no row updates/deletions or column removal. No migration runs during builds; do not use legacy init/reset/seed scripts.
5. Confirm an existing trusted ADMIN, available stock and valid wilaya/commune data. Initial admin setup must be performed through a trusted operator, not a public bootstrap endpoint.
6. Run npm run test:mysql from a trusted runner that can reach this verified database. It requires DATABASE_URL and explicit ALLOW_REGISTRATION_DB_TEST=yes; it creates one synthetic keyed order, independently reads it, verifies all relevant storage behavior, retries with the same key, verifies guest denial and dashboard action visibility, then removes ONLY its own newly-created test row. Do not put that authorization flag in the application's Vercel environment. If no test-row cleanup is permitted, coordinate an operator-reviewed alternative before running.
7. Then test the deployed form, authenticated admin login/display and page reload in a browser. The sandbox cannot request deployment URLs or arbitrary external database hosts. Local HTTP/action tests are not proof of deployment/database end-to-end success.
8. Release to existing autocoder production only after real persistence and admin-browser checks succeed. No new project/database is needed.

## Tests and limitations
- npm test: action tests with mocked Prisma and actual submit-button component tests in jsdom with mocked transport. Cover optional secondary phone, no collected/stored payment fields, date validation, phone normalization, no premature success, double-click guard, failures/retry keys and admin authorization.
- npm run test:mysql: deliberately FAILS, not skips/passes, when live database configuration or authorization is missing. On this investigation DATABASE_URL is missing; live storage, actual tables and browser admin visibility remain unverified.
- npm run build: builds real server RPC and traces dependencies. Inherited ignoreBuildErrors remains; full tsc has pre-existing template/tooling errors.
- No production deployment, data deletion or database migration has been performed by this investigation.

## Verified results for the latest revision
- 15 updated automated tests PASS (payment-card requirements were removed/replaced with optional-phone, no-card-storage and registration-date tests).
- Local production build PASS. RPC file trace contains 3 Next.js source-map files plus the existing generated Prisma query-engine library; each referenced file exists.
- Built-server HTTP checks PASS: private admin route redirects (307), guest admin RPC is 401, invalid quantity is 400, missing database connection is 503 with a generic Arabic message. Server logs show only error class/code, not ORM error bodies or connection secrets.
- Real MySQL integration test FAILS explicitly at missing DATABASE_URL preflight. No live order was created; no real database table inspection or authenticated browser display was completed.
- Full tsc fails on existing template/tooling files; latest check reports no errors in changed registration action/form/receipt, admin action, API route, auth base or tests.
- Updated the existing draft PR only. Integration-triggered previews are not evidence of production persistence, and no production promotion has been performed.
