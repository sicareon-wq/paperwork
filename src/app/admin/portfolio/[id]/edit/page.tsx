import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getPortfolioById } from '@/actions/portfolio';
import PortfolioForm from '@/components/portfolio/PortfolioForm';

export default async function AdminPortfolioEditPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/portfolio');
  const { id } = await params;
  const item = await getPortfolioById(id);
  if (!item) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Portfolio Item</h1>
      <PortfolioForm initial={item as any} mode="edit" />
    </div>
  );
}