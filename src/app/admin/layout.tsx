import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { logoutAction } from '@/actions/auth';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/research', label: 'Research' },
  { href: '/admin/biodata', label: 'Biodata' },
  { href: '/admin/playground', label: 'Playground' },
  { href: '/admin/cv', label: 'CV' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login?next=/admin');

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r border-neutral-200 p-4 dark:border-neutral-800">
        <div className="mb-6 text-lg font-bold">Admin</div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {item.label}
            </Link>
          ))}
          <form action={logoutAction} className="mt-4">
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Logout
            </button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}