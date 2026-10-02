'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, REVEAL_START } from '@/lib/motion';

/** Mono label that decodes from noise the first time it scrolls into view. */
export default function Scramble({ text, className, immediate, delay = 0 }: { text: string; className?: string; immediate?: boolean; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.to(el, {
      duration: Math.min(1.4, 0.35 + text.length * 0.03),
      delay,
      scrambleText: { text, chars: '01░▒/<>_', speed: 0.6, revealDelay: 0.15 },
      ...(immediate ? {} : { scrollTrigger: { trigger: el, start: REVEAL_START, once: true } }),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, immediate, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
