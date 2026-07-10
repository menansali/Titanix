'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const LINKS = [
  { label: 'Focus', href: '#focus' },
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <div
          className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass' : 'border border-transparent'
          }`}
        >
          <a href="#top" aria-label="Titanix home">
            <Logo size={30} />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-titanix-muted transition-colors hover:text-titanix-text"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="btn-primary !py-2.5 !px-6">
              Start a project
            </a>
          </div>

          <button
            className="md:hidden text-titanix-text"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-6 mt-2 md:hidden">
          <div className="glass flex flex-col gap-1 rounded-3xl p-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-titanix-muted transition-colors hover:bg-white/5 hover:text-titanix-text"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 w-full"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
