export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Paperwork - Playground',
  description: 'Interactive tools and widgets by Muhammad Kasyfu Najib. Compute IPv4 networks and explore technical demos.',
};

import { listWidgets } from '@/actions/playground';
import SubnetCalculator from '@/components/playground/SubnetCalculator';

export default async function PlaygroundPage() {
  const widgets = await listWidgets();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
        <p className="mt-1 text-neutral-500">Compute IPv4 networks and host ranges on the fly.</p>
      </div>

      {widgets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
          <p className="text-neutral-500">No widgets configured yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {widgets.map((widget) => (
            <div key={widget.id} className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-lg font-semibold">{widget.name}</h2>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-800">
                  {widget.type}
                </span>
              </div>
              {widget.type === 'subnet-calculator' ? (
                <SubnetCalculator initial={widget.config as { ip?: string; cidr?: number } | undefined} />
              ) : (
                <p className="text-sm text-neutral-500">Widget type {widget.type} not implemented yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
