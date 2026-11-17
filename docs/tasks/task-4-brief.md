## Task 4: Biodata (view + in-place edit)

**Files:**
- Create: `src/lib/validators.ts` (biodataSchema), `src/components/biodata/BiodataView.tsx`, `src/components/biodata/BiodataEditForm.tsx`, `src/app/biodata/page.tsx`, `src/app/admin/biodata/page.tsx`, `src/actions/biodata.ts`

**Interfaces:**
- Consumes: `db`, `getSession`, Zod.
- Produces: `getBiodata()`, `updateBiodata(data)` server actions.

- [ ] **Step 1: Add biodataSchema to validators** (Zod, all fields from CV).

- [ ] **Step 2: Implement server actions** `getBiodata` (upsert singleton if missing), `updateBiodata` (Master only, validated).

- [ ] **Step 3: Build BiodataView** (read-only, styled sections: summary, experience, projects, education, certifications, skills, languages, achievements, contact links).

- [ ] **Step 4: Build BiodataEditForm** (react-hook-form + zod, inline sections, save button, toast).

- [ ] **Step 5: Wire pages**: `/biodata` (view) and `/admin/biodata` (edit form). Guard admin.

- [ ] **Step 6: Verify empty fallback**: if no biodata row, seed creates it; view renders.

- [ ] **Step 7: Commit**

