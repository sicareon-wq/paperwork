'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

type Research = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverUrl?: string | null;
  fileUrl?: string | null;
  published: boolean;
};

export default function ResearchCard({ item }: { item: Research }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/60"
    >
      <Link href={`/research/${item.slug}`} className="block">
        {item.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.coverUrl} alt={item.title} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 items-center justify-center bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
            No cover
          </div>
        )}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-500">{item.category}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">{item.excerpt}</p>
          {item.fileUrl && (
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-500 underline decoration-neutral-300 dark:decoration-neutral-700"
            >
              Download file
            </a>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
