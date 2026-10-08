# Existing Naftal Mhatati: release checklist

The same Next.js pages, components, Prisma models, dashboard and RPC contract are retained. The static export is replaced by a Next.js server runtime because private URLs and persistent registration require server execution. No replacement database is created.

1. **Rotate the database password previously committed in the schema and generated bundle.** Remove old credentials from Git history as appropriate. Also rotate any publicly seeded administrator credentials. Do not run the legacy `init` script: it resets the database.
2. In Vercel → autocoder → Settings → Environment Variables, configure `DATABASE_URL` (existing MySQL database, encrypted connection as supported by your provider) and a random `JWT_SECRET` of at least 32 characters. Set separate database credentials/data for Preview; never connect preview tests to production. No such variables were configured when these changes were prepared.
3. Back up the existing database. Inspect legacy card values; resolve any shorter than eight digits. Apply `prisma/manual-migrations/20261008-registration-security.sql` once. It retains only the final eight digits, narrows storage, adds the unique idempotency key and a numeric check (MySQL 8.0.16+). This script is intentionally not executed automatically during builds.
4. Ensure at least one trusted ADMIN exists. Public administrator self-registration is now blocked; a signed-in ADMIN may add another administrator. First-admin provisioning must be performed through a trusted database/operator process, not a public bootstrap endpoint. Existing passwords remain compatible.
5. Deploy the PR to Preview, then verify: submit a synthetic registration; find the single matching row in MySQL; sign in as ADMIN and confirm the same reference appears in the dashboard; test search/edit; ensure guest/customer requests to admin URLs and actions are denied. Retry submission with the same key and confirm one row. Remove synthetic data through an authorized operator.
6. Check 375px and 390px phone widths (iPhone/Android), 768px tablet and desktop: RTL alignment, selectors, error messages, receipt, keyboard, no overflow. Local tests use a mocked database; they are not evidence of live persistence or physical-device testing.
7. Merge/deploy to production only after database migration, secret rotation and complete live verification. Existing signed-in administrators should sign in again to receive the new HttpOnly route-access cookie. Logging out clears that cookie. Password changes now update the real administrator account instead of browser-local shared passwords. The build retains the original Inter/Orbitron fonts as local assets.

`npm run test` tests registration persistence contract, idempotency, last-eight validation, admin authorization and tracking privacy. `npm run build` generates Prisma and RPC clients and builds the existing Next.js application.

## Verification recorded during implementation

- Production build completed locally (existing Next.js type checking remains disabled; a full `tsc` check reports pre-existing errors in template/development tooling).
- Automated action tests use an in-memory Prisma mock, not a real MySQL database.
- Local built-server HTTP checks: public homepage returns 200; unauthenticated private URLs redirect to admin login (307); private RPC read/admin creation/password change return 401; sample endpoint returns an empty array (200); reference lookup without a full phone returns a clear error (400).
- Vercel Preview build is separate from unchanged production. No browser/device or live database end-to-end verification has been completed.
