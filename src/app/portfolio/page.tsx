export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { listPortfolios } from '@/actions/portfolio';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import EmptyState from '@/components/states/EmptyState';

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const category = sp.category;
  const all = await listPortfolios();
  const categories = [...new Set(all.map((p) => p.category).filter(Boolean))];
  const items = category ? all.filter((p) => p.category === category) : all;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="mt-1 text-neutral-500">Selected work and case studies.</p>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/portfolio"
            className={`rounded-full border px-3 py-1 text-sm ${
              !category ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700'
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/portfolio?category=${encodeURIComponent(c)}`}
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
        <EmptyState title="No portfolio items yet" description="Check back soon." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <PortfolioCard key={p.id} item={p as any} />
          ))}
        </div>
      )}
    </main>
  );
}