import { LoadingSkeleton } from '@/components/states/LoadingSkeleton';

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="space-y-6">
        <div className="flex gap-3">
          <LoadingSkeleton width="200" height="32" />
          <LoadingSkeleton width="64" height="32" circle />
        </div>
        <LoadingSkeleton width="100%" height="16" className="mb-2" />
        <LoadingSkeleton width="80%" height="16" />
        <LoadingSkeleton width="60%" height="16" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
              <LoadingSkeleton width="100%" height="20" className="mb-3" />
              <LoadingSkeleton width="60%" height="100" className="mb-3" />
              <LoadingSkeleton width="40%" height="14" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
