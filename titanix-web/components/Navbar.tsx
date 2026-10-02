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
  { label: 'Notes', href: '/notes' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Slides away while scrolling down, comes back as soon as you scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
        scrolled || open ? 'border-titanix-border bg-titanix-void' : 'border-transparent'
      } ${hidden && !open ? '-translate-y-full' : ''}`}
    >
      <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Titanix home">
          <Logo size={28} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted transition-colors hover:text-titanix-text"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-titanix-yellow transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
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
