'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { portfolioSchema, type PortfolioInput } from '@/lib/validators';
import { slugify as slugifyFn } from '@/lib/slugify';

function unauthorized() {
  return { success: false, error: 'Unauthorized' };
}

export async function listPortfolios() {
  return db.portfolio.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getPortfolio(slug: string) {
  if (!slug) return null;
  return db.portfolio.findUnique({ where: { slug } });
}

export async function getPortfolioById(id: string) {
  if (!id) return null;
  return db.portfolio.findUnique({ where: { id } });
}

export async function createPortfolio(data: unknown) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  const parsed = portfolioSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }
  const input: PortfolioInput = parsed.data;

  const slug = slugifyFn(input.slug || input.title);
  if (!slug) {
    return { success: false, error: 'Slug is required' };
  }

  const existing = await db.portfolio.findUnique({ where: { slug } });
  if (existing) {
    const err: any = 'Slug already in use';
    err.fieldErrors = { slug: ['Slug already in use'] };
    return { success: false, error: err };
  }

  const created = await db.portfolio.create({
    data: {
      slug,
      title: input.title,
      summary: input.summary,
      description: input.description,
      category: input.category,
      imageUrl: input.imageUrl || null,
      demoUrl: input.demoUrl || null,
      repoUrl: input.repoUrl || null,
      tags: input.tags ?? [],
      featured: input.featured ?? false,
    },
  });

  return { success: true, data: created };
}

export async function updatePortfolio(id: string, data: unknown) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  const parsed = portfolioSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }
  const input: PortfolioInput = parsed.data;

  const existing = await db.portfolio.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: 'Not found' };
  }

  const slug = input.slug ? slugifyFn(input.slug) : (input.title ? slugifyFn(input.title) : existing.slug);
  // If slug provided/derived differs, check uniqueness against other records
  if (slug && slug !== existing.slug) {
    const clash = await db.portfolio.findUnique({ where: { slug } });
    if (clash && clash.id !== id) {
      const err: any = 'Slug already in use';
      err.fieldErrors = { slug: ['Slug already in use'] };
      return { success: false, error: err };
    }
  }

  const updated = await db.portfolio.update({
    where: { id },
    data: {
      slug: slug || existing.slug,
      title: input.title,
      summary: input.summary,
      description: input.description,
      category: input.category,
      imageUrl: input.imageUrl || null,
      demoUrl: input.demoUrl || null,
      repoUrl: input.repoUrl || null,
      tags: input.tags ?? [],
      featured: input.featured ?? false,
    },
  });

  return { success: true, data: updated };
}

export async function deletePortfolio(id: string) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return unauthorized();

  try {
    await db.portfolio.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
  }
}