import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-6xl font-mono font-bold tracking-tight">404</h1>
      <p className="mt-4 text-xl text-neutral-500">Halaman tidak ditemukan.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
