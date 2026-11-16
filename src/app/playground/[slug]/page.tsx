import { notFound } from 'next/navigation';
import { listWidgets } from '@/actions/playground';
import SubnetCalculator from '@/components/playground/SubnetCalculator';

export const dynamic = 'force-dynamic';

export default async function PlaygroundWidgetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const widgets = await listWidgets();
  const widget = widgets.find((w) => w.slug === slug);

  if (!widget) notFound();

  function isSubnetConfig(v: unknown): v is { ip?: string; cidr?: number } {
    if (v === null || typeof v !== 'object') return false;
    const o = v as Record<string, unknown>;
    return typeof o.ip === 'string' && (o.cidr === undefined || typeof o.cidr === 'number');
  }

  const initial: { ip?: string; cidr?: number } | null = isSubnetConfig(widget.config) ? widget.config : null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{widget.name}</h1>
        <p className="mt-1 text-neutral-500">Live IPv4 subnet calculation.</p>
      </div>
      <SubnetCalculator initial={initial} />
    </main>
  );
}
