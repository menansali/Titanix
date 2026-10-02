'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/lib/motion';

/**
 * Oversized ticker that runs on its own, speeds up and leans with scroll
 * velocity, and flips direction with the scroll direction.
 */
export default function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const loop = gsap.to(el, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
    // Start deep into the repeats so a negative timeScale can run backwards forever.
    loop.totalTime(loop.duration() * 1000);
    const skew = gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3' });
    let dir = 1;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const v = self.getVelocity();
        if (self.direction !== dir) dir = self.direction;
        gsap.to(loop, { timeScale: dir * (1 + Math.min(6, Math.abs(v) / 300)), duration: 0.25, overwrite: true });
        skew(gsap.utils.clamp(-10, 10, -v / 180));
      },
      onToggle(self) {
        if (self.isActive) loop.play();
        else loop.pause();
      },
    });
    // Settle back to cruising speed once scrolling stops.
    const settle = () => {
      gsap.to(loop, { timeScale: dir, duration: 0.8 });
      skew(0);
    };
    ScrollTrigger.addEventListener('scrollEnd', settle);

    return () => {
      ScrollTrigger.removeEventListener('scrollEnd', settle);
      st.kill();
      loop.kill();
    };
  }, []);

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={t} className="flex items-center">
          <span className={`wide px-[0.35em] uppercase ${i % 2 ? 'text-outline' : 'text-titanix-text'}`}>{t}</span>
          <svg viewBox="0 0 10 10" className="h-[0.32em] w-[0.32em] shrink-0 fill-titanix-yellow" aria-hidden="true">
            <rect width="10" height="10" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-titanix-border py-6 sm:py-8">
      <div ref={track} className="flex w-max font-display text-[13vw] font-extrabold leading-none tracking-tight sm:text-[9vw]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
