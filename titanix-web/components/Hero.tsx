import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { getRatings } from '@/lib/appstore';
import Scramble from './motion/Scramble';

export default async function Hero() {
  const live = PROJECTS.filter((p) => p.status === 'Shipped').length;
  const ratings = await getRatings();

  const stats: [string, string][] = [
    [String(live).padStart(2, '0'), 'Products live'],
    ratings ? [`${ratings.average.toFixed(1)}★`, `${ratings.count} App Store ratings`] : ['5.0★', 'App Store rating'],
    ['12', 'Languages shipped'],
    ['2021', 'Founded'],
  ];

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:pb-10">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
        <Scramble immediate delay={0.2} text="Product studio / Est. 2021" />
        <Scramble immediate delay={0.35} text="iOS · SaaS · IoT" className="hidden sm:inline" />
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
    </section>
  );
}
