## Task 6: Research CRUD

**Files:**
- Create: `src/lib/validators.ts` (researchSchema), `src/components/research/ResearchCard.tsx`, `ResearchForm.tsx`, `src/app/research/page.tsx`, `src/app/research/[slug]/page.tsx`, `src/app/admin/research/*`, `src/actions/research.ts`
- Modify: `prisma/seed.ts` (add 2 sample research posts)

**Interfaces:**
- Produces: `listResearch()`, `getResearch(slug)`, `createResearch(data)`, `updateResearch(id,data)`, `deleteResearch(id)`.

- [ ] **Step 1: Implement researchSchema** (title, excerpt, content, category, fileUrl optional, coverUrl optional, published).

- [ ] **Step 2: Server actions** with auth guard, Zod validation, slug uniqueness, support fileUrl (drag&drop) or pasted content.

- [ ] **Step 3: Build UI**: list, detail, admin CRUD forms with Dropzone for cover/file AND textarea for pasted content.

- [ ] **Step 4: Seed 2 sample research posts** (AI evaluation, networking notes).

- [ ] **Step 5: Empty state + Review Focus tests** (empty list, slug collision).

- [ ] **Step 6: Commit**

