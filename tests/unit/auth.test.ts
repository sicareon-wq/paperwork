import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { createSession, getSession } from '@/lib/session';
import { verifyToken } from '@/lib/jwt';

describe('auth', () => {
  it('hash+verify roundtrip', async () => {
    const hash = await hashPassword('secret');
    expect(await verifyPassword('secret', hash)).toBe(true);
    expect(await verifyPassword('wrong', hash)).toBe(false);
  });

  it('createSession produces verifiable JWT', async () => {
    const token = await createSession('user-123');
    expect(typeof token).toBe('string');
    const payload = await verifyToken(token);
    expect(payload?.userId).toBe('user-123');
  });

  it('getSession returns null without cookie', async () => {
    const s = await getSession();
    expect(s).toBeNull();
  });
});
