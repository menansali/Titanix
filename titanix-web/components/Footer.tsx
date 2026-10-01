import { Link } from 'next-view-transitions';
import Logo from './Logo';
import { CONTACT, PROJECTS } from '@/lib/data';

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
    <footer className="border-t border-titanix-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo size={28} />
          <p className="mt-4 text-sm text-titanix-muted">
            iOS apps, SaaS platforms and IoT systems, from the firmware to the App Store.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="mt-4 inline-block font-mono text-sm text-titanix-text hover:text-titanix-yellow">
            {CONTACT.email}
          </a>
        </div>

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
      <div className="border-t border-titanix-border">
        <p className="mx-auto max-w-7xl px-5 py-5 font-mono text-[11px] text-titanix-faint sm:px-8">
          © 2021–{new Date().getFullYear()} Titanix
        </p>
      </div>
    </footer>
  );
}
