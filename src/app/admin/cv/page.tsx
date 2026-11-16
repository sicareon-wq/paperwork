import { currentCvInfo, replaceCv } from '@/actions/cv';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function AdminCvPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') {
    return null;
  }

  const info = await currentCvInfo();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin: CV</h1>
        <p className="mt-1 text-neutral-500">Replace the CV file.</p>
      </div>

      <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">Current CV</h2>
        {info ? (
          <div className="mt-2 space-y-2">
            <p className="text-sm text-neutral-600">{info.name}</p>
            <p className="text-sm text-neutral-500">{(info.size / 1024).toFixed(1)} KB</p>
            <a
              href={info.downloadUrl}
              download
              className="mt-2 text-sm text-neutral-600 underline"
            >
              Download current
            </a>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No CV uploaded yet.</p>
        )}
      </div>

      <form
        action={async (formData) => {
          'use server';
          await replaceCv(formData);
        }}
        className="mt-6 flex flex-col gap-4 sm:flex-row"
        encType="multipart/form-data"
      >
        <label className="flex-1 space-y-2">
          <span className="text-sm font-medium">CV file</span>
          <input
            name="file"
            type="file"
            accept=".docx,.pdf"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          />
        </label>
        <button
          type="submit"
          className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Replace
        </button>
      </form>
    </main>
  );
}
