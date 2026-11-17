## Task 3: Auth (login, session, guard)

**Files:**
- Create: `src/lib/auth.ts`, `src/lib/session.ts`, `src/middleware.ts`, `src/app/login/page.tsx`, `src/app/admin/layout.tsx`, `src/actions/auth.ts`
- Create: `tests/unit/auth.test.ts`

**Interfaces:**
- Consumes: `db` (Task 2).
- Produces: `hashPassword(pw): Promise<string>`, `verifyPassword(pw, hash): Promise<boolean>`, `createSession(userId): Promise<string>` (JWT), `getSession(): Promise<{userId,role}|null>`, `destroySession()`, server actions `loginAction`, `logoutAction`.

- [ ] **Step 1: Write failing auth unit tests** (`tests/unit/auth.test.ts`): hash+verify roundtrip; createSession produces verifiable JWT; getSession returns null without cookie.

- [ ] **Step 2: Run tests → expect FAIL**

Run: `npm test -- auth` → FAIL.

- [ ] **Step 3: Implement `src/lib/auth.ts` and `src/lib/session.ts`**

`auth.ts`: bcryptjs hash/verify.
`session.ts`: jose SignJWT/VerifyJWT with secret from env, cookie helpers via `cookies()` from next/headers.

- [ ] **Step 4: Implement middleware guard**

`src/middleware.ts`: match `/admin/:path*`; if no valid session → redirect `/login?next=...`. Also protect API mutation routes (return 401).

- [ ] **Step 5: Implement login page + actions**

`src/actions/auth.ts`: `loginAction(formData)` validates with Zod, finds user, verifies password, creates session, redirects to `/admin`. `logoutAction` destroys session + redirects `/`.

`src/app/login/page.tsx`: form with email+password, error display.

`src/app/admin/layout.tsx`: server component checks session; renders admin shell (sidebar nav).

- [ ] **Step 6: Run tests → PASS; manual smoke login**

Run: `npm test && npm run dev` → visit `/admin` redirects to `/login`; login with seeded admin works.

- [ ] **Step 7: Commit**

