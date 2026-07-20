import { Mail, MessageCircle, Instagram, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import Reveal from './ui/Reveal';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-titanix-border bg-void-fade p-7 text-center sm:rounded-[2.5rem] sm:p-16">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-titanix-violet/20 blur-[100px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build the <span className="text-gradient">next one</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-titanix-muted">
              Got an iOS app, a SaaS idea, or an IoT product in mind? Tell us
              about it — we reply fast.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${CONTACT.email}`} className="btn-primary group w-full max-w-xs justify-center !px-5 text-[0.9rem] sm:w-auto sm:max-w-none sm:!px-7 sm:text-sm">
                <Mail size={16} className="shrink-0" />
                <span className="truncate">{CONTACT.email}</span>
                <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Instagram size={16} /> {CONTACT.instagram}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
