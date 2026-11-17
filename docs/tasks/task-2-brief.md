## Task 2: Database schema + Prisma + seed

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db.ts`
- Modify: `.env` (from .env.example)

**Interfaces:**
- Produces: `prisma` client export `db` from `src/lib/db.ts`; models `User`, `Portfolio`, `Research`, `Biodata`, `PlaygroundWidget`, `ContactMessage`.

- [ ] **Step 1: Write prisma/schema.prisma**

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Role { MASTER VISITOR }

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(MASTER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Portfolio {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  summary     String
  description String   @db.Text
  category    String
  imageUrl    String?
  demoUrl     String?
  repoUrl     String?
  tags        String[]
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Research {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  excerpt   String
  content   String   @db.Text
  category  String
  fileUrl   String?
  coverUrl  String?
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Biodata {
  id            String   @id @default("singleton")
  name          String
  location      String
  headline      String
  summary       String   @db.Text
  phone         String
  email         String
  linkedin      String
  github        String
  experience    Json
  projects      Json
  education     Json
  certifications Json
  skills        Json
  languages     Json
  achievements  Json
  updatedAt     DateTime @updatedAt
}

model PlaygroundWidget {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  type      String
  config    Json?
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

- [ ] **Step 2: Create src/lib/db.ts**

```ts
import { PrismaClient } from '@prisma/client';
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

- [ ] **Step 3: Create prisma/seed.ts**

Seed admin user (from env, bcrypt hash), biodata (from CV docx content), sample portfolio (3), sample research (2), playground widget (subnet-calculator). Use `upsert` for idempotency. Admin password hashed with bcryptjs (10 rounds).

- [ ] **Step 4: Run migrate + seed + verify**

Run: `npm run db:migrate -- --name init && npm run db:seed`
Expected: tables created, seed success. Verify with `npm run db:studio` (optional).

- [ ] **Step 5: Commit**

```bash
git add prisma src/lib/db.ts && git commit -m "feat: add Prisma schema and seed data"
```

