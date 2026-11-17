# Paperwork

Digital paperwork portfolio built with Next.js 15. Monochrome blueprint/technical theme with flat glassmorphism UI. Includes portfolio/research/biodata CRUD, a subnet calculator playground, contact form, CV download, and Master/Visitor auth.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19, TypeScript strict) |
| Database | PostgreSQL (Neon in prod) + Prisma ORM |
| Auth | JWT session in `httpOnly` cookie (`session`), Master admin seeded from env |
| Forms | React Hook Form + Zod validators (shared in `src/lib/validators.ts`) |
| UI | Tailwind CSS flat glassmorphism, Radix primitives, next-themes |
| Email | Resend (contact form, password reset, notifications) |
| E2E | Playwright |

Color palette: black, white, one accent color (blue/cyan tone for the blueprint lines). No other hues.

## Project structure

```
paperwork/
├── prisma/              # schema, migrations, seed
├── src/
│   ├── app/             # routes (/, /portfolio, /research, /biodata, /playground, /contact, /cv, /admin, /login)
│   ├── components/
│   │   └── layout/      # ThemeProvider, Navbar, Footer, PageTransitions
│   ├── actions/         # server actions (auth, portfolio, contact, biodata, research)
│   └── lib/             # validators (Zod), utils, prisma client
├── tests/e2e/           # Playwright smoke suite
├── public/uploads/      # dev file uploads (gitignored, keep .gitkeep)
├── vercel.json          # deploy config with env aliases
├── .env.example         # env template
└── README.md
```

## Environment variables

Copy `.env.example` to `.env` and fill every variable.

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string, `sslmode=require` in prod |
| `JWT_SECRET` | yes | 32+ chars, random per environment |
| `ADMIN_EMAIL` | yes | Master admin email (overrides seed default) |
| `ADMIN_PASSWORD` | yes | Master admin password (overrides seed default) |
| `RESEND_API_KEY` | yes | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | yes | Email address that receives contact submissions |
| `NEXT_PUBLIC_SITE_URL` | yes | Public URL of the deployed app |

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Production server (used by Playwright E2E + Vercel) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Unit tests (vitest) |
| `npm run test:e2e` | Playwright E2E |
| `npm run db:push` | Create tables without migrations |
| `npm run db:migrate` | Prisma migration dev |
| `npm run db:seed` | Seed master admin |
| `npm run db:studio` | Prisma GUI |

## Tests

- **Unit**: `npm test` (vitest)
- **E2E smoke**: `npx playwright test` (`tests/e2e/smoke.spec.ts`) — home page, portfolio list, login page, admin login + CRUD flow. Run `npm run build` first so `npm run start` works.

## Admin (Master)

- Login at `/admin` with `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
- Session cookie `session`, httpOnly, `secure: true` in production, SameSite Lax.
- Master CRUD: portfolio, research, biodata. Seed creates `ADMIN_EMAIL`/`ADMIN_PASSWORD` when the DB is empty.

## Visitor

- Public pages: home, portfolio, research, biodata, playground, contact, CV.
- No account needed.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Create a Vercel project, framework **Next.js**.
3. Set environment variables in the Vercel dashboard (see table above). Vercel names them as aliases in `vercel.json` (`@database-url`, `@jwt-secret`, `@admin-email`, `@admin-password`, `@resend-api-key`, `@contact-to-email`, `@site-url`).
4. Add a **Postgres** database (Neon) and put the connection string in `DATABASE_URL`.
5. Deploy. `vercel.json` runs `next build` at deploy time. After the first deploy, run `prisma migrate deploy` + `prisma db seed` on the production database (Vercel "Run Command", or a one-off Edge/Runtime function) so the schema and seed data exist.

Related: [docs/task-reports/task-11-report.md](task-reports/task-11-report.md) — Task 11 layout/theming/SEO report.
