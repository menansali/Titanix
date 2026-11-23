import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import BookingLink from '@/components/ui/BookingLink';
import { CONTACT, PROJECTS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const DESCRIPTION =
  'Titanix builds connected products end to end: firmware, sensors and LoRa radio, the data pipeline, and the native iOS app that goes with it, from one small team.';

export const metadata: Metadata = {
  title: 'Hardware + app: firmware, radio and the iOS app',
  description: DESCRIPTION,
  alternates: { canonical: '/hardware' },
  openGraph: { url: `${SITE_URL}/hardware`, title: 'Hardware + app — Titanix', description: DESCRIPTION },
};

// The four layers of a connected product. We build all of them.
const LAYERS = [
  ['Device', 'Firmware in C++ on Arduino-class boards and LilyGO T-Beams, sensor drivers, and sleep cycles tuned so batteries last.'],
  ['Link', 'Long-range LoRa, Bluetooth LE and Wi-Fi, with radio coverage planned on real terrain before anything is installed.'],
  ['Data', 'Gateways on Raspberry Pi, and the pipeline and API that turn raw readings into something people can use: FastAPI, PostgreSQL, Grafana.'],
  ['App', 'The native iOS app people actually see: live readings, alerts, widgets and Live Activities, taken through App Store review.'],
];

const STEPS = [
  ['Prototype', 'A bench prototype and a test app on your phone, early, so you can try the idea before ordering parts in bulk.'],
  ['Pilot', 'A small batch in the real place, with battery life, range and data quality measured instead of guessed.'],
  ['Product', 'Firmware, backend and the App Store app, written down so your team can run it after we hand over.'],
];

export default function HardwarePage() {
  const lab = PROJECTS.filter((p) => p.status === 'Lab');
  const aer = PROJECTS.find((p) => p.slug === 'aer');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/hardware#service`,
    name: 'Hardware and companion app development',
    serviceType: 'IoT firmware, LoRa networks and iOS companion apps',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    description: DESCRIPTION,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="pt-16">
        <header className="section">
          <p className="flex items-center gap-4 border-t border-titanix-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
            <span className="text-titanix-yellow">(Hardware + app)</span> Connected products
          </p>
          <Reveal as="h1" className="wide mt-10 font-display text-[12vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl">
            The device and the app.
          </Reveal>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-titanix-muted">
            Most connected products are built by two teams, one for the hardware and one for the app, and the
            problems live in between. We do both. Titanix started in 2021 building sensors and LoRa networks, and
            today we ship native iOS apps to the App Store.
          </p>
        </header>

        <section className="section !pt-0" aria-labelledby="layers-title">
          <SectionHead n="01" label="What we build" id="layers-title" title="Every layer, one team." />
          <ol className="mt-12 border-t border-titanix-border">
            {LAYERS.map(([t, d], i) => (
              <li key={t} className="grid gap-3 border-b border-titanix-border py-8 md:grid-cols-[8rem_14rem_1fr] md:gap-10">
                <span className="font-mono text-xs text-titanix-yellow">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="wide font-display text-3xl font-extrabold uppercase tracking-tight">{t}</h3>
                <p className="max-w-2xl text-lg leading-relaxed text-titanix-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="built-title">
          <SectionHead
            n="02"
            label="Built before"
            id="built-title"
            title="Things we have wired up."
            intro="Lab projects from the hardware side, and an App Store app that does the job a sensor product's app has to do."
          />
          <ul className="mt-12 border-t border-titanix-border">
            {lab.map((p) => (
              <li key={p.slug} className="grid gap-3 border-b border-titanix-border py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <span>
                  <span className="block font-display text-2xl font-semibold tracking-tight">{p.title}</span>
                  <span className="mt-1 block font-mono text-xs text-titanix-faint">{p.category}</span>
                </span>
                <span>
                  <span className="block text-lg leading-relaxed text-titanix-muted">{p.description}</span>
                  <span className="mt-3 block font-mono text-xs text-titanix-muted">{p.tech.join(' · ')}</span>
                </span>
              </li>
            ))}
            {aer && (
              <li className="grid gap-3 border-b border-titanix-border py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <span>
                  <Link href={`/work/${aer.slug}`} className="block font-display text-2xl font-semibold tracking-tight underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                    {aer.title}
                  </Link>
                  <span className="mt-1 block font-mono text-xs text-titanix-faint">{aer.category} · on the App Store</span>
                </span>
                <span>
                  <span className="block text-lg leading-relaxed text-titanix-muted">
                    The app side of an air-quality product: live readings for 35 cities, a forecast, alerts, widgets and a
                    Live Activity when pollution spikes, on our own FastAPI and PostgreSQL backend.
                  </span>
                  <span className="mt-3 block font-mono text-xs text-titanix-muted">{aer.tech.join(' · ')}</span>
                </span>
              </li>
            )}
          </ul>
        </section>

        <section className="section" aria-labelledby="steps-title">
          <SectionHead n="03" label="How it runs" id="steps-title" title="Prototype, pilot, product." />
          <ol className="mt-12 grid border-t border-titanix-border md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className={`border-b border-titanix-border py-8 md:border-b-0 md:px-8 ${i === 0 ? 'md:!pl-0' : ''} ${i < STEPS.length - 1 ? 'md:border-r' : 'md:!pr-0'}`}>
                <span className="wide font-display text-5xl font-extrabold leading-none text-titanix-yellow">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-lg leading-relaxed text-titanix-muted">{d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-col gap-4 border-t border-titanix-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-semibold tracking-tight">Have a device that needs an app, or the other way round?</p>
            <div className="flex flex-wrap gap-3">
              <BookingLink href={CONTACT.booking[CONTACT.booking.length - 1]?.url ?? CONTACT.bookingProfile} slot="hardware-30 min" data-cursor="Book" className="btn-primary">
                Book 30 minutes
              </BookingLink>
              <Link href="/#contact" className="btn-ghost">
                Send a brief <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
