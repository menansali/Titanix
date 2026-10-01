'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Logo from './Logo';

const LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Lab log', href: '/#log' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-titanix-border bg-titanix-void/95 backdrop-blur' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Titanix home">
          <Logo size={28} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-titanix-muted transition-colors hover:text-titanix-text">
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-primary !py-2">
            Start a project
          </Link>
        </div>

        <button className="text-titanix-text md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-titanix-border px-5 pb-5 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-titanix-border py-4 text-base text-titanix-muted hover:text-titanix-text"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
