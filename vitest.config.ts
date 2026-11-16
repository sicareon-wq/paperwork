import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { readFileSync } from 'node:fs';

try {
  const env = readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
  for (const line of env.split(/\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^"(.*)"$/, '$1');
  }
} catch {}

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
  resolve: {
    alias: { '@': path.resolve(process.cwd(), 'src') },
  },
});