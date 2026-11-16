'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateBiodata } from '@/actions/biodata';
import { biodataSchema } from '@/lib/validators';
import type { BiodataData } from './BiodataView';

type FormValues = {
  name: string;
  location: string;
  headline: string;
  summary: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  experienceJson: string;
  projectsJson: string;
  educationJson: string;
  certificationsJson: string;
  skillsJson: string;
  languagesJson: string;
  achievementsJson: string;
};

export default function BiodataEditForm({ initial }: { initial: BiodataData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: initial.name ?? '',
      location: initial.location ?? '',
      headline: initial.headline ?? '',
      summary: initial.summary ?? '',
      phone: initial.phone ?? '',
      email: initial.email ?? '',
      linkedin: initial.linkedin ?? '',
      github: initial.github ?? '',
      experienceJson: JSON.stringify(initial.experience ?? [], null, 2),
      projectsJson: JSON.stringify(initial.projects ?? [], null, 2),
      educationJson: JSON.stringify(initial.education ?? [], null, 2),
      certificationsJson: JSON.stringify(initial.certifications ?? [], null, 2),
      skillsJson: JSON.stringify(initial.skills ?? [], null, 2),
      languagesJson: JSON.stringify(initial.languages ?? [], null, 2),
      achievementsJson: JSON.stringify(initial.achievements ?? [], null, 2),
    },
  });

  const onSubmit = async (values: FormValues) => {
    let payload: unknown;
    try {
      payload = {
        name: values.name,
        location: values.location,
        headline: values.headline,
        summary: values.summary,
        phone: values.phone,
        email: values.email,
        linkedin: values.linkedin,
        github: values.github,
        experience: JSON.parse(values.experienceJson || '[]'),
        projects: JSON.parse(values.projectsJson || '[]'),
        education: JSON.parse(values.educationJson || '[]'),
        certifications: JSON.parse(values.certificationsJson || '[]'),
        skills: JSON.parse(values.skillsJson || '[]'),
        languages: JSON.parse(values.languagesJson || '[]'),
        achievements: JSON.parse(values.achievementsJson || '[]'),
      };
    } catch {
      toast.error('Invalid JSON in one of the array fields.');
      return;
    }

    const parsed = biodataSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error('Validation failed. Check your inputs.');
      return;
    }

    setSaving(true);
    try {
      const res = (await updateBiodata(parsed.data)) as { success?: boolean; error?: unknown } | null;
      if (res && res.success === false) {
        toast.error(typeof res.error === 'string' ? res.error : 'Save failed.');
        return;
      }
      toast.success('Biodata saved.');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, name: keyof FormValues, opts?: { textarea?: boolean; rows?: number }) => (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {opts?.textarea ? (
        <textarea
          {...register(name)}
          rows={opts.rows ?? 6}
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 font-mono text-xs dark:border-neutral-700"
        />
      ) : (
        <input
          {...register(name)}
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
        />
      )}
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field('Name', 'name')}
        {field('Location', 'location')}
        {field('Headline', 'headline')}
        {field('Phone', 'phone')}
        {field('Email', 'email')}
        {field('LinkedIn', 'linkedin')}
        {field('GitHub', 'github')}
      </div>
      {field('Summary', 'summary', { textarea: true, rows: 4 })}
      {field('Experience (JSON)', 'experienceJson', { textarea: true, rows: 12 })}
      {field('Projects (JSON)', 'projectsJson', { textarea: true, rows: 8 })}
      {field('Education (JSON)', 'educationJson', { textarea: true, rows: 6 })}
      {field('Certifications (JSON)', 'certificationsJson', { textarea: true, rows: 6 })}
      {field('Skills (JSON array)', 'skillsJson', { textarea: true, rows: 4 })}
      {field('Languages (JSON array)', 'languagesJson', { textarea: true, rows: 3 })}
      {field('Achievements (JSON array)', 'achievementsJson', { textarea: true, rows: 4 })}
      <button
        type="submit"
        disabled={saving}
        className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
