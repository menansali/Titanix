import { Link } from 'next-view-transitions';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT, PROJECTS } from '@/lib/data';
import Wordmark from './motion/Wordmark';

const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Lab log', href: '/#log' },
  { label: 'Contact', href: '/#contact' },
];

const ELSEWHERE = [
  { label: 'Instagram', href: CONTACT.instagramUrl },
  { label: 'LinkedIn', href: CONTACT.linkedinUrl },
  { label: 'GitHub', href: CONTACT.githubUrl },
  { label: 'WhatsApp', href: CONTACT.whatsappUrl },
];

export default function Footer() {
  const products = PROJECTS.filter((p) => p.caseStudy);
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-titanix-border">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">Have something to build?</p>
        <a
          href={`mailto:${CONTACT.email}`}
          data-cursor="Write"
          className="group mt-4 inline-flex items-center gap-3 font-display text-[8vw] font-semibold leading-none tracking-[-0.04em] text-titanix-text transition-colors hover:text-titanix-yellow sm:text-6xl lg:text-7xl"
        >
          {CONTACT.email}
          <ArrowUpRight className="h-[0.7em] w-[0.7em] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="mt-16 grid gap-10 border-t border-titanix-border pt-10 sm:grid-cols-3">
          {[
            { title: 'Site', items: NAV.map((n) => ({ ...n, internal: true })) },
            { title: 'Products', items: products.map((p) => ({ label: p.title, href: `/work/${p.slug}`, internal: true })) },
            { title: 'Elsewhere', items: ELSEWHERE.map((e) => ({ ...e, internal: false })) },
          ].map((col) => (
            <div key={col.title}>
              <h2 className="label">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((l) => (
                  <li key={l.href}>
                    {l.internal ? (
                      <Link href={l.href} className="text-sm text-titanix-muted transition-colors hover:text-titanix-text">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-titanix-muted transition-colors hover:text-titanix-text">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between font-mono text-[11px] text-titanix-faint">
          <span>© 2021–{new Date().getFullYear()} Titanix</span>
          <a href="#top" className="transition-colors hover:text-titanix-text">Back to top ↑</a>
        </div>
      </div>

      <div className="mt-6 px-2 sm:px-4">
        <Wordmark />
      </div>
    </footer>
  );
}
