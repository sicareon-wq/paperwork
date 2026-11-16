'use server';

import { getSession } from '@/lib/session';
import { uploadFile as storeUpload, MAX_UPLOAD_SIZE, isImageType } from '@/lib/storage';

export async function uploadFile(file: File) {
  if (!file || typeof file.size !== 'number') {
    return { success: false, error: 'No file provided' };
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    return { success: false, error: 'File too large (max 5MB)' };
  }
  if (!isImageType(file.type)) {
    return { success: false, error: 'Only image files are allowed' };
  }

  const session = await getSession();
  if (!session || session.role !== 'MASTER') {
    return { success: false, error: 'Unauthorized' };
  }

  return storeUpload(file);
}

export default uploadFile;