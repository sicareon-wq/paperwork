import { describe, it, expect } from 'vitest';
import { uploadFile } from '@/lib/storage';

describe('tmp upload', () => {
  it('rejects oversized', async () => {
    const big = new File([new Uint8Array(6 * 1024 * 1024)], 'big.png', { type: 'image/png' });
    const res = await uploadFile(big);
    expect(res.success).toBe(false);
  });
  it('rejects non-image', async () => {
    const f = new File(['x'], 'a.txt', { type: 'text/plain' });
    const res = await uploadFile(f);
    expect(res.success).toBe(false);
  });
  it('accepts small image', async () => {
    const f = new File([new Uint8Array(10)], 'a.png', { type: 'image/png' });
    const res = await uploadFile(f);
    expect(res.success).toBe(true);
    expect(res.url).toMatch(/^\/uploads\//);
  });
});