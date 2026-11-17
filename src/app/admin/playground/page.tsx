export const dynamic = 'force-dynamic';

import { listWidgets, createWidget, deleteWidget, reorderWidget } from '@/actions/playground';

export default async function AdminPlaygroundPage() {
  const widgets = await listWidgets();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Playground</h1>
        <p className="mt-1 text-neutral-500">
          Manage widgets on the playground — add, remove, and reorder.
        </p>
      </div>

      <section className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">Add widget</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Adds a widget to the playground. Only <span className="font-mono">subnet-calculator</span> is available for now.
        </p>
        <form
          action={async (formData) => {
            'use server';
            await createWidget(formData);
          }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1 gap-4 sm:flex-sm:order-1 sm:grid sm:grid-cols-3 sm:items-end">
            <label className="block space-y-1">
              <span className="text-sm font-medium">Name</span>
              <input
                name="name"
                defaultValue="Subnet Calculator"
                className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
              />
            </label>
            <label className="block space-y-1 sm:ml-4">
              <span className="text-sm font-medium">Slug</span>
              <input
                name="slug"
                defaultValue="subnet-calculator"
                className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
              />
            </label>
            <div className="flex items-end gap-3 sm:ml-4">
              <label className="flex-1 space-y-1">
                <span className="text-sm font-medium">Type</span>
                <select
                  name="type"
                  defaultValue="subnet-calculator"
                  className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
                >
                  <option value="subnet-calculator">Subnet calculator</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Add widget
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold">Widgets</h2>
        {widgets.length === 0 ? (
          <p className="text-sm text-neutral-500">No widgets yet.</p>
        ) : (
          <ul className="space-y-3">
            {widgets.map((w) => (
              <li
                key={w.id}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <span className="font-mono text-sm text-neutral-500">#{w.order}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{w.name}</div>
                  <div className="text-sm text-neutral-500">
                    {w.slug} · {w.type}
                    {w.config && Object.keys(w.config).length > 0 && (
                      <span className="ml-2 font-mono text-xs text-neutral-400">{JSON.stringify(w.config)}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <form action={async () => { 'use server'; void (await reorderWidget(w.id, 'up')); }}>
                    <button
                      type="submit"
                      className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700"
                      disabled={w.order === Math.min(...widgets.map((x) => x.order))}
                    >
                      ↑
                    </button>
                  </form>
                  <form action={async () => { 'use server'; void (await reorderWidget(w.id, 'down')); }}>
                    <button
                      type="submit"
                      className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700"
                      disabled={w.order === Math.max(...widgets.map((x) => x.order))}
                    >
                      ↓
                    </button>
                  </form>
                  <form action={async () => { 'use server'; void (await deleteWidget(w.id)); }}>
                    <button
                      type="submit"
                      className="rounded-md border border-red-300 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-700"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
