import { TECH_MARQUEE } from '@/lib/data';

export default function Marquee() {
  const row = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <section className="relative border-y border-titanix-border/60 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-titanix-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-titanix-void to-transparent" />
      <div className="flex w-max animate-marquee gap-4">
        {row.map((tech, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-titanix-border bg-white/[0.02] px-5 py-2 text-sm font-medium text-titanix-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
