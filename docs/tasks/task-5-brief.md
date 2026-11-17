## Task 5: Portfolio CRUD

**Files:**
- Create: `src/lib/validators.ts` (portfolioSchema), `src/components/portfolio/PortfolioCard.tsx`, `PortfolioForm.tsx`, `src/components/upload/Dropzone.tsx`, `src/components/states/EmptyState.tsx`, `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx`, `src/app/admin/portfolio/page.tsx`, `src/app/admin/portfolio/new/page.tsx`, `src/app/admin/portfolio/[id]/edit/page.tsx`, `src/actions/portfolio.ts`, `src/actions/upload.ts`, `src/lib/storage.ts`
- Create: `tests/unit/portfolio-schema.test.ts`

**Interfaces:**
- Produces: `listPortfolios()`, `getPortfolio(slug)`, `createPortfolio(data)`, `updatePortfolio(id,data)`, `deletePortfolio(id)`, `uploadFile(file)`.

- [ ] **Step 1: Write failing schema tests** (valid input passes; missing title fails; duplicate slug handled at action level).

- [ ] **Step 2: Implement portfolioSchema + slugify helper** (slug from title, unique check in action).

- [ ] **Step 3: Implement storage abstraction** (`src/lib/storage.ts`: dev writes to `/public/uploads`, prod uses Vercel Blob if token present).

- [ ] **Step 4: Implement server actions** with auth guard, Zod validation, slug uniqueness check (throw typed error on collision).

- [ ] **Step 5: Build UI**: list (grid of cards, filter by category), detail page, admin list + new/edit forms with Dropzone for image, delete with confirm.

- [ ] **Step 6: Empty state** on `/portfolio` when no rows.

- [ ] **Step 7: Review Focus tests**: empty list renders EmptyState; slug collision returns validation error; oversized upload rejected.

- [ ] **Step 8: Commit**

