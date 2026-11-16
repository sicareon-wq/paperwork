import Link from 'next/link';

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/research', label: 'Research' },
  { href: '/biodata', label: 'Biodata' },
  { href: '/playground', label: 'Playground' },
  { href: '/contact', label: 'Contact' },
  { href: '/cv', label: 'CV' },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <h1 className="text-5xl font-bold tracking-tight">Paperwork</h1>
      <p className="text-neutral-500 max-w-md text-center">
        A digital paperwork portfolio.
      </p>
      <nav className="flex flex-wrap gap-3 justify-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="px-4 py-2 rounded-md border border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
