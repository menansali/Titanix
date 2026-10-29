import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { getLabLog, getRatings } from '@/lib/appstore';
import Scramble from './motion/Scramble';

export default async function Hero() {
  const live = PROJECTS.filter((p) => p.status === 'Shipped').length;
  const onStore = PROJECTS.filter((p) => p.icon && p.url?.includes('apps.apple.com'));
  const [ratings, log] = await Promise.all([getRatings(), getLabLog()]);
  const last = log[0];

  const stats: [string, string][] = [
    [String(live).padStart(2, '0'), 'Products live'],
    ratings ? [`${ratings.average.toFixed(1)}★`, `${ratings.count} App Store ratings`] : ['5.0★', 'App Store rating'],
    ['12', 'Languages shipped'],
    ['2021', 'Founded'],
  ];

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:pb-10">
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
        <Scramble immediate delay={0.2} text="Product studio / Est. 2021" className={last ? 'hidden sm:inline' : undefined} />
        {/* The latest release, from the lab log (App Store releases land there on their own). */}
        {last ? (
          <a href="#log" className="group flex items-center gap-2.5 transition-colors hover:text-titanix-text">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-titanix-yellow opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-titanix-yellow" />
            </span>
            <span className="hidden sm:inline">Last ship ·</span>
            <span>
              {last.project} {last.title === 'Launch' ? 'launch' : last.title}
              <span className="text-titanix-faint">
                {' · '}
                <time dateTime={last.date}>
                  {new Date(`${last.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </time>
              </span>
            </span>
          </a>
        ) : (
          <Scramble immediate delay={0.35} text="iOS · SaaS · IoT" className="hidden sm:inline" />
        )}
      </div>

      {/* CSS-only entrance so the headline paints before any JavaScript (it's the LCP element). */}
      <h1
        className="wide my-10 font-display short:my-6 text-[9.1vw] font-extrabold uppercase leading-[0.86] tracking-[-0.025em] sm:text-[9.4vw] 2xl:text-[8.6rem]"
      >
        {['From bare', 'metal to the', 'App Store'].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.04em]">
            <span className="rise" style={{ animationDelay: `${0.08 + i * 0.09}s` }}>
              {line}
              {i === 2 && <span className="text-titanix-yellow">.</span>}
            </span>
          </span>
        ))}
      </h1>

      <div className="grid gap-10 border-t border-titanix-border pt-6 xl:grid-cols-[1fr_auto] xl:items-end">
        <div className="max-w-xl">
          <p className="fade-in text-lg leading-relaxed text-titanix-muted sm:text-xl" style={{ animationDelay: '0.45s' }}>
            Titanix is a product studio. We design, build and ship iOS apps, SaaS platforms and IoT
            systems, for clients and for ourselves.
          </p>
          <div className="fade-in mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="btn-primary group">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className="btn-ghost group">
              See the work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <a href="#book" className="fade-in mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted underline decoration-titanix-border underline-offset-4 transition-colors hover:text-titanix-yellow hover:decoration-titanix-yellow" style={{ animationDelay: '0.7s' }}>
            Or book a 15-minute call →
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-12">
          {stats.map(([v, k]) => (
            <div key={k}>
              <dt className="sr-only">{k}</dt>
              <dd>
                <span className="wide block font-display text-3xl font-bold tracking-tight">{v}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-titanix-faint">{k}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Proof up front: the apps themselves, each a link to its case study. */}
      <div className="fade-in mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: '0.8s' }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-titanix-faint">Live on the App Store</span>
        <ul className="flex items-center gap-2.5">
          {onStore.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                aria-label={p.title}
                title={p.title.split(':')[0]}
                className="relative block h-9 w-9 overflow-hidden rounded-[0.6rem] border border-titanix-border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-titanix-yellow"
              >
                <Image src={p.icon!} alt="" fill sizes="36px" className="object-cover" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
