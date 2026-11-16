import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { listResearch } from '@/actions/research';
import ResearchAdminList from '@/components/research/ResearchAdminList';

export default async function AdminResearchPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/research');

  const items = await listResearch();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Research</h1>
        <Link
          href="/admin/research/new"
          className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          New
        </Link>
      </div>
      <ResearchAdminList items={items as any} />
    </div>
  );
}
