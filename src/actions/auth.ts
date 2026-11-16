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
  if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
    return { error: 'Invalid credentials' };
  }
  await createSession(user.id);
  const next = (formData.get('next') as string) || '/admin';
  redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/admin');
}

export async function logoutAction() {
  await destroySession();
  redirect('/');
}