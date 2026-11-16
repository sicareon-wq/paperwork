'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createResearch, updateResearch } from '@/actions/research';
import { uploadFile } from '@/actions/upload';
import { researchSchema } from '@/lib/validators';
import Dropzone from '@/components/upload/Dropzone';

type Research = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  coverUrl?: string | null;
  fileUrl?: string | null;
  published?: boolean;
};

type FormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverUrl: string;
  fileUrl: string;
  published: boolean;
};

export default function ResearchForm({ initial, mode }: { initial?: Research; mode: 'create' | 'edit' }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      title: initial?.title ?? '',
      slug: initial?.slug ?? '',
      excerpt: initial?.excerpt ?? '',
      content: initial?.content ?? '',
      category: initial?.category ?? '',
      coverUrl: initial?.coverUrl ?? '',
      fileUrl: initial?.fileUrl ?? '',
      published: initial?.published ?? true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      coverUrl: values.coverUrl || null,
      fileUrl: values.fileUrl || null,
      published: String(values.published) === 'on',
    };

    const parsed = researchSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error('Validation failed. Check your inputs.');
      return;
    }

    setSaving(true);
    try {
      const res =
        mode === 'create'
          ? await createResearch(parsed.data)
          : await updateResearch(initial!.id!, parsed.data);
      if (res && (res as any).success === false) {
        toast.error(typeof (res as any).error === 'string' ? (res as any).error : 'Save failed.');
        return;
      }
      toast.success(mode === 'create' ? 'Created.' : 'Saved.');
      router.push('/admin/research');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    const timer = setInterval(() => setProgress((p) => Math.min(p + 10, 90)), 100);
    try {
      const res = await uploadFile(file);
      if (res && res.success && res.url) {
        setValue('coverUrl', res.url);
        toast.success('Cover uploaded.');
      } else {
        toast.error((res && res.error) || 'Upload failed.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      clearInterval(timer);
      setProgress(100);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Title <span className="text-neutral-500">*</span></span>
          <input {...register('title')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Slug (auto from title if blank)</span>
          <input {...register('slug')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Category</span>
        <input {...register('category')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Excerpt</span>
        <input {...register('excerpt')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Content (HTML)</span>
        <textarea {...register('content')} rows={14} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" placeholder="Paste HTML content..." />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <span className="text-sm font-medium">Cover</span>
          <Dropzone value={watch('coverUrl')} onFile={handleUpload} uploading={uploading} progress={progress} accept="image/*" />
          <input {...register('coverUrl')} placeholder="Cover URL" className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium">File URL (download link)</span>
          <input {...register('fileUrl')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" placeholder="https://..." />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('published')} defaultChecked />
        Published
      </label>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {saving ? 'Saving...' : mode === 'create' ? 'Create Research' : 'Save Research'}
        </button>
      </div>
    </form>
  );
}
