import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { signToken, verifyToken, type SessionPayload } from '@/lib/jwt';

const COOKIE_NAME = 'session';
const MAX_AGE = 7 * 24 * 60 * 60;

export { verifyToken };

export async function createSession(userId: string): Promise<string> {
  let role = 'USER';
  try {
    const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (user?.role) role = user.role;
  } catch {
    // ignore db errors in non-request/test contexts
  }
  const token = await signToken({ userId, role });
  try {
    const store = await cookies();
    store.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE,
      path: '/',
    });
  } catch {
    // ignore when outside request scope (e.g. tests)
  }
  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  try {
    const store = await cookies();
    store.delete(COOKIE_NAME);
  } catch {
    // ignore
  }
}
