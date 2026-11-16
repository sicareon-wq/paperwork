'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { researchSchema, type ResearchInput } from '@/lib/validators';
import { slugify as slugifyFn } from '@/lib/slugify';

function unauthorized() {
  return { success: false, error: 'Unauthorized' };
}

export async function listResearch(publishedOnly = false) {
  return db.research.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: { createdAt: 'desc' },
  });
}

export async function getResearch(slug: string) {
  if (!slug) return null;
  return db.research.findUnique({ where: { slug } });
}

export async function getResearchById(id: string) {
  if (!id) return null;
  return db.research.findUnique({ where: { id } });
}

export async function createResearch(data: unknown) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  const parsed = researchSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }
  const input: ResearchInput = parsed.data;

  const slug = slugifyFn(input.slug || input.title);
  if (!slug) {
    return { success: false, error: 'Slug is required' };
  }

  const existing = await db.research.findUnique({ where: { slug } });
  if (existing) {
    const err: any = 'Slug already in use';
    err.fieldErrors = { slug: ['Slug already in use'] };
    return { success: false, error: err };
  }

  const created = await db.research.create({
    data: {
      slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category,
      fileUrl: input.fileUrl || null,
      coverUrl: input.coverUrl || null,
      published: input.published ?? true,
    },
  });

  return { success: true, data: created };
}

export async function updateResearch(id: string, data: unknown) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  const parsed = researchSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }
  const input: ResearchInput = parsed.data;

  const existing = await db.research.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: 'Not found' };
  }

  const slug = input.slug ? slugifyFn(input.slug) : (input.title ? slugifyFn(input.title) : existing.slug);
  if (slug && slug !== existing.slug) {
    const clash = await db.research.findUnique({ where: { slug } });
    if (clash && clash.id !== id) {
      const err: any = 'Slug already in use';
      err.fieldErrors = { slug: ['Slug already in use'] };
      return { success: false, error: err };
    }
  }

  const updated = await db.research.update({
    where: { id },
    data: {
      slug: slug || existing.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category,
      fileUrl: input.fileUrl || null,
      coverUrl: input.coverUrl || null,
      published: input.published ?? existing.published,
    },
  });

  return { success: true, data: updated };
}

export async function deleteResearch(id: string) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  try {
    await db.research.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
  }
}
