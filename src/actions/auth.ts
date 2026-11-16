'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { createSession, destroySession } from '@/lib/session';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(_prev: unknown, formData: FormData) {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: 'Invalid input' };
  }
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  const hashToCompare = user?.password ?? '$2a$10$N4hMMsyRFW5rE1/8tC2QfeC5eeX0KMn0N8NJvO9HerjN3duyYQz1i';
  const ok = await verifyPassword(parsed.data.password, hashToCompare);
  if (!user || !ok) {
    return { error: 'Invalid credentials' };
  }
  await createSession(user.id);
  const next = (formData.get('next') as string) || '/admin';
  const safeNext =
    typeof next === 'string' &&
    next.startsWith('/') &&
    !next.startsWith('//') &&
    !next.includes('\\')
      ? next
      : '/admin';
  redirect(safeNext);
}

export async function logoutAction() {
  await destroySession();
  redirect('/');
}
