import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { listPortfolios } from '@/actions/portfolio';
import PortfolioAdminList from '@/components/portfolio/PortfolioAdminList';

export default async function AdminPortfolioPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/portfolio');

  const items = await listPortfolios();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Link href="/admin/portfolio/new" className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900">
          New
        </Link>
      </div>
      <PortfolioAdminList items={items as any} />
    </div>
  );
}