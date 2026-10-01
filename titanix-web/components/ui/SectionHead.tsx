import type { ReactNode } from 'react';

interface SectionHeadProps {
  /** Two-digit section number, e.g. "04". */
  n: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

/** Datasheet-style section header: numbered mono label on a hairline, then a plain heading. */
export default function SectionHead({ n, label, title, intro, id }: SectionHeadProps) {
  return (
    <header>
      <div className="flex items-center gap-4 border-t border-titanix-border pt-4">
        <span className="font-mono text-[11px] text-titanix-yellow">{n}</span>
        <span className="label">{label}</span>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <h2 id={id} className="max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="max-w-md text-titanix-muted lg:justify-self-end">{intro}</p>}
      </div>
    </header>
  );
}
