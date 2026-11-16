export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getResearch } from '@/actions/research';

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResearch(slug);
  if (!r || !r.published) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/research" className="text-sm text-neutral-500 hover:underline">
        ← Back to research
      </Link>

      {r.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.coverUrl} alt={r.title} className="mt-6 w-full rounded-2xl object-cover" />
      )}

      <h1 className="mt-6 text-4xl font-bold">{r.title}</h1>
      <p className="mt-2 text-neutral-500">{r.category}</p>

      {r.excerpt && <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">{r.excerpt}</p>}

      {r.content && (
        <div
          className="mt-6 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: r.content }}
        />
      )}

      {r.fileUrl && (
        <div className="mt-8">
          <a
            href={r.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
          >
            Download file
          </a>
        </div>
      )}
    </main>
  );
}
