'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';

/** Full-bleed TITANIX set as the footer's last line; letters rise out of the baseline as you arrive. */
export default function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-letter]', {
        yPercent: 100,
        ease: 'none',
        stagger: { each: 0.08, from: 'center' },
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden">
      <div className="wide flex select-none justify-between font-display text-[19.5vw] font-extrabold uppercase leading-[0.78] tracking-[-0.04em]">
        {'Titanix'.split('').map((c, i) => (
          <span key={i} data-letter className={`block pt-[0.04em] ${i === 6 ? 'text-titanix-yellow' : ''}`}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
