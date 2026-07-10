import { ArrowUpRight } from 'lucide-react';
import { PILLARS } from '@/lib/data';
import Reveal from './ui/Reveal';

export default function Focus() {
  return (
    <section id="focus" className="section">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">What we build</span>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three disciplines. <span className="text-gradient">One studio.</span>
        </h2>
        <p className="mt-5 text-lg text-titanix-muted">
          We go deep on three things and do them well — the full stack from
          silicon to the App Store.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-titanix-glow/30">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-titanix-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                  <Icon size={22} className="text-white" strokeWidth={2} />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-titanix-glow">{p.tagline}</p>
                <p className="mt-4 text-titanix-muted">{p.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-titanix-text">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-titanix-muted transition-colors group-hover:text-titanix-text">
                  Learn more
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
