import { describe, it, expect } from 'vitest';
import { researchSchema, slugify } from '@/lib/validators';

describe('researchSchema', () => {
  it('valid input passes', () => {
    const r = researchSchema.safeParse({
      title: 'Notes on AI Model Evaluation',
      excerpt: 'Practical notes.',
      content: '<p>Hello</p>',
      category: 'AI',
    });
    expect(r.success).toBe(true);
  });

  it('missing title fails', () => {
    const r = researchSchema.safeParse({ excerpt: 'x' });
    expect(r.success).toBe(false);
  });

  it('slugify lowercases and replaces non-alphanumerics', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  Foo--Bar  ')).toBe('foo-bar');
  });

  it('published defaults to true', () => {
    const r = researchSchema.safeParse({ title: 'T', content: 'c' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.published).toBe(true);
  });

  it('empty strings default for optional text fields', () => {
    const r = researchSchema.safeParse({ title: 'T' });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.excerpt).toBe('');
      expect(r.data.content).toBe('');
      expect(r.data.category).toBe('');
      expect(r.data.fileUrl).toBe('');
      expect(r.data.coverUrl).toBe('');
    }
  });

  it('rejects non-URL fileUrl/coverUrl but allows empty', () => {
    const bad = researchSchema.safeParse({ title: 'T', fileUrl: 'not-a-url' });
    expect(bad.success).toBe(false);
    const badCover = researchSchema.safeParse({ title: 'T', coverUrl: 'ftp://x' });
    expect(badCover.success).toBe(false);
    const ok = researchSchema.safeParse({ title: 'T', fileUrl: '', coverUrl: 'https://example.com/a.png' });
    expect(ok.success).toBe(true);
  });
});
