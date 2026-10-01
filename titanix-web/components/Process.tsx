import SectionHead from './ui/SectionHead';

const STEPS = [
  {
    title: 'Discover',
    time: 'Week 0',
    text: 'A call to pin down the problem, who it is for and the one thing version 1 has to do. You leave with a written scope and an honest timeline.',
  },
  {
    title: 'Build the MVP',
    time: 'Weekly builds',
    text: 'The smallest version that proves the idea. You get a working build on your phone early and a new one every week.',
  },
  {
    title: 'Launch',
    time: 'Release',
    text: 'Store listing and screenshots, App Store review, analytics, payments and the production deploy. We have done this for every app in the index.',
  },
  {
    title: 'Grow',
    time: 'After',
    text: 'We read the numbers with you, fix what people trip on, and plan the next version around what they actually do.',
  },
];

const MODELS = [
  { title: 'Fixed-scope MVP', text: 'A defined first version for a fixed price and timeline. Best for a new product or a proof of concept.' },
  { title: 'Ongoing partnership', text: 'A monthly retainer for continuous work after launch: new features, updates and support.' },
];

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <SectionHead
        n="05"
        label="Process"
        id="process-title"
        title="How a project runs."
        intro="The same process we use for our own apps: small steps, working software early, no surprises."
      />

      <ol className="mt-12 border-t border-titanix-border">
        {STEPS.map((s, i) => (
          <li key={s.title} className="grid gap-3 border-b border-titanix-border py-7 md:grid-cols-[4rem_1fr_8rem_1.6fr] md:gap-8">
            <span className="font-mono text-sm text-titanix-yellow">0{i + 1}</span>
            <h3 className="font-display text-xl font-bold">{s.title}</h3>
            <span className="font-mono text-xs text-titanix-faint md:pt-1.5">{s.time}</span>
            <p className="text-titanix-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {MODELS.map((m) => (
          <div key={m.title} className="border-l-2 border-titanix-yellow pl-5">
            <h3 className="font-display text-lg font-bold">{m.title}</h3>
            <p className="mt-1.5 text-sm text-titanix-muted">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
