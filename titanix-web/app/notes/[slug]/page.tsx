import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import { NOTES, getNote } from '@/lib/notes';
import { SITE_URL } from '@/lib/site';
import { FOUNDER } from '@/lib/data';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const n = getNote((await params).slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.summary,
    alternates: { canonical: `/notes/${n.slug}` },
    authors: [{ name: FOUNDER.name, url: FOUNDER.linkedin }],
    openGraph: { type: 'article', url: `${SITE_URL}/notes/${n.slug}`, title: n.title, description: n.summary, publishedTime: n.date, authors: [FOUNDER.linkedin] },
  };
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function NotePage({ params }: { params: Params }) {
  const n = getNote((await params).slug);
  if (!n) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: n.title,
    description: n.summary,
    datePublished: n.date,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.role,
      url: `${SITE_URL}/#studio`,
      image: `${SITE_URL}${FOUNDER.photo}`,
      sameAs: [FOUNDER.linkedin, FOUNDER.github],
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/notes/${n.slug}`,
    keywords: n.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <article className="section !pt-6">
          <div className="flex items-center justify-between border-b border-titanix-border pb-4">
            <Link href="/notes" className="inline-flex items-center gap-1.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
              <ArrowLeft size={15} /> Notes
            </Link>
            <time dateTime={n.date} className="font-mono text-[11px] text-titanix-faint">
              {fmt(n.date)}
            </time>
          </div>

          <header className="mx-auto mt-14 max-w-3xl">
            <div className="flex flex-wrap gap-1.5">
              {n.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <Reveal as="h1" className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
              {n.title}
            </Reveal>
            <p className="mt-6 text-xl leading-relaxed text-titanix-muted">{n.summary}</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-titanix-border">
                <Image src={FOUNDER.photo} alt="" fill sizes="44px" className="object-cover" />
              </div>
              <p className="text-sm leading-tight">
                <span className="block text-titanix-text">
                  By{' '}
                  <a href={FOUNDER.linkedin} target="_blank" rel="author noopener noreferrer" className="underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                    {FOUNDER.name}
                  </a>
                </span>
                <span className="font-mono text-[11px] text-titanix-faint">{FOUNDER.role}, Titanix</span>
              </p>
            </div>
          </header>

          <div className="mx-auto mt-14 max-w-3xl space-y-6 border-t border-titanix-border pt-10 text-lg leading-relaxed text-titanix-muted">
            {n.body.map((b, i) => {
              if (b.type === 'h2')
                return (
                  <h2 key={i} className="!mt-12 font-display text-2xl font-semibold tracking-tight text-titanix-text sm:text-3xl">
                    {b.text}
                  </h2>
                );
              if (b.type === 'list')
                return (
                  <ul key={i} className="space-y-3 border-l border-titanix-yellow pl-5">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              if (b.type === 'code')
                return (
                  <pre key={i} className="overflow-x-auto border border-titanix-border bg-black/50 p-4 font-mono text-sm text-titanix-yellow">
                    <code>{b.text}</code>
                  </pre>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>

          <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 border-t border-titanix-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-titanix-muted">Building something like this?</p>
            <Link href="/#contact" className="btn-primary">
              Start a project
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
