import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import Reveal from './motion/Reveal';
import Scramble from './motion/Scramble';

export default function Hero() {
  const live = PROJECTS.filter((p) => p.status === 'Shipped').length;

  const stats: [string, string][] = [
    [String(live).padStart(2, '0'), 'Products live'],
    ['5.0★', 'App Store rating'],
    ['12', 'Languages shipped'],
    ['2021', 'Founded'],
  ];

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:pb-10">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-titanix-muted">
        <Scramble immediate delay={0.2} text="Product studio / Est. 2021" />
        <Scramble immediate delay={0.35} text="iOS · SaaS · IoT" className="hidden sm:inline" />
      </div>

      <Reveal
        as="h1"
        chars
        immediate
        delay={0.1}
        className="wide my-10 font-display short:my-6 text-[9.1vw] font-extrabold uppercase leading-[0.86] tracking-[-0.025em] sm:text-[9.4vw] 2xl:text-[8.6rem]"
      >
        <span className="block">From bare</span>
        <span className="block">metal to the</span>
        <span className="block">
          App Store<span className="text-titanix-yellow">.</span>
        </span>
      </Reveal>

      <div className="grid gap-10 border-t border-titanix-border pt-6 xl:grid-cols-[1fr_auto] xl:items-end">
        <div className="max-w-xl">
          <Reveal immediate delay={0.55} className="text-lg leading-relaxed text-titanix-muted sm:text-xl" as="p">
            Titanix is a product studio. We design, build and ship iOS apps, SaaS platforms and IoT
            systems, for clients and for ourselves.
          </Reveal>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
