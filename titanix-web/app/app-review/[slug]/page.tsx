import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import { GUIDES, getGuide } from '@/lib/guides';
import { SITE_URL } from '@/lib/site';
import { SAMPLE_AUDIT } from '@/lib/sampleAudit';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/app-review/${g.slug}` },
    openGraph: { type: 'article', url: `${SITE_URL}/app-review/${g.slug}`, title: g.title, description: g.summary },
  };
}

const H2 = 'font-display text-2xl font-semibold tracking-tight text-titanix-text sm:text-3xl';

export default async function GuidePage({ params }: { params: Params }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const i = GUIDES.indexOf(g);
  const next = GUIDES[(i + 1) % GUIDES.length];
  const url = `${SITE_URL}/app-review/${g.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: g.title,
        description: g.summary,
        dateModified: '2026-10-05',
        author: { '@id': `${SITE_URL}/#founder` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        about: `App Store Review Guideline ${g.code}`,
      },
      {
        '@type': 'HowTo',
        name: `How to fix a guideline ${g.code} rejection`,
        step: g.fix.map((text, n) => ({ '@type': 'HowToStep', position: n + 1, text })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'App Review guides', item: `${SITE_URL}/app-review` },
          { '@type': 'ListItem', position: 2, name: `Guideline ${g.code}`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <article className="section !pt-6">
          <div className="flex items-center justify-between border-b border-titanix-border pb-4">
            <Link href="/app-review" className="inline-flex items-center gap-1.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
              <ArrowLeft size={15} /> All rejection guides
            </Link>
            <span className="font-mono text-[11px] text-titanix-faint">Guideline {g.code}</span>
          </div>

          <header className="mx-auto mt-14 max-w-3xl">
            <p className="wide font-display text-6xl font-extrabold tracking-tight text-titanix-yellow sm:text-8xl">{g.code}</p>
            <Reveal as="h1" className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl">
              {g.title}
            </Reveal>
            <p className="mt-6 text-xl leading-relaxed text-titanix-muted">{g.summary}</p>
          </header>

          <div className="mx-auto mt-12 max-w-3xl space-y-12 text-lg leading-relaxed text-titanix-muted">
            <figure className="border-l-2 border-titanix-yellow pl-5">
              <blockquote className="text-titanix-text">“{g.quote}”</blockquote>
              <figcaption className="mt-2 font-mono text-[11px] text-titanix-faint">
                App Review Guidelines, {g.code} {g.name}
              </figcaption>
            </figure>

            <section>
              <h2 className={H2}>Why apps get rejected for it</h2>
              <ul className="mt-5 space-y-3">
                {g.causes.map((c) => (
                  <li key={c} className="grid grid-cols-[1.25rem_1fr]">
                    <span className="text-titanix-yellow">×</span>
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={H2}>How to fix it</h2>
              <ol className="mt-5 space-y-3">
                {g.fix.map((f, n) => (
                  <li key={f} className="grid grid-cols-[2rem_1fr]">
                    <span className="font-mono text-sm leading-[1.9] text-titanix-yellow">{String(n + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className={H2}>What to tell App Review</h2>
              <p className="mt-5">{g.reply}</p>
            </section>

            <section className="bg-titanix-yellow p-6 text-black sm:p-8">
              <p className="wide font-display text-2xl font-extrabold uppercase leading-tight">Want a second pair of eyes before you resubmit?</p>
              <p className="mt-3 text-black/75">
                The App Launch Audit checks your app against {g.code} and every other common rejection reason, and gives you a READY / NOT
                READY report with the exact fixes within 48 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/ship#order" className="inline-flex items-center gap-2 whitespace-nowrap bg-black px-5 py-3 text-sm font-semibold text-titanix-yellow">
                  Order the audit <ArrowRight size={16} />
                </Link>
                {SAMPLE_AUDIT.published && (
                  <Link href="/ship/sample-audit" className="inline-flex items-center gap-2 whitespace-nowrap border border-black/40 px-5 py-3 text-sm font-semibold">
                    See a sample report
                  </Link>
                )}
              </div>
            </section>

            <p className="text-sm">
              Not affiliated with Apple. The guidelines change; the{' '}
              <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-titanix-text">
                full text on Apple&apos;s site
              </a>{' '}
              is what counts. Last checked 5 October 2026.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl border-t border-titanix-border pt-8">
            <Link href={`/app-review/${next.slug}`} className="group flex items-center justify-between gap-6">
              <span>
                <span className="label">Next guide</span>
                <span className="mt-1 block font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-titanix-yellow">
                  {next.code} {next.name}
                </span>
              </span>
              <ArrowRight className="shrink-0 text-titanix-faint transition-all group-hover:translate-x-1 group-hover:text-titanix-yellow" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
