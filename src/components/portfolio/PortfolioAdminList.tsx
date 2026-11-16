'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePortfolio } from '@/actions/portfolio';

type Item = { id: string; title: string; slug: string; category: string; featured: boolean };

export default function PortfolioAdminList({ items }: { items: Item[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this portfolio item?')) return;
    setDeleting(id);
    try {
      const res = await deletePortfolio(id);
      if (res && (res as any).success === false) {
        toast.error((res as any).error || 'Delete failed.');
        return;
      }
      toast.success('Deleted.');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div key={p.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <div>
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-neutral-500">{p.category} · /portfolio/{p.slug}</div>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/portfolio/${p.id}/edit`} className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700">
              Edit
            </Link>
            <button
              onClick={() => onDelete(p.id)}
              disabled={deleting === p.id}
              className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 disabled:opacity-50"
            >
              {deleting === p.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}