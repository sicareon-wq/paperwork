# Task 3 Report: Auth (login, session, guard)

## What implemented
- `src/lib/auth.ts`: bcryptjs `hashPassword`/`verifyPassword`.
- `src/lib/jwt.ts`: jose sign/verify helpers (edge-safe) with `JWT_SECRET`.
- `src/lib/session.ts`: `createSession` (signs JWT, sets `session` cookie, 7-day, httpOnly/secure-prod/sameSite lax), `getSession`, `destroySession`.
- `src/middleware.ts`: guards `/admin` (redirect `/login?next=...`) and mutating `/api` routes (401); allowlists public mutations (`/api/contact`, `/api/auth`).
- `src/actions/auth.ts`: Zod-validated `loginAction`, `logoutAction`.
- `src/app/login/page.tsx` + `login-form.tsx`: login form with error display.
- `src/app/admin/layout.tsx` + `page.tsx`: admin shell with sidebar nav + logout.
- `vitest.config.ts` + `tests/unit/auth.test.ts`: minimal vitest config with `@/*` alias; 3 unit tests.
- `tests/unit/` directory created.

## TDD evidence
RED (before implementation):
Command: `npm test -- auth`
Output:
```
FAIL tests/unit/auth.test.ts
Error: Cannot find module '@/lib/auth' imported from tests/unit/auth.test.ts
Test Files 1 failed (1), Tests 0
```
GREEN (after implementation):
Command: `npm test`
Output:
```
✓ tests/unit/auth.test.ts (3 tests)
Test Files 1 passed (1), Tests 3 passed (3)
```

## Verification
- `npm run typecheck`: no errors.
- `npm run build`: success (middleware 39.5 kB, routes compiled).
- Manual smoke: `/admin` → 307 redirect to `/login?next=%2Fadmin`; browser login with seeded admin (sicareon@gmail.com / admin123) reaches `/admin` dashboard.

## Files changed
New: src/lib/auth.ts, src/lib/jwt.ts, src/lib/session.ts, src/middleware.ts, src/actions/auth.ts, src/app/login/page.tsx, src/app/login/login-form.tsx, src/app/admin/layout.tsx, src/app/admin/page.tsx, vitest.config.ts, tests/unit/auth.test.ts.

## Self-review findings
- Cookie uses `cookies()` from next/headers (async, Next 15); wrapped in try/catch so unit tests pass outside request scope.
- `createSession` fetches role from DB but degrades gracefully if unavailable.
- Middleware stays edge-safe by importing only `@/lib/jwt` (jose), not session/db.
- Public mutation allowlist prevents breaking future contact/auth endpoints; other mutating API routes require session.

## Issues/concerns
- Vitest config is minimal; Task 12 should finalize (coverage, setup, etc.).
- Admin sub-routes referenced in sidebar (portfolio, research, ...) not yet implemented; links will 404 until later tasks. Acceptable.
