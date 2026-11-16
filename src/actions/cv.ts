'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const ALLOWED_EXT = ['.docx', '.pdf'];
const MAX_SIZE = 15 * 1024 * 1024;

function unauthorized() {
  return { success: false, error: 'Unauthorized' };
}

async function requireMaster() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') return null;
  return session;
}

function fileName(formData: FormData) {
  const v = formData.get('file');
  if (!(v instanceof Blob)) return null;
  return v.name || null;
}

function fileExt(name: string) {
  return extname(name).toLowerCase();
}

export async function replaceCv(formData: FormData) {
  const session = await requireMaster();
  if (!session) return unauthorized();

  const file = formData.get('file');
  if (!(file instanceof Blob)) {
    return { success: false, error: 'No file uploaded' };
  }

  const name = file.name || 'cv';
  if (!ALLOWED_EXT.includes(fileExt(name))) {
    return { success: false, error: 'Only .docx and .pdf are allowed' };
  }
  if (file.size > MAX_SIZE) {
    return { success: false, error: 'File too large (max 15 MB)' };
  }

  const uploadDir = join(process.cwd(), 'public', 'cv');
  const target = join(uploadDir, 'CV_ATS_Muhammad_Kasyfu_Najib.docx');
  const buffer = Buffer.from(await file.arrayBuffer());
  mkdirSync(uploadDir, { recursive: true });
  writeFileSync(target, buffer);

  revalidatePath('/cv');
  revalidatePath('/admin/cv');
  return { success: true, message: 'CV replaced' };
}

export async function currentCvInfo() {
  const dir = join(process.cwd(), 'public', 'cv');
  const file = join(dir, 'CV_ATS_Muhammad_Kasyfu_Najib.docx');
  if (!existsSync(file)) return null;
  const stat = require('node:fs').statSync(file);
  return {
    name: 'CV_ATS_Muhammad_Kasyfu_Najib.docx',
    size: stat.size,
    modified: stat.mtime.toISOString(),
    downloadUrl: `/cv/CV_ATS_Muhammad_Kasyfu_Najib.docx`,
  };
}
