import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import PortfolioForm from '@/components/portfolio/PortfolioForm';

export default async function AdminPortfolioNewPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/portfolio/new');
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">New Portfolio Item</h1>
      <PortfolioForm mode="create" />
    </div>
  );
}