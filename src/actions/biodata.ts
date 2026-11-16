'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { biodataSchema, type BiodataInput } from '@/lib/validators';

const SINGLETON_ID = 'singleton';

function emptyBiodata() {
  return {
    id: SINGLETON_ID,
    name: '',
    location: '',
    headline: '',
    summary: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    experience: [] as unknown[],
    projects: [] as unknown[],
    education: [] as unknown[],
    certifications: [] as unknown[],
    skills: [] as string[],
    languages: [] as string[],
    achievements: [] as string[],
  };
}

export async function getBiodata() {
  let row = await db.biodata.findUnique({ where: { id: SINGLETON_ID } });
  if (!row) {
    row = await db.biodata.create({ data: emptyBiodata() as any });
  }
  return row;
}

export async function updateBiodata(data: unknown) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = biodataSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const payload: BiodataInput = parsed.data;

  const updated = await db.biodata.upsert({
    where: { id: SINGLETON_ID },
    update: payload as any,
    create: { id: SINGLETON_ID, ...payload } as any,
  });

  return { success: true, data: updated, ...updated };
}
