import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/research', label: 'Research' },
    { href: '/biodata', label: 'Biodata' },
    { href: '/playground', label: 'Playground' },
    { href: '/contact', label: 'Contact' },
    { href: '/cv', label: 'CV' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Paperwork. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Digital paperwork portfolio by Muhammad Kasyfu Najib.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}