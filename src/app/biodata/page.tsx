export const dynamic = 'force-dynamic';

import { getBiodata } from '@/actions/biodata';
import BiodataView, { type BiodataData } from '@/components/biodata/BiodataView';

export default async function BiodataPage() {
  const data = await getBiodata();
  return <BiodataView data={data as unknown as BiodataData} />;
}
