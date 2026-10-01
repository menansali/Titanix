'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import SectionHead from './ui/SectionHead';
import TrackedLink from './ui/TrackedLink';

const code = (id: number) => `TX-${String(id).padStart(2, '0')}`;

export default function Work() {
  // Preview the real product: first App Store screenshot, else the cover.
  const previewable = PROJECTS.filter((p) => p.screenshots?.[0] || p.cover);
  const img = (p: (typeof PROJECTS)[number]) => p.screenshots?.[0] ?? p.cover!;
  const [hover, setHover] = useState(previewable[0]?.slug);
  const preview = previewable.find((p) => p.slug === hover) ?? previewable[0];

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <SectionHead
        n="04"
        label="Index"
        id="work-title"
        title="Everything we've shipped, and what it grew out of."
        intro="Six products live, plus the hardware lab work behind them. Open any product for the full case study."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_24rem]">
        <ol className="border-t border-titanix-border">
          {PROJECTS.map((p) => {
            const row = (
              <>
                <span className="font-mono text-xs text-titanix-faint">{code(p.id)}</span>
                <span className="flex min-w-0 items-center gap-4">
                  {p.icon ? (
                    <span
                      className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[0.7rem] border border-titanix-border"
                      style={p.caseStudy ? { viewTransitionName: `icon-${p.slug}` } : undefined}
                    >
                      <Image src={p.icon} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.7rem] border border-dashed border-titanix-border font-mono text-[10px] text-titanix-faint">
                      LAB
                    </span>
                  )}
                  <span className="min-w-0">
                    <span
                      className="block truncate font-display text-lg font-bold sm:text-xl"
                      style={p.caseStudy ? { viewTransitionName: `title-${p.slug}` } : undefined}
                    >
                      {p.title}
                    </span>
                    <span className="block truncate text-sm text-titanix-faint">{p.category}</span>
                  </span>
                </span>
                <span className="hidden font-mono text-xs text-titanix-muted sm:block">
                  {p.status === 'Lab' ? 'Lab' : p.year}
                </span>
                <span className="flex justify-end">
                  {p.caseStudy && (
                    <ArrowUpRight size={18} className="text-titanix-faint transition-colors group-hover:text-titanix-yellow" />
                  )}
                </span>
              </>
            );
            const cls =
              'group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-titanix-border py-4 sm:grid-cols-[4rem_1fr_4rem_2rem]';
            return (
              <li key={p.id} onMouseEnter={() => (p.screenshots?.[0] || p.cover) && setHover(p.slug)}>
                {p.caseStudy ? (
                  <TrackedLink
                    href={`/work/${p.slug}`}
                    event="Case study opened"
                    props={{ project: p.slug, from: 'home' }}
                    className={`${cls} transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.04] focus-visible:outline-none`}
                    onFocus={() => setHover(p.slug)}
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

        {/* Hover preview (desktop) */}
        {preview && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative mx-auto aspect-[1290/2796] w-[78%] overflow-hidden rounded-[1.75rem] border border-titanix-border bg-titanix-deep">
                {previewable.map((p) => (
                  <Image
                    key={p.slug}
                    src={img(p)}
                    alt=""
                    fill
                    sizes="24rem"
                    className={`${p.screenshots?.[0] ? 'object-cover' : 'object-contain'} transition-opacity duration-300 ${p.slug === preview.slug ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-titanix-muted">{preview.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
