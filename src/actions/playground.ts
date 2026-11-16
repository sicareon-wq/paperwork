'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const widgetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  type: z.string().min(1, 'Type is required'),
  config: z.record(z.any()).default({}),
});

function unauthorized() {
  return { success: false, error: 'Unauthorized' };
}

async function requireMaster() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return null;
  return session;
}

export async function listWidgets() {
  return db.playgroundWidget.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function createWidget(formData: FormData) {
  const session = await requireMaster();
  if (!session) return unauthorized();

  const name = formData.get('name') as string ?? '';
  const slug = formData.get('slug') as string ?? '';
  const type = formData.get('type') as string ?? '';
  const config = {};

  const parsed = widgetSchema.safeParse({ name, slug, type, config });
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }
  const input = parsed.data;

  const existing = await db.playgroundWidget.findUnique({ where: { slug: input.slug } });
  if (existing) {
    const err: any = 'Widget slug already in use';
    err.fieldErrors = { slug: ['Widget slug already in use'] };
    return { success: false, error: err };
  }

  const maxOrder = await db.playgroundWidget.aggregate({ _max: { order: true } });
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const created = await db.playgroundWidget.create({
    data: {
      name: input.name,
      slug: input.slug,
      type: input.type,
      config: input.config,
      order: nextOrder,
    },
  });

  revalidatePath('/admin/playground');
  return { success: true, data: created };
}

export async function deleteWidget(id: string) {
  const session = await requireMaster();
  if (!session) return unauthorized();

  try {
    await db.playgroundWidget.delete({ where: { id } });
    revalidatePath('/admin/playground');
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
  }
}

export async function reorderWidget(id: string, direction: 'up' | 'down') {
  const session = await requireMaster();
  if (!session) return unauthorized();

  const widgets = await db.playgroundWidget.findMany({ orderBy: { order: 'asc' } });
  const index = widgets.findIndex((w) => w.id === id);
  if (index === -1) return { success: false, error: 'Not found' };

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= widgets.length) {
    return { success: false, error: 'Cannot move' };
  }

  const [moved] = widgets.splice(index, 1);
  const target = widgets[targetIndex];
  await Promise.all([
    db.playgroundWidget.update({ where: { id: moved.id }, data: { order: target.order } }),
    db.playgroundWidget.update({ where: { id: target.id }, data: { order: moved.order } }),
  ]);

  revalidatePath('/admin/playground');
  return { success: true };
}
