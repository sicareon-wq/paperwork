'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [didRetry, setDidRetry] = useState(false);

  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
        <h1 className="text-3xl font-bold mb-2">Terjadi kesalahan</h1>
        <p className="mb-6 text-neutral-500">
          Muat ulang halaman atau kembali ke beranda.
        </p>
        <button
          onClick={() => {
            reset();
            setDidRetry(true);
          }}
          disabled={didRetry}
          className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
