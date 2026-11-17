## Task 1: Repo scaffold + tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example`, `LICENSE`, `README.md`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create repo + init git + license**

```bash
mkdir -p /home/shyfu/Data/project/paperwork && cd /home/shyfu/Data/project/paperwork
git init
cat > LICENSE <<'EOF'
MIT License

Copyright (c) 2026 Muhammad Kasyfu Najib

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

- [ ] **Step 2: Create package.json with dependencies**

```json
{
  "name": "paperwork",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.20.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.0",
    "motion": "^11.11.0",
    "animejs": "^3.2.2",
    "number-flow": "^0.4.0",
    "jose": "^5.9.6",
    "lucide-react": "^0.454.0",
    "next": "^15.0.0",
    "next-themes": "^0.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.53.0",
    "resend": "^4.0.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.47",
    "prisma": "^5.20.0",
    "tailwindcss": "^3.4.14",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  },
  "prisma": { "seed": "tsx prisma/seed.ts" }
}
```

- [ ] **Step 3: Create tsconfig, next.config, tailwind, postcss, eslint**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom","dom.iterable","esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:
```ts
import type { NextConfig } from 'next';
const config: NextConfig = { images: { remotePatterns: [] } };
export default config;
```

`tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
```

`postcss.config.mjs`: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`

`.env.example`:
```
DATABASE_URL="postgresql://user:pass@host:5432/paperwork?sslmode=require"
JWT_SECRET="change-me-32-chars-min"
ADMIN_EMAIL="sicareon@gmail.com"
ADMIN_PASSWORD="change-me"
RESEND_API_KEY=""
CONTACT_TO_EMAIL="sicareon@gmail.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`.gitignore`: standard Next.js + `.env*` (keep `.env.example`), `node_modules`, `.next`, `prisma/dev.db`.

- [ ] **Step 4: Create root layout, landing page, globals.css**

`src/app/globals.css`: tailwind directives + base styles (font, dark mode vars).
`src/app/layout.tsx`: html/body, ThemeProvider (next-themes), Toaster (sonner), metadata.
`src/app/page.tsx`: simple landing with hero + links to portfolio/research/biodata/playground/contact/cv.

- [ ] **Step 5: Install deps & verify build**

Run: `npm install && npm run typecheck && npm run build`
Expected: build succeeds, no type errors.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js 15 project with tooling"
```

