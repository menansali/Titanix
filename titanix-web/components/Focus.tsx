'use client';

import { useEffect, useRef } from 'react';
import { Link } from 'next-view-transitions';
import { PILLARS, PROJECTS } from '@/lib/data';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import SectionHead from './ui/SectionHead';

export default function Focus() {
  const listRef = useRef<HTMLDivElement>(null);

  // Each discipline name is drawn in outline and fills in as it scrolls through.
  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-fill]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: true },
          },
        );
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="focus" className="section" aria-labelledby="focus-title">
      <SectionHead
        n="02"
        label="Disciplines"
        id="focus-title"
        title="Three things, all the way down the stack."
        intro="Most products need more than one of these. We do all three, so nothing gets lost between teams."
      />

      <div ref={listRef} className="mt-14 border-t border-titanix-border">
        {PILLARS.map((p, i) => (
          <div key={p.id} className="grid gap-6 border-b border-titanix-border py-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <span className="font-mono text-[11px] text-titanix-yellow">(0{i + 1})</span>
              <h3 className="wide relative mt-3 font-display text-[11vw] font-extrabold leading-[0.9] tracking-[-0.03em] sm:text-7xl xl:text-8xl">
                <span className="text-outline block" style={{ ['--stroke' as string]: 'rgba(250,250,245,0.35)' }}>
                  {p.title}
                </span>
                <span data-fill aria-hidden="true" className="absolute inset-0 block text-titanix-text">
                  {p.title}
                </span>
              </h3>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-lg text-titanix-muted">{p.description}</p>
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
