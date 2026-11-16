'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createPortfolio, updatePortfolio } from '@/actions/portfolio';
import { uploadFile } from '@/actions/upload';
import { portfolioSchema } from '@/lib/validators';
import Dropzone from '@/components/upload/Dropzone';

type Portfolio = {
  id?: string;
  slug?: string;
  title?: string;
  summary?: string;
  description?: string;
  category?: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
  tags?: string[];
  featured?: boolean;
};

type FormValues = {
  title: string;
  summary: string;
  description: string;
  category: string;
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
  tags: string;
  featured: boolean;
};

export default function PortfolioForm({ initial, mode }: { initial?: Portfolio; mode: 'create' | 'edit' }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: initial?.title ?? '',
      summary: initial?.summary ?? '',
      description: initial?.description ?? '',
      category: initial?.category ?? '',
      imageUrl: initial?.imageUrl ?? '',
      demoUrl: initial?.demoUrl ?? '',
      repoUrl: initial?.repoUrl ?? '',
      tags: (initial?.tags ?? []).join(', '),
      featured: initial?.featured ?? false,
    },
  });

  const imageUrl = watch('imageUrl');

  const onSubmit = async (values: FormValues) => {
    const payload = {
      title: values.title,
      summary: values.summary,
      description: values.description,
      category: values.category,
      imageUrl: values.imageUrl,
      demoUrl: values.demoUrl,
      repoUrl: values.repoUrl,
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: values.featured,
    };

    const parsed = portfolioSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error('Validation failed. Check your inputs.');
      return;
    }

    setSaving(true);
    try {
      const res =
        mode === 'create'
          ? await createPortfolio(parsed.data)
          : await updatePortfolio(initial!.id!, parsed.data);
      if (res && (res as any).success === false) {
        toast.error(typeof (res as any).error === 'string' ? (res as any).error : 'Save failed.');
        return;
      }
      toast.success(mode === 'create' ? 'Created.' : 'Saved.');
      router.push('/admin/portfolio');
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
        setValue('imageUrl', res.url);
        toast.success('Image uploaded.');
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
          <span className="text-sm font-medium">Title</span>
          <input {...register('title')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Category</span>
          <input {...register('category')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Summary</span>
        <input {...register('summary')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Description</span>
        <textarea {...register('description')} rows={8} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </label>
      <div className="space-y-2">
        <span className="text-sm font-medium">Image</span>
        <Dropzone value={imageUrl} onFile={handleUpload} uploading={uploading} progress={progress} />
        <input {...register('imageUrl')} placeholder="Image URL" className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Demo URL</span>
          <input {...register('demoUrl')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Repo URL</span>
          <input {...register('repoUrl')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Tags (comma separated)</span>
        <input {...register('tags')} className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('featured')} />
        Featured
      </label>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {saving ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
      </button>
    </form>
  );
}