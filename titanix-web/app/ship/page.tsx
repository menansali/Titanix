import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Offers from '@/components/Offers';
import Reveal from '@/components/motion/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import BookingLink from '@/components/ui/BookingLink';
import AuditForm from '@/components/AuditForm';
import { SAMPLE_AUDIT } from '@/lib/sampleAudit';
import { CONTACT, OFFERS, PROJECTS, SHIP_STEPS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const DESCRIPTION =
  'The launch process every Titanix app goes through, from checking the idea to the App Store, plus the App Launch Audit and the Idea to App Store build with an approval guarantee.';

export const metadata: Metadata = {
  title: 'How we ship iOS apps',
  description: DESCRIPTION,
  alternates: { canonical: '/ship' },
  openGraph: { url: `${SITE_URL}/ship`, title: 'How we ship iOS apps — Titanix', description: DESCRIPTION },
};

// What the pre-submission check looks at, with the App Review guideline where there is one.
const CHECKS = [
  ['2.3.3', 'Screenshots show the real app, not only marketing art'],
  ['2.3', 'Name, description and keywords match what the app does'],
  ['3.1.2', 'Subscription price, length and terms shown before purchase'],
  ['3.1.1', 'Digital goods sold through in-app purchase, with restore'],
  ['4.8', 'Sign in with Apple offered next to other social logins'],
  ['5.1.1', 'Privacy policy, privacy manifest and in-app account deletion'],
  ['5.1.1', 'A clear reason in every permission prompt'],
  ['2.1', 'No crashes, placeholder content or dead buttons'],
  ['', 'Support and privacy links in App Store Connect actually load'],
  ['', 'No API keys or secrets shipped inside the app'],
  ['', 'Analytics events fire once each, so the launch numbers are real'],
];

const FAQ = [
  {
    q: 'What does “approved, or we fix it free” cover?',
    a: 'The app we built for you. If App Review rejects it, we fix what they flag and resubmit, at no extra cost, until it is approved. It does not cover features added after the scope is agreed, or an idea Apple will not accept in any form. Step one exists to catch that before any code is written.',
  },
  {
    q: 'What do you need for an audit?',
    a: 'A TestFlight invite or read access to the code, plus the App Store listing if the app is already live. With the code we can check more, such as keys and purchase handling.',
  },
  {
    q: 'How much does it cost?',
    a: 'Both offers are fixed price. We quote after a short call, once we know the app, and you have the number in writing before anything starts.',
  },
  {
    q: 'Where are your clients?',
    a: 'Anywhere. We work remotely, write everything down, and calls book on Cal.com in your own time zone.',
  },
  {
    q: 'Is this only for iOS?',
    a: 'This process is for iOS apps. We build SaaS platforms and IoT systems too, on the usual project process.',
  },
];

export default function ShipPage() {
  const apps = PROJECTS.filter((p) => p.caseStudy && p.category && p.url?.includes('apps.apple.com'));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/ship#service`,
        name: 'iOS app launch',
        serviceType: 'iOS app development and App Store launch',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'Worldwide',
        description: DESCRIPTION,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Offers',
          itemListElement: OFFERS.map((o) => ({
            '@type': 'Offer',
            url: `${SITE_URL}/ship#${o.id}`,
            itemOffered: { '@type': 'Service', name: o.title, description: o.summary },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="pt-16">
        <header className="section">
          <p className="flex items-center gap-4 border-t border-titanix-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
            <span className="text-titanix-yellow">(Process)</span> iOS apps
          </p>
          <Reveal as="h1" className="wide mt-10 font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl">
            How we ship.
          </Reveal>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-titanix-muted">
            Every app goes through the same seven steps, ours and our clients&apos;. Each one is a gate: the next
            step doesn&apos;t start until this one is done. It is the process we use for our own apps, and it is
            what you get when we build yours.
          </p>
          {apps.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
              {apps.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                    {p.title.split(':')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </header>

        <section className="section !pt-0" aria-label="The seven steps">
          <ol className="border-t border-titanix-border">
            {SHIP_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="grid gap-4 border-b border-titanix-border py-10 md:grid-cols-[8rem_1fr_16rem] md:gap-10 lg:grid-cols-[10rem_1fr_18rem]"
              >
                <span className="wide font-display text-6xl font-extrabold leading-none tracking-tight text-titanix-yellow lg:text-7xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-titanix-muted">{s.text}</p>
                </div>
                <p className="font-mono text-xs leading-relaxed text-titanix-muted md:pt-2">
                  <span className="block text-titanix-faint">You get</span>
                  <span className="text-titanix-text">{s.output}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="check-title">
          <SectionHead
            n="01"
            label="Pre-submission check"
            id="check-title"
            title="What we check before Apple does."
            intro="Step six, in detail. Most rejections come from a short list of reasons, so every build is checked against all of them first."
          />
          <ul className="mt-12 grid border-t border-titanix-border md:grid-cols-2 md:gap-x-10">
            {CHECKS.map(([g, text]) => (
              <li key={text} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-titanix-border py-4">
                <span className="font-mono text-xs text-titanix-yellow">{g || '—'}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[11px] text-titanix-faint">
            Numbers are App Review guideline sections.{' '}
            <Link href="/app-review" className="text-titanix-muted underline underline-offset-4 hover:text-titanix-text">
              What each one means and how to fix it
            </Link>
          </p>
        </section>

        <Offers n="02" more={false} />

        <section id="order" className="section scroll-mt-16" aria-labelledby="order-title">
          <SectionHead
            n="03"
            label="Order the audit"
            id="order-title"
            title="Send us the app."
            intro="No call needed. Tell us where the app is and we reply with the fixed price and a start date, usually the same day."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <ol className="border-t border-titanix-border">
              {[
                ['You send the app', 'An App Store link, or a TestFlight invite or code access if it isn’t live yet.'],
                ['We confirm price and date', 'A fixed price in writing. Nothing starts until you agree.'],
                ['Report in 48 hours', 'READY / NOT READY, every problem with its exact fix, ranked by what blocks approval first.'],
              ].map(([t, d], n) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] border-b border-titanix-border py-6">
                  <span className="font-mono text-xs text-titanix-yellow">{String(n + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display text-xl font-semibold tracking-tight">{t}</span>
                    <span className="mt-1 block text-titanix-muted">{d}</span>
                  </span>
                </li>
              ))}
              {SAMPLE_AUDIT.published && (
                <li className="pt-6">
                  <Link href="/ship/sample-audit" className="inline-flex items-center gap-2 text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                    See a real sample report <ArrowRight size={15} />
                  </Link>
                </li>
              )}
            </ol>
            <AuditForm />
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <SectionHead n="04" label="Questions" id="faq-title" title="Before you book." />
          <dl className="mt-12 border-t border-titanix-border">
            {FAQ.map((f) => (
              <div key={f.q} className="grid gap-3 border-b border-titanix-border py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <dt className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{f.q}</dt>
                <dd className="text-lg leading-relaxed text-titanix-muted">
                  {f.a}
                  {f.q.startsWith('Is this only') && (
                    <>
                      {' '}
                      <Link href="/#process" className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                        See how those run
                      </Link>
                      .
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex flex-col gap-4 border-t border-titanix-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-semibold tracking-tight">Not sure which one fits?</p>
            <div className="flex flex-wrap gap-3">
              <BookingLink href={CONTACT.booking[0].url} slot="ship-15 min" data-cursor="Book" className="btn-primary">
                Book 15 minutes
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
