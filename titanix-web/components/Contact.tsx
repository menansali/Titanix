import { ArrowUpRight, CalendarDays, Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import ContactForm from './ContactForm';
import SectionHead from './ui/SectionHead';
import TrackedLink from './ui/TrackedLink';
import BookingLink from './ui/BookingLink';

// What happens after the brief is sent, so nobody has to guess.
const NEXT = [
  { title: 'Send a brief', text: 'A few lines about the idea, or the app if it already exists.' },
  { title: 'We reply', text: 'Usually the same day, with questions or a time to talk.' },
  { title: 'Scope and price', text: 'Agreed in writing before any work starts.' },
];

const CHANNELS = [
  { label: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail, channel: 'email' },
  { label: `WhatsApp ${CONTACT.whatsapp}`, href: CONTACT.whatsappUrl, icon: MessageCircle, channel: 'whatsapp' },
  { label: CONTACT.instagram, href: CONTACT.instagramUrl, icon: Instagram, channel: 'instagram' },
  { label: 'LinkedIn', href: CONTACT.linkedinUrl, icon: Linkedin, channel: 'linkedin' },
  { label: 'GitHub', href: CONTACT.githubUrl, icon: Github, channel: 'github' },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <SectionHead
        n="09"
        label="Contact"
        id="contact-title"
        title="Tell us what you want to build."
        intro="A few details is plenty. We reply to every brief, usually the same day."
      />

      <ol className="mt-12 grid border-t border-titanix-border sm:grid-cols-3">
        {NEXT.map((n, i) => (
          <li key={n.title} className={`border-b border-titanix-border py-5 sm:border-b-0 sm:py-6 ${i > 0 ? 'sm:border-l sm:pl-6' : ''} ${i < NEXT.length - 1 ? 'sm:pr-6' : ''}`}>
            <span className="font-mono text-[11px] text-titanix-yellow">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-2 font-display text-lg font-bold">{n.title}</p>
            <p className="mt-1 text-sm text-titanix-muted">{n.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <ContactForm />

        <div>
          {CONTACT.booking.length > 0 && (
            <div id="book" className="mb-10 scroll-mt-24 bg-titanix-yellow p-5 text-black">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                <CalendarDays size={15} /> Book a call
              </span>
              <p className="mt-5 font-display text-2xl font-bold leading-tight">Rather talk it through?</p>
              <ul className="mt-4 border-t border-black/20">
                {CONTACT.booking.map((b) => (
                  <li key={b.url}>
                    <BookingLink
                      href={b.url}
                      slot={b.label}
                      data-cursor="Book"
                      className="group flex items-center justify-between gap-3 border-b border-black/20 py-3"
                    >
                      <span>
                        <span className="wide block font-display text-lg font-extrabold uppercase">{b.label}</span>
                        <span className="block text-sm text-black/70">{b.note}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:rotate-45" />
                    </BookingLink>
                  </li>
                ))}
              </ul>
              <a
                href={CONTACT.bookingProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-[11px] text-black/70 underline underline-offset-4 hover:text-black"
              >
                All times on cal.com/titanix
              </a>
            </div>
          )}
          <p className="label">Or reach us directly</p>
          <ul className="mt-4 border-t border-titanix-border">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const external = !c.href.startsWith('mailto:');
              return (
                <li key={c.channel}>
                  <TrackedLink
                    href={c.href}
                    event="Contact clicked"
                    props={{ channel: c.channel }}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 border-b border-titanix-border py-3.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text"
                  >
                    <Icon size={15} className="shrink-0" />
                    <span className="truncate">{c.label}</span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
