import { Link } from 'next-view-transitions';
import { PILLARS, PROJECTS } from '@/lib/data';
import SectionHead from './ui/SectionHead';

export default function Focus() {
  return (
    <section id="focus" className="section" aria-labelledby="focus-title">
      <SectionHead
        n="02"
        label="Disciplines"
        id="focus-title"
        title="Three things, all the way down the stack."
        intro="Most products need more than one of these. We do all three, so nothing gets lost between teams."
      />

      <div className="mt-12 border-t border-titanix-border">
        {PILLARS.map((p, i) => (
          <div
            key={p.id}
            className="grid gap-4 border-b border-titanix-border py-8 md:grid-cols-[4rem_1fr_1.4fr_1fr] md:gap-8"
          >
            <span className="font-mono text-sm text-titanix-yellow">0{i + 1}</span>
            <h3 className="font-display text-2xl font-bold">{p.title}</h3>
            <p className="text-titanix-muted">{p.description}</p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <p className="text-sm text-titanix-faint">
                Work:{' '}
                {p.examples.map((slug, k) => {
                  const proj = PROJECTS.find((x) => x.slug === slug);
                  if (!proj) return null;
                  return (
                    <span key={slug}>
                      {k > 0 && ', '}
                      {proj.caseStudy ? (
                        <Link href={`/work/${slug}`} className="text-titanix-text underline decoration-titanix-border underline-offset-4 hover:decoration-titanix-yellow">
                          {proj.title}
                        </Link>
                      ) : (
                        <span className="text-titanix-text">{proj.title}</span>
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
