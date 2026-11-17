# Paperwork

Digital paperwork portfolio built with Next.js 15.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run typecheck` – TypeScript check
- `npm run test` – unit tests (vitest)
- `npm run test:e2e` – e2e tests (playwright)

## Documentation

See [`docs/README.md`](docs/README.md) for the full guide: project overview, tech stack, environment variables, getting started, scripts, testing, admin (Master) and visitor roles, and Vercel deployment.

## Deployment

1. Push this repo to GitHub.
2. Create a Vercel project (framework: Next.js).
3. Set environment variables in the Vercel dashboard (see `.env.example`):

   | Variable | Alias in `vercel.json` |
   | --- | --- |
   | `DATABASE_URL` | `@database-url` |
   | `JWT_SECRET` | `@jwt-secret` |
   | `ADMIN_EMAIL` | `@admin-email` |
   | `ADMIN_PASSWORD` | `@admin-password` |
   | `RESEND_API_KEY` | `@resend-api-key` |
   | `CONTACT_TO_EMAIL` | `@contact-to-email` |
   | `NEXT_PUBLIC_SITE_URL` | `@site-url` |

4. Attach a Neon PostgreSQL database and set `DATABASE_URL`.
5. Deploy. `next build` runs at deploy time. After the first deploy, run `prisma migrate deploy` + `prisma db seed` on the production database (Vercel Run Command) so the schema and seed data exist.

## License

MIT (see `LICENSE`).
