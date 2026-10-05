import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import { SAMPLE_AUDIT as A, type Verdict } from '@/lib/sampleAudit';

export const metadata: Metadata = {
  title: `Sample App Launch Audit: ${A.app}`,
  description: `A real App Launch Audit of our own app ${A.app}: every check, what we found and the fix.`,
  alternates: { canonical: '/ship/sample-audit' },
  ...(A.published ? {} : { robots: { index: false, follow: false } }),
};

const TONE: Record<Verdict, string> = {
  PASS: 'border-titanix-border text-titanix-muted',
  WARN: 'border-titanix-yellow/60 text-titanix-yellow',
  FAIL: 'border-titanix-yellow bg-titanix-yellow text-black',
  'N/A': 'border-titanix-border text-titanix-faint',
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function SampleAuditPage() {
  if (!A.published) notFound();
  const counts = (['FAIL', 'WARN', 'PASS', 'N/A'] as Verdict[]).map((v) => [v, A.checks.filter((c) => c.verdict === v).length] as const);

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <article className="section !pt-6">
          <div className="flex items-center justify-between border-b border-titanix-border pb-4">
            <Link href="/ship#audit" className="inline-flex items-center gap-1.5 text-sm text-titanix-muted transition-colors hover:text-titanix-text">
              <ArrowLeft size={15} /> App Launch Audit
            </Link>
            <time dateTime={A.date} className="font-mono text-[11px] text-titanix-faint">{fmt(A.date)}</time>
          </div>

          <header className="mt-14 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="label">Sample report · our own app</p>
              <Reveal as="h1" className="wide mt-6 font-display text-[9vw] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                {A.app.split(':')[0]}
              </Reveal>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-titanix-muted">
                We run the same audit on our own apps that we sell to clients. This is the real report for {A.app},
                version {A.version}. Nothing below is cleaned up.
              </p>
            </div>
            <div className={`p-6 ${A.verdict === 'READY' ? 'border border-titanix-border' : 'bg-titanix-yellow text-black'}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">Verdict</p>
              <p className="wide mt-2 font-display text-4xl font-extrabold uppercase">{A.verdict}</p>
              <p className="mt-3 text-sm opacity-80">{A.headline}</p>
            </div>
          </header>

          <dl className="mt-12 grid grid-cols-4 border-y border-titanix-border">
            {counts.map(([v, n]) => (
              <div key={v} className="border-l border-titanix-border px-4 py-5 first:border-l-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanix-faint">{v}</dt>
                <dd className="wide mt-1 font-display text-3xl font-extrabold">{n}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-12 border-t border-titanix-border">
            {A.checks.map((c) => (
              <li key={c.check} className="grid gap-4 border-b border-titanix-border py-7 md:grid-cols-[13rem_5rem_1fr] md:gap-8">
                <h2 className="font-display text-lg font-semibold tracking-tight">{c.check}</h2>
                <span className={`h-fit w-fit border px-2 py-0.5 font-mono text-[11px] ${TONE[c.verdict]}`}>{c.verdict}</span>
                <div className="space-y-2">
                  <p className="text-titanix-muted">{c.found}</p>
                  {c.fix !== 'None.' && (
                    <p>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-titanix-yellow">Fix · </span>
                      {c.fix}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <section className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Do these first</h2>
              <ol className="mt-5 space-y-3 text-lg text-titanix-muted">
                {A.next.map((t, n) => (
                  <li key={t} className="grid grid-cols-[2rem_1fr]">
                    <span className="font-mono text-sm leading-[1.9] text-titanix-yellow">{String(n + 1).padStart(2, '0')}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-titanix-yellow p-6 text-black sm:p-8">
              <p className="wide font-display text-2xl font-extrabold uppercase leading-tight">Want this for your app?</p>
              <p className="mt-3 text-black/75">Same checks, your app, a report like this one within 48 hours.</p>
              <Link href="/ship#order" className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-semibold text-titanix-yellow">
                Order the audit <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
