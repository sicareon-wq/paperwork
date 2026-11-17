# Task 2 Report: Database schema + Prisma + seed

## What implemented
- `prisma/schema.prisma`: Prisma schema with datasource (PostgreSQL), generator, `Role` enum, and models `User`, `Portfolio`, `Research`, `Biodata` (singleton id), `PlaygroundWidget`, `ContactMessage` exactly per brief.
- `src/lib/db.ts`: PrismaClient singleton pattern (global cache in non-production).
- `prisma/seed.ts`: Idempotent upserts for:
  - Admin `User` from env (`ADMIN_EMAIL`/`ADMIN_PASSWORD`), bcryptjs 10 rounds, role MASTER.
  - `Biodata` singleton seeded from CV docx content (name, location, headline, summary, phone, email, linkedin, github, experience, projects, education, certifications, skills, languages, achievements).
  - 3 sample portfolios (AI Chatbot Evaluation Case Study, Annotation Quality Portfolio, GitHub Portfolio).
  - 2 sample research posts (AI evaluation notes, networking notes).
  - 1 `PlaygroundWidget` (subnet-calculator).

## Verification
- `npm run db:migrate -- --name init`: migration `20261116113558_init` created & applied; Prisma Client generated. Pass.
- `npm run db:seed`: "Seed completed." Pass.
- Row counts verified: users=1, portfolios=3, research=2, biodata=1, widgets=1. Admin email sicareon@gmail.com role MASTER. Password hash verifies against `admin123`. Biodata name/headline correct.
- `npm run typecheck`: no errors. Pass.

## Files changed
- prisma/schema.prisma (new)
- prisma/seed.ts (new)
- src/lib/db.ts (new)
- prisma/migrations/20261116113558_init/migration.sql (new)
- prisma/migrations/migration_lock.toml (new)

## Self-review findings
- Seed uses `as any` casts for Json fields to satisfy Prisma's Json input typing; acceptable for seed script.
- Biodata experience/projects shapes are arrays of objects; skills/languages/achievements are string arrays. Later biodata view (Task 4) should align with these shapes.
- `.env` was already present (not modified).
- No tests applicable (TDD N/A); verification via migrate/seed/typecheck.

## Issues/concerns
- None blocking. Prisma 5.22.0 installed (newer 8.x available but not required).
- CV experience date "June 2026 – Present" retained as in source docx (future-dated); not corrected.
