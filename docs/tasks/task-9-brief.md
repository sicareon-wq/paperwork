## Task 9: Contact form → email

**Files:**
- Create: `src/lib/email.ts`, `src/lib/validators.ts` (contactSchema), `src/components/contact/ContactForm.tsx`, `src/app/contact/page.tsx`, `src/actions/contact.ts`, `tests/unit/contact-schema.test.ts`

**Interfaces:**
- Produces: `sendContactMessage(data)` (validates, stores ContactMessage, sends email via Resend).

- [ ] **Step 1: Write failing contact schema tests** (valid passes; empty name/email/message fail; invalid email fails).

- [ ] **Step 2: Implement contactSchema.**

- [ ] **Step 3: Implement email.ts** (Resend client; if no API key, log + store only).

- [ ] **Step 4: Implement server action** (validate, rate-limit by IP simple, store, send email, return result).

- [ ] **Step 5: Build ContactForm** (react-hook-form, per-field errors, success toast, preserve data on failure).

- [ ] **Step 6: Review Focus test**: invalid input → 400, no email sent.

- [ ] **Step 7: Commit**

