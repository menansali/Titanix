'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export { gsap, ScrollTrigger, SplitText };

/** The one reveal recipe used across the site: masked lines rise in. */
export const REVEAL = { yPercent: 110, duration: 1.15, ease: 'expo.out', stagger: 0.08 } as const;
export const REVEAL_START = 'top 85%';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The Lenis instance (set by SmoothScroll) so links can scroll smoothly.
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

/** Smooth-scroll to an in-page hash like "#work". Returns false if not handled. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return false;
  if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', hash);
  return true;
}
