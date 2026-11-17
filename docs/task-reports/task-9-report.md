# Task 9 Report — Contact form → email

## Status
Done. Committed as ba2d933 on main.

## Changes
- `src/lib/validators.ts` — added `contactSchema` (name, email, subject, message; trim/min/email/max) + `ContactFormValues` type.
- `src/lib/email.ts` — `sendContactMessage(data)`: validates, stores ContactMessage in DB, sends via Resend when `RESEND_API_KEY` is set (else console.log + store only). Honors `CONTACT_TO_EMAIL`/`ADMIN_EMAIL` recipient.
- `src/actions/contact.ts` — `contactAction(formData)`: IP rate limit (5 per 60s, x-forwarded-for), calls sendContactMessage, returns success/error/fieldErrors.
- `src/components/contact/ContactForm.tsx` — react-hook-form + zod client validation, per-field errors, sonner success/error toasts, preserves data on failure, monochrome glassmorphism card.
- `src/app/contact/page.tsx` — contact page with blueprint grid + flat glassmorphism card.
- `tests/unit/contact-schema.test.ts` — 8 tests (valid passes; empty name/email/subject/message fail; invalid email fails; whitespace-only fails; over-long fails).
- `tests/unit/contact-action.test.ts` — 2 tests: invalid input returns field errors without storing/sending; IP rate-limit blocks 6th request per window.

## Verification
- `npm run typecheck`: clean
- `npx vitest run`: 7 files, 33 tests passed (8 new contact tests + 25 pre-existing)
- `npm run build`: /contact builds fine (1.85 kB)

## Concerns
- Email only sends when `RESEND_API_KEY` is configured (currently empty in .env); otherwise stored-and-logged only.
- IP rate limit is in-memory; resets on server restart and ignores deployments with multiple instances.
- Page not yet linked from site navigation.
- Untracked `public/uploads/*.png` artifacts exist from prior tasks; not committed.
