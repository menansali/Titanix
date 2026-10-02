'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { gsap } from '@/lib/motion';
import SectionHead from './ui/SectionHead';
import TrackedLink from './ui/TrackedLink';

const code = (id: number) => `TX-${String(id).padStart(2, '0')}`;
const img = (p: (typeof PROJECTS)[number]) => p.screenshots?.[0] ?? p.cover;

export default function Work() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  // The preview card trails the cursor and leans into horizontal movement.
  useEffect(() => {
    const el = previewRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
    const r = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' });
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const active = PROJECTS.find((p) => p.slug === hover);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <SectionHead
        n="04"
        label="Index"
        id="work-title"
        title="Everything we've shipped."
        intro="Six products live, plus the hardware lab work they grew out of. Open any product for the full case study."
      />

      <ol className="mt-14 border-t border-titanix-border" onMouseLeave={() => setHover(null)}>
        {PROJECTS.map((p) => {
          const row = (
            <>
              {/* Yellow fill rises behind the row on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-titanix-yellow transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100"
              />
              <span className="relative font-mono text-[11px] text-titanix-faint transition-colors duration-300 group-hover:text-black/60">
                {code(p.id)}
              </span>
              <span className="relative flex min-w-0 items-center gap-4 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-x-3">
                {p.icon ? (
                  <span
                    className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[0.65rem] border border-titanix-border sm:h-12 sm:w-12"
                    style={p.caseStudy ? { viewTransitionName: `icon-${p.slug}` } : undefined}
                  >
                    <Image src={p.icon} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.65rem] border border-dashed border-titanix-border font-mono text-[9px] text-titanix-faint transition-colors group-hover:border-black/40 group-hover:text-black/60 sm:h-12 sm:w-12">
                    LAB
                  </span>
                )}
                <span
                  className="wide block font-display text-[6.6vw] font-extrabold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 group-hover:text-black sm:text-5xl lg:text-6xl"
                  style={p.caseStudy ? { viewTransitionName: `title-${p.slug}` } : undefined}
                >
                  {p.title.split(':')[0]}
                </span>
              </span>
              <span className="relative hidden text-right text-sm text-titanix-muted transition-colors duration-300 group-hover:text-black/70 md:block">
                {p.category}
                <span className="block font-mono text-[11px] text-titanix-faint group-hover:text-black/50">
                  {p.status === 'Lab' ? 'Lab' : p.year}
                </span>
              </span>
              <span className="relative flex justify-end">
                {p.caseStudy && (
                  <ArrowUpRight
                    size={22}
                    className="text-titanix-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-black"
                  />
                )}
              </span>
            </>
          );
          const cls =
            'group relative grid grid-cols-[3rem_1fr_auto] items-center gap-3 overflow-hidden border-b border-titanix-border px-1 py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:py-7 md:grid-cols-[4.5rem_1fr_14rem_2.5rem] md:gap-6';
          return (
            <li key={p.id} onMouseEnter={() => setHover(img(p) ? p.slug : null)}>
              {p.caseStudy ? (
                <TrackedLink
                  href={`/work/${p.slug}`}
                  event="Case study opened"
                  props={{ project: p.slug, from: 'home' }}
                  data-cursor="Open"
                  className={`${cls} focus-visible:outline focus-visible:outline-2 focus-visible:outline-titanix-yellow`}
                >
                  {row}
                </TrackedLink>
              ) : (
                <div className={cls}>{row}</div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Floating preview (mouse only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(pointer:fine)]:block"
      >
        <div
          className={`relative -translate-y-1/2 translate-x-10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
            active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <div className="relative aspect-[1290/2796] w-52 overflow-hidden rounded-[1.6rem] border border-black/40 bg-titanix-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] xl:w-60">
            {PROJECTS.filter(img).map((p) => (
              <Image
                key={p.slug}
                src={img(p)!}
                alt=""
                fill
                sizes="240px"
                className={`${p.screenshots?.[0] ? 'object-cover' : 'object-contain'} transition-opacity duration-300 ${
                  p.slug === hover ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
