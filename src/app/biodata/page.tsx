export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Paperwork - Biodata',
  description: 'Professional biodata and experience details of Muhammad Kasyfu Najib. Skills, background, and expertise.',
};

import { getBiodata } from '@/actions/biodata';
import BiodataView, { type BiodataData } from '@/components/biodata/BiodataView';

export default async function BiodataPage() {
  const data = await getBiodata();
  return <BiodataView data={data as unknown as BiodataData} />;
}
