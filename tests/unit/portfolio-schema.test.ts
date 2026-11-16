import { describe, it, expect } from 'vitest';
import { portfolioSchema, slugify } from '@/lib/validators';

describe('portfolioSchema', () => {
  it('valid input passes', () => {
    const r = portfolioSchema.safeParse({
      title: 'My Project',
      summary: 'summary',
      description: 'desc',
      category: 'Software',
    });
    expect(r.success).toBe(true);
  });

  it('missing title fails', () => {
    const r = portfolioSchema.safeParse({ summary: 'summary' });
    expect(r.success).toBe(false);
  });

  it('slugify lowercases and replaces non-alphanumerics', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  Foo--Bar  ')).toBe('foo-bar');
  });
});