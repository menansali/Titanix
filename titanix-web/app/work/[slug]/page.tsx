import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      <Navbar />
      <main className="pt-24 sm:pt-28">
        {/* Header */}
        <section className="section !pb-12 !pt-6">
          <div className="flex items-center justify-between border-b border-titanix-border pb-4">
            <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
              <ArrowLeft size={15} /> Index
            </Link>
            <span className="font-mono text-[11px] text-titanix-faint">
              TX-{String(p.id).padStart(2, '0')} · {p.year}
            </span>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-5">
                {p.icon && (
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.2rem] border border-titanix-border"
                    style={{ viewTransitionName: `icon-${p.slug}` }}
                  >
                    <Image src={p.icon} alt={`${p.title} app icon`} fill sizes="80px" className="object-cover" priority />
                  </div>
                )}
                <div>
                  <p className="label">{p.category}</p>
                  <h1
                    className="wide mt-2 w-fit font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl"
                    style={{ viewTransitionName: `title-${p.slug}` }}
                  >
                    {p.title}
                  </h1>
                </div>
              </div>

              <p className="mt-10 font-display text-2xl font-semibold leading-snug text-titanix-text [text-wrap:balance] sm:text-3xl">
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
                    className="btn-primary group"
                  >
                    {isAppStore ? 'View on the App Store' : `Visit ${p.title}`}
                    <ArrowUpRight size={16} />
                  </TrackedLink>
                )}
                <Link href="/#contact" className="btn-ghost">
                  Build something like this
                </Link>
              </div>

              {/* Spec */}
              <dl className="mt-12 border-t border-titanix-border">
                {cs.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[10rem_1fr] border-b border-titanix-border py-2.5 text-sm">
                    <dt className="text-titanix-faint">{f.label}</dt>
                    <dd className="font-mono text-[13px]">{f.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[10rem_1fr] border-b border-titanix-border py-2.5 text-sm">
                  <dt className="text-titanix-faint">Stack</dt>
                  <dd className="font-mono text-[13px]">{p.tech.join(' · ')}</dd>
                </div>
              </dl>
            </div>

            {p.screenshots?.[0] ? (
              <div className="relative mx-auto aspect-[1290/2796] w-full max-w-[19rem] overflow-hidden rounded-[2rem] border border-titanix-border">
                <Image
                  src={p.screenshots[0]}
                  alt={`${p.title} on iPhone`}
                  fill
                  sizes="19rem"
                  className="object-cover"
                  priority
                />
              </div>
            ) : p.cover && (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-titanix-border">
                <Image
                  src={p.cover}
                  alt={`${p.title}: ${cs.tagline}`}
                  fill
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* Problem + what we built */}
        <section className="section !pt-0">
          <div className="grid gap-12 border-t border-titanix-border pt-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="label">The problem</p>
              <p className="mt-5 text-lg leading-relaxed text-titanix-muted">{cs.problem}</p>
            </div>
            <div>
              <p className="label">What we built</p>
              <ol className="mt-5 border-t border-titanix-border">
                {cs.built.map((b, n) => (
                  <li key={b} className="grid grid-cols-[2.5rem_1fr] border-b border-titanix-border py-3.5">
                    <span className="font-mono text-xs text-titanix-yellow">{String(n + 1).padStart(2, '0')}</span>
                    <span className="leading-relaxed text-titanix-text">{b}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        {p.screenshots && (
          <section className="section !pt-0" aria-label={`${p.title} screenshots`}>
            <p className="label border-t border-titanix-border pt-4">Screens</p>
            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
              {p.screenshots.map((src, n) => (
                <div
                  key={src}
                  className="relative aspect-[1290/2796] w-52 shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-titanix-border sm:w-60"
                >
                  <Image src={src} alt={`${p.title} screenshot ${n + 1}`} fill sizes="240px" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next */}
        <section className="section !pt-0">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-y border-titanix-border py-8 transition-colors hover:border-titanix-yellow"
          >
            <div className="flex items-center gap-4">
              {next.icon && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[0.9rem] border border-titanix-border">
                  <Image src={next.icon} alt="" fill sizes="56px" className="object-cover" />
                </div>
              )}
              <div>
                <p className="label">Next</p>
                <p className="wide mt-1 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">{next.title.split(":")[0]}</p>
              </div>
            </div>
            <ArrowRight className="shrink-0 text-titanix-faint transition-all group-hover:translate-x-1 group-hover:text-titanix-yellow" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
