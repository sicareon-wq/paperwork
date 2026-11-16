import Link from 'next/link';
import { currentCvInfo } from '@/actions/cv';

export const dynamic = 'force-dynamic';

export default async function CvPage() {
  const info = await currentCvInfo();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">CV</h1>
        <p className="mt-1 text-neutral-500">Download my full resume.</p>
      </div>

      {info ? (
        <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{info.name}</h2>
              <p className="text-sm text-neutral-500">
                {info.size > 0 ? `${(info.size / 1024).toFixed(1)} KB` : '0 B'} · updated {new Date(info.modified).toLocaleDateString('en-GB')}
              </p>
            </div>
            <a
              href={info.downloadUrl}
              download
              className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Download
            </a>
          </div>
          <p className="text-sm text-neutral-500">
            Original file:{' '}
            <span className="font-mono text-neutral-600 dark:text-neutral-400">CV_ATS_Muhammad_Kasyfu_Najib.docx</span>
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            Extracted from <span className="font-mono">/home/shyfu/Unduhan/CV_ATS_Muhammad_Kasyfu_Najib.docx</span>
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
          <p className="text-neutral-500">CV file not found.</p>
          <Link
            href="/admin/cv"
            className="mt-3 text-sm text-neutral-600 underline underline-offset-2"
          >
            Upload from admin
          </Link>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Biodata summary</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Entry-level AI Evaluator and Data Annotator with hands-on experience in chatbot logic testing, adversarial red teaming, and multimodal (image, text, and audio) data annotation using CVAT.
        </p>
      </div>
    </main>
  );
}
