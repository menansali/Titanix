import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import RiskCheck from '@/components/RiskCheck';
import { GUIDES } from '@/lib/guides';
import { RISK_QUESTIONS } from '@/lib/riskCheck';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Will my app get rejected? Free App Store rejection-risk check';
const DESCRIPTION = `Answer ${RISK_QUESTIONS.length} yes-or-no questions about your iOS app and see which App Review guidelines it is likely to trip, with the fix for each. Built for apps made with AI tools. Free, nothing leaves your browser.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/app-review/check' },
  openGraph: { url: `${SITE_URL}/app-review/check`, title: TITLE, description: DESCRIPTION },
};

export default function RiskCheckPage() {
  const guides = Object.fromEntries(GUIDES.map((g) => [g.slug, { code: g.code, name: g.name }]));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'App Store rejection-risk check',
    url: `${SITE_URL}/app-review/check`,
    description: DESCRIPTION,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    provider: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="pt-16">
        <section className="section">
          <Link href="/app-review" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted hover:text-titanix-text">
            <ArrowLeft size={14} /> Rejection guides
          </Link>
          <Reveal as="h1" className="wide mt-10 max-w-5xl font-display text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Will it get rejected?
          </Reveal>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-titanix-muted">
            {RISK_QUESTIONS.length} yes-or-no questions about your app, each tied to an App Review guideline that rejects
            apps often, especially ones built quickly with AI tools. Nothing you answer leaves this page.
          </p>
        </section>

        <section className="section !pt-0" aria-label="Questions">
          <RiskCheck questions={RISK_QUESTIONS} guides={guides} />
          <p className="mt-10 max-w-2xl text-sm text-titanix-muted">
            A rough guide, not a verdict. Not affiliated with Apple; the{' '}
            <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-titanix-text">
              App Review Guidelines
            </a>{' '}
            are what counts.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
