export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPortfolio } from '@/actions/portfolio';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPortfolio(slug);
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/portfolio" className="text-sm text-neutral-500 hover:underline">
        ← Back to portfolio
      </Link>
      {p.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.imageUrl} alt={p.title} className="mt-6 w-full rounded-2xl object-cover" />
      )}
      <h1 className="mt-6 text-4xl font-bold">{p.title}</h1>
      <p className="mt-2 text-neutral-500">{p.category}</p>
      {p.summary && <p className="mt-4 text-lg">{p.summary}</p>}
      {p.description && <div className="mt-6 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">{p.description}</div>}
      {p.tags && p.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-8 flex gap-4">
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noreferrer" className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900">
            Demo
          </a>
        )}
        {p.repoUrl && (
          <a href={p.repoUrl} target="_blank" rel="noreferrer" className="rounded-md border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700">
            Repo
          </a>
        )}
      </div>
    </main>
  );
}