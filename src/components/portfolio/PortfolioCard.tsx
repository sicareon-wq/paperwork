'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

type Portfolio = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  imageUrl?: string | null;
  tags?: string[];
  featured?: boolean;
};

export default function PortfolioCard({ item }: { item: Portfolio }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/60"
    >
      <Link href={`/portfolio/${item.slug}`} className="block">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 items-center justify-center bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
            No image
          </div>
        )}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-500">{item.category}</span>
            {item.featured && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] text-white dark:bg-neutral-100 dark:text-neutral-900">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{item.summary}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {item.tags.map((t) => (
                <span key={t} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs dark:bg-neutral-800">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}