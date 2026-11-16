import fs from 'node:fs/promises';
import path from 'node:path';
import { slugify } from '@/lib/slugify';

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

export function isImageType(type: string): boolean {
  return typeof type === 'string' && type.startsWith('image/');
}

function safeName(name: string): string {
  const base = slugify(name.replace(/\.[^.]+$/, '')) || 'file';
  const ext = (name.match(/\.[^.]+$/) || [''])[0];
  return `${Date.now()}-${base}${ext}`;
}

export async function saveFileDev(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  const filename = safeName(file.name || 'upload');
  const fullPath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(fullPath, buffer);
  return `/uploads/${filename}`;
}

export async function uploadFile(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!file || typeof file.size !== 'number') {
    return { success: false, error: 'No file provided' };
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    return { success: false, error: 'File too large (max 5MB)' };
  }
  if (!isImageType(file.type)) {
    return { success: false, error: 'Only image files are allowed' };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    // Production (Vercel Blob) path is stubbed until @vercel/blob is added.
    return { success: false, error: 'Vercel Blob support is not configured' };
  }

  try {
    const url = await saveFileDev(file);
    return { success: true, url };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Upload failed' };
  }
}

export default uploadFile;