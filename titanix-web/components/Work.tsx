import Image from 'next/image';
import { PROJECTS } from '@/lib/data';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import AppArt from './AppArt';

// Fallback monogram gradients for apps without an exported icon.
const ACCENTS = [
  'from-titanix-glow to-titanix-gold',
  'from-white to-[#CFCFC4]',
  'from-titanix-yellow to-titanix-gold',
];

export default function Work() {
  return (
    <section id="work" className="section">
      <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow">Selected work</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Apps &amp; systems we&apos;ve <span className="text-gradient">built</span>.
          </h2>
        </div>
        <p className="max-w-sm text-titanix-muted">
          A slice of the Titanix lab — native iOS apps and SaaS platforms
          across lifestyle, AI, beauty, health, and hospitality.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
            <TiltCard className="h-full">
            <article className="group relative flex h-full flex-col rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-titanix-glow/30">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-titanix-yellow/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                {p.icon ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-[1.15rem] border border-titanix-border shadow-glow">
                    <Image src={p.icon} alt={`${p.title} app icon`} fill sizes="64px" className="object-cover" />
                  </div>
                ) : p.art ? (
                  <AppArt name={p.art} className="h-16 w-16 rounded-[1.15rem] shadow-glow" />
                ) : (
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-[1.15rem] bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} shadow-glow`}
                  >
                    <span className="font-display text-2xl font-bold text-black">
                      {p.title.charAt(0)}
                    </span>
                  </div>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    p.status === 'Shipped'
                      ? 'bg-titanix-yellow/15 text-titanix-glow'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="relative mt-5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold leading-tight">{p.title}</h3>
                <span className="shrink-0 font-mono text-xs text-titanix-faint">{p.year}</span>
              </div>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-titanix-glow">
                {p.category}
              </p>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-titanix-muted">
                {p.description}
              </p>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-titanix-border bg-white/[0.02] px-2 py-0.5 text-[11px] text-titanix-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
