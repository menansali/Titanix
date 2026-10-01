import { Compass, Hammer, Rocket, TrendingUp } from 'lucide-react';
import Reveal from './ui/Reveal';

const STEPS = [
  {
    icon: Compass,
    title: 'Discover',
    text: 'A short call to pin down the problem, the users and the one thing v1 must do. You leave with a scoped plan and a straight answer on timeline.',
  },
  {
    icon: Hammer,
    title: 'Build the MVP',
    text: 'We build the smallest version that proves the idea, with a working build in your hands early and updates every week — not a big reveal at the end.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    text: 'App Store review, store listing and screenshots, analytics, payments, and the production deploy. We have done it for every app in our portfolio.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    text: 'After launch we read the numbers with you, fix what users trip on, and ship the next version based on what they actually do.',
  },
];

const MODELS = [
  {
    title: 'Fixed-scope MVP',
    text: 'A defined v1 for a fixed price and timeline. Best for a new product or a proof of concept.',
  },
  {
    title: 'Ongoing partnership',
    text: 'A monthly retainer for continuous development after launch — new features, updates and support.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">How we work</span>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          From first call to <span className="text-gradient">live in the store</span>.
        </h2>
        <p className="mt-5 text-lg text-titanix-muted">
          The same process we use for our own apps — small steps, working
          software early, and no surprises.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <li className="relative h-full rounded-3xl glass p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-titanix-border bg-white/[0.03]">
                    <Icon size={20} className="text-titanix-glow" />
                  </div>
                  <span className="font-mono text-sm text-titanix-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-titanix-muted">{s.text}</p>
              </li>
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="mt-5 grid gap-5 md:grid-cols-2">
        {MODELS.map((m) => (
          <div key={m.title} className="rounded-3xl border border-titanix-border bg-void-fade p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold">{m.title}</h3>
            <p className="mt-2 text-sm text-titanix-muted">{m.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
