import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface SessionPayload {
  userId: string;
  role: string;
}

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is required');
  return new TextEncoder().encode(s);
}

export async function signToken(payload: SessionPayload, expiresIn = '7d'): Promise<string> {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret());
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ['HS256'] });
    if (typeof payload.userId !== 'string') return null;
    return {
      userId: payload.userId,
      role: typeof payload.role === 'string' ? payload.role : 'USER',
    };
  } catch {
    return null;
  }
}
