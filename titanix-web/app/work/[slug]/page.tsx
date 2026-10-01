import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/ui/Reveal';
import TrackedLink from '@/components/ui/TrackedLink';
import { PROJECTS } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy);

type Params = Promise<{ slug: string }>;

function getProject(slug: string) {
  return CASE_STUDIES.find((p) => p.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const title = `${p.title} — ${p.category.split(' · ')[0]} case study`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/work/${p.slug}`,
      title,
      description: p.description,
      ...(p.cover ? { images: [{ url: p.cover, width: 1080, height: 1350, alt: p.title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: p.description },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const p = getProject((await params).slug);
  if (!p || !p.caseStudy) notFound();
  const cs = p.caseStudy;

  const i = CASE_STUDIES.indexOf(p);
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
  const isAppStore = p.url?.includes('apps.apple.com');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isAppStore ? 'MobileApplication' : 'WebApplication',
        name: p.title,
        description: p.description,
        applicationCategory: p.category,
        operatingSystem: isAppStore ? 'iOS' : 'Web',
        author: { '@id': `${SITE_URL}/#organization` },
        ...(p.icon ? { image: `${SITE_URL}${p.icon}` } : {}),
        ...(p.screenshots ? { screenshot: p.screenshots } : {}),
        ...(p.url ? { url: p.url, installUrl: p.url } : {}),
        mainEntityOfPage: `${SITE_URL}/work/${p.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Titanix', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name: p.title, item: `${SITE_URL}/work/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Background />
      <Navbar />
      <main className="pt-28 sm:pt-32">
        {/* Header */}
        <section className="section !pb-10 !pt-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text"
          >
            <ArrowLeft size={15} /> All work
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="flex items-center gap-5">
                {p.icon && (
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.4rem] border border-titanix-border shadow-glow"
                    style={{ viewTransitionName: `icon-${p.slug}` }}
                  >
                    <Image src={p.icon} alt={`${p.title} app icon`} fill sizes="80px" className="object-cover" priority />
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-titanix-glow">{p.category}</p>
                  <h1
                    className="mt-1.5 w-fit font-display text-4xl font-bold tracking-tight sm:text-5xl"
                    style={{ viewTransitionName: `title-${p.slug}` }}
                  >
                    {p.title}
                  </h1>
                </div>
              </div>

              <p className="mt-8 font-display text-2xl font-semibold leading-snug text-titanix-text [text-wrap:balance] sm:text-3xl">
                {cs.tagline}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-titanix-muted">{p.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {p.url && (
                  <TrackedLink
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="Store link clicked"
                    props={{ project: p.slug, from: 'case-study' }}
                    className="btn-primary group w-full sm:w-auto"
                  >
                    {isAppStore ? 'View on the App Store' : `Visit ${p.title}`}
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </TrackedLink>
                )}
                <Link href="/#contact" className="btn-ghost w-full sm:w-auto">
                  Build something like this
                </Link>
              </div>
            </Reveal>

            {p.cover && (
              <Reveal delay={0.1}>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-titanix-border shadow-glow-lg">
                  <Image
                    src={p.cover}
                    alt={`${p.title} — ${cs.tagline}`}
                    fill
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Facts */}
        <section className="section !py-0">
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-titanix-border bg-titanix-border sm:grid-cols-4">
              {cs.facts.map((f) => (
                <div key={f.label} className="bg-titanix-void p-6">
                  <dt className="text-xs uppercase tracking-wider text-titanix-faint">{f.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-bold text-gradient">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Problem + what we built */}
        <section className="section">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <span className="eyebrow">The problem</span>
              <p className="mt-6 text-lg leading-relaxed text-titanix-muted">{cs.problem}</p>

              <h2 className="mt-12 text-xs font-semibold uppercase tracking-widest text-titanix-faint">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-titanix-border bg-white/[0.02] px-3 py-1 text-sm text-titanix-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="eyebrow">What we built</span>
              <ul className="mt-6 space-y-4">
                {cs.built.map((b) => (
                  <li key={b} className="flex gap-3 text-titanix-text">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                      <Check size={12} className="text-black" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Screenshots */}
        {p.screenshots && (
          <section className="section !pt-0" aria-label={`${p.title} screenshots`}>
            <Reveal>
              <span className="eyebrow">On the App Store</span>
            </Reveal>
            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
              {p.screenshots.map((src, n) => (
                <div
                  key={src}
                  className="relative aspect-[392/696] w-52 shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-titanix-border sm:w-60"
                >
                  <Image
                    src={src}
                    alt={`${p.title} screenshot ${n + 1}`}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next */}
        <section className="section !pt-0">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-3xl glass p-6 transition-all duration-300 hover:border-titanix-glow/30 sm:p-8"
          >
            <div className="flex items-center gap-4">
              {next.icon && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-titanix-border">
                  <Image src={next.icon} alt="" fill sizes="56px" className="object-cover" />
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-titanix-faint">Next case study</p>
                <p className="mt-1 font-display text-2xl font-bold">{next.title}</p>
              </div>
            </div>
            <ArrowRight className="shrink-0 text-titanix-glow transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
