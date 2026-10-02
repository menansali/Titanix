'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { useScrollProgress } from '@/lib/useScrollProgress';
import Reveal from './motion/Reveal';

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

/**
 * The one yellow section. On large screens it pins and the steps slide past
 * horizontally; the yellow panel opens out from an inset card as it arrives.
 */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollProgress(sectionRef, (p) => {
    const track = trackRef.current;
    if (!track) return;
    if (window.innerWidth < 1024) {
      track.style.transform = '';
      return;
    }
    const dist = track.scrollWidth - track.parentElement!.clientWidth;
    track.style.transform = `translate3d(${-dist * p}px,0,0)`;
  });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      panel,
      { clipPath: 'inset(6% 5% 6% 5% round 28px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'top top', scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="relative lg:h-[340vh]">
      <div
        ref={panelRef}
        className="relative overflow-hidden bg-titanix-yellow text-black lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-20 sm:px-8 lg:pt-16">
          <div className="flex items-center gap-4 border-t border-black/20 pt-4 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span>(05)</span>
            <span className="text-black/60">Process</span>
          </div>
          <Reveal
            as="h2"
            id="process-title"
            className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          >
            How a project runs.
          </Reveal>
        </div>

        <div className="overflow-hidden pb-20 lg:pb-0">
          <div
            ref={trackRef}
            className="mx-auto flex max-w-7xl flex-col gap-0 px-5 will-change-transform sm:px-8 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:gap-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[8vw]"
          >
            {STEPS.map((s, i) => (
              <article
                key={s.title}
                className="flex flex-col justify-between border-t border-black/20 py-8 lg:h-[46svh] lg:w-[34rem] lg:border lg:border-black/15 lg:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="wide font-display text-7xl font-extrabold leading-none tracking-tight lg:text-[8rem]">
                    0{i + 1}
                  </span>
                  <span className="mt-2 rounded-md border border-black/30 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">
                    {s.time}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-3xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-md text-black/70">{s.text}</p>
                </div>
              </article>
            ))}
            <article className="flex flex-col justify-end gap-8 border-t border-black/20 py-8 lg:h-[46svh] lg:w-[30rem] lg:border-0 lg:bg-black lg:p-8 lg:text-titanix-text">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">Two ways to work with us</p>
              {MODELS.map((m) => (
                <div key={m.title}>
                  <h3 className="font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-1.5 text-sm opacity-70">{m.text}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
