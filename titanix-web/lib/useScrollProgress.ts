'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Calls `onProgress` with 0→1 while `ref`'s element scrolls from its top
 * hitting the viewport top to its bottom hitting the viewport bottom — the
 * range during which a `sticky top-0 h-[100svh]` child stays pinned.
 * The callback runs every scroll frame, so drive DOM through refs, not state.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress: (p: number) => void) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => cb.current(self.progress),
      onRefresh: (self) => cb.current(self.progress),
    });
    return () => st.kill();
  }, [ref]);
}
