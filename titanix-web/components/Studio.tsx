import { Rocket, ShieldCheck, Zap, Users } from 'lucide-react';
import Reveal from './ui/Reveal';

const VALUES = [
  { icon: Zap, title: 'Ship fast', text: 'MVP first, iterate in the open. Momentum beats perfection.' },
  { icon: ShieldCheck, title: 'Build to last', text: 'Clean architecture and real engineering — not throwaway code.' },
  { icon: Users, title: 'True partner', text: 'One small, senior team. You talk to the people building it.' },
  { icon: Rocket, title: 'End to end', text: 'From firmware to the App Store, we own the whole stack.' },
];

export default function Studio() {
  return (
    <section id="studio" className="section">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="eyebrow">The studio</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Independent since <span className="text-gradient">2021</span> — and
            just getting started.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-titanix-muted">
            <p>
              Titanix began as a hardware-and-software shop and has grown into a
              focused product studio. Today we pour that experience into three
              things we love: iOS apps, SaaS platforms, and IoT systems.
            </p>
            <p>
              We&apos;re small on purpose. That means senior hands on every
              project, fast decisions, and work we&apos;re proud to put our name
              on. This rebrand is a new chapter — same obsession with craft, a
              sharper focus on what&apos;s next.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl glass p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-titanix-border bg-white/[0.03]">
                    <Icon size={20} className="text-titanix-glow" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-titanix-muted">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
