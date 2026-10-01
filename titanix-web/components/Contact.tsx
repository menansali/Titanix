import { Mail, MessageCircle, Instagram } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import ContactForm from './ContactForm';
import Reveal from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import TrackedLink from './ui/TrackedLink';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-titanix-border bg-void-fade p-7 text-center sm:rounded-[2.5rem] sm:p-16">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-titanix-yellow/15 blur-[100px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build the <span className="text-gradient">next one</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-titanix-muted">
              Got an iOS app, a SaaS idea, or an IoT product in mind? Tell us
              a little about it — it takes a minute.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>

            <p className="mt-10 text-sm text-titanix-faint">Prefer to talk directly?</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <TrackedLink
                  href={`mailto:${CONTACT.email}`}
                  event="Contact clicked"
                  props={{ channel: 'email' }}
                  className="btn-ghost"
                >
                  <Mail size={16} /> {CONTACT.email}
                </TrackedLink>
              </Magnetic>
              <Magnetic>
                <TrackedLink
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="Contact clicked"
                  props={{ channel: 'whatsapp' }}
                  className="btn-ghost"
                >
                  <MessageCircle size={16} /> WhatsApp
                </TrackedLink>
              </Magnetic>
              <Magnetic>
                <TrackedLink
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="Contact clicked"
                  props={{ channel: 'instagram' }}
                  className="btn-ghost"
                >
                  <Instagram size={16} /> {CONTACT.instagram}
                </TrackedLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
