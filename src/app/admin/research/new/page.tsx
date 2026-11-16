import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import ResearchForm from '@/components/research/ResearchForm';

export default async function AdminResearchNewPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') redirect('/login?next=/admin/research');
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">New Research Post</h1>
      <ResearchForm mode="create" />
    </div>
  );
}
