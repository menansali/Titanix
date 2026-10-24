import type { ReactNode } from 'react';
import Reveal from '../motion/Reveal';
import Scramble from '../motion/Scramble';

interface SectionHeadProps {
  /** Two-digit section number, e.g. "04". */
  n: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

/** Numbered mono label on a hairline (decodes in), then a heading whose lines rise in. */
export default function SectionHead({ n, label, title, intro, id }: SectionHeadProps) {
  return (
    <header>
      <div className="relative flex items-center gap-4 pt-4 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span aria-hidden="true" className="draw absolute inset-x-0 top-0 h-px bg-titanix-border" />
        <span className="text-titanix-yellow">({n})</span>
        <Scramble text={label} className="text-titanix-muted" />
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <Reveal
          as="h2"
          id={id}
          className="max-w-4xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
        >
          {title}
        </Reveal>
        {intro && (
          <Reveal as="p" className="max-w-md text-titanix-muted lg:justify-self-end">
            {intro}
          </Reveal>
        )}
      </div>
    </header>
  );
}
