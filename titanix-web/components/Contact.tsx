import { ArrowUpRight, CalendarDays, Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import ContactForm from './ContactForm';
import SectionHead from './ui/SectionHead';
import TrackedLink from './ui/TrackedLink';

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
        n="08"
        label="Contact"
        id="contact-title"
        title="Tell us what you want to build."
        intro="A few details is plenty. We reply to every brief, usually the same day."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <ContactForm />

        <div>
          {CONTACT.bookingUrl && (
            <TrackedLink
              href={CONTACT.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              event="Contact clicked"
              props={{ channel: 'booking' }}
              className="group mb-10 block bg-titanix-yellow p-5 text-black transition-colors hover:bg-titanix-glow"
            >
              <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                <CalendarDays size={16} /> <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </span>
              <span className="mt-6 block font-display text-2xl font-bold leading-tight">Rather talk it through?</span>
              <span className="mt-1 block text-sm text-black/70">Book a 20-minute intro call.</span>
            </TrackedLink>
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
