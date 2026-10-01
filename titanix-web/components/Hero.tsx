import { ArrowRight } from 'lucide-react';
import { CONTACT, LAB_LOG, PROJECTS } from '@/lib/data';

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Hero() {
  const live = PROJECTS.filter((p) => p.status === 'Shipped').length;
  const latest = LAB_LOG[0];
  const rev = new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  const spec: [string, string][] = [
    ['Founded', '2021'],
    ['Products live', String(live)],
    ['Platforms', 'iOS · Web · Embedded'],
    ['App Store rating', '5.0 ★'],
    ['Languages shipped', '12'],
    ['Latest release', `${latest.project} ${latest.title} · ${fmt(latest.date)}`],
  ];

  return (
    <section id="top" className="section flex min-h-[100svh] flex-col justify-center !pb-16 !pt-32">
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="label">Titanix · Product studio · Est. 2021</p>
          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight [text-wrap:balance] sm:text-6xl lg:text-7xl">
            We build and ship iOS apps, SaaS platforms and IoT systems.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-titanix-muted">
            Six products live, five of them on the App Store this year. We design them, write the code
            and take them through review, for clients and for ourselves.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary group">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#work" className="btn-ghost">
              See the work
            </a>
          </div>
        </div>

        {/* Datasheet */}
        <div className="border border-titanix-border">
          <div className="flex items-center justify-between border-b border-titanix-border px-4 py-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">Titanix — Datasheet</span>
            <span className="font-mono text-[11px] text-titanix-faint">Rev. {rev}</span>
          </div>
          <dl>
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9.5rem_1fr] border-b border-titanix-border px-4 py-2.5 text-sm last:border-b-0">
                <dt className="text-titanix-faint">{k}</dt>
                <dd className="font-mono text-[13px] text-titanix-text">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center justify-between border-t border-titanix-border bg-titanix-yellow px-4 py-3 font-mono text-[13px] font-medium text-black transition-colors hover:bg-titanix-glow"
          >
            {CONTACT.email}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
