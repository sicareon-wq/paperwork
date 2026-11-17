"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/research', label: 'Research' },
    { href: '/biodata', label: 'Biodata' },
    { href: '/playground', label: 'Playground' },
    { href: '/contact', label: 'Contact' },
    { href: '/cv', label: 'CV' },
    { href: '/admin', label: 'Admin', adminOnly: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            PAPERWORK
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-accent hover:text-accent-foreground rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden absolute left-0 right-0 top-14 border-b bg-background shadow-lg transition-transform duration-300",
            isOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}