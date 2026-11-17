export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Paperwork - Research',
  description: 'Notes, case studies, and deep dives from Muhammad Kasyfu Najib. Explore research and analysis.',
};

import Link from 'next/link';
import { listResearch } from '@/actions/research';
import ResearchCard from '@/components/research/ResearchCard';
import EmptyState from '@/components/states/EmptyState';

export default async function ResearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const category = sp.category;
  const all = await listResearch(true);
  const categories = [...new Set(all.map((r) => r.category).filter(Boolean))];
  const items = category ? all.filter((r) => r.category === category) : all;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Research</h1>
          <p className="mt-1 text-neutral-500">Notes, case studies, and deep dives.</p>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/research"
            className={`rounded-full border px-3 py-1 text-sm ${
              !category ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700'
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/research?category=${encodeURIComponent(c)}`}
              className={`rounded-full border px-3 py-1 text-sm ${
                category === c ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState title="No research posts yet" description="Check back soon." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <ResearchCard key={r.id} item={r as any} />
          ))}
        </div>
      )}
    </main>
  );
}
