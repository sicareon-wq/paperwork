import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getResearchById } from '@/actions/research';
import ResearchForm from '@/components/research/ResearchForm';

export default async function AdminResearchEditPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/research');
  const { id } = await params;
  const item = await getResearchById(id);
  if (!item) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Research Post</h1>
      <ResearchForm initial={item as any} mode="edit" />
    </div>
  );
}
