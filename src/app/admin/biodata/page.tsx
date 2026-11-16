import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getBiodata } from '@/actions/biodata';
import BiodataEditForm from '@/components/biodata/BiodataEditForm';
import { type BiodataData } from '@/components/biodata/BiodataView';

export default async function AdminBiodataPage() {
  const session = await getSession();
  if (!session || session.role !== 'MASTER') {
    redirect('/login?next=/admin/biodata');
  }
  const data = await getBiodata();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Biodata</h1>
      <BiodataEditForm initial={data as unknown as BiodataData} />
    </div>
  );
}
