'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';

/** Image frame that wipes open from the bottom, with the image settling in slow parallax. */
export default function RevealImage({ children, className = '' }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frame.current || !inner.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: frame.current, start: 'top 80%', once: true } },
      );
      gsap.fromTo(
        inner.current,
        { yPercent: -8, scale: 1.18 },
        { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
