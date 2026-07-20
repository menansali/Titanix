import { Mail, MessageCircle, Instagram } from 'lucide-react';
import Logo from './Logo';
import { CONTACT } from '@/lib/data';

const NAV = [
  { label: 'Focus', href: '#focus' },
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-titanix-border">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo size={32} />
            <p className="mt-4 text-sm text-titanix-muted">
              A product studio forging iOS apps, SaaS platforms, and IoT systems.
              From bare metal to the App Store.
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-titanix-faint">
                Navigate
              </h4>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-titanix-muted transition-colors hover:text-titanix-text"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-titanix-faint">
                Connect
              </h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
                    <Mail size={14} /> Email
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
                    <Instagram size={14} /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-titanix-border pt-6 sm:flex-row">
          <p className="text-xs text-titanix-faint">
            © {2021}–{2026} Titanix. All rights reserved.
          </p>
          <p className="font-mono text-xs text-titanix-faint">
            Forging digital reality — iOS · SaaS · IoT
          </p>
        </div>
      </div>
    </footer>
  );
}
