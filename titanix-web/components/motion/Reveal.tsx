'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, prefersReducedMotion, REVEAL, REVEAL_START, SplitText } from '@/lib/motion';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Split into chars instead of lines (for display type). */
  chars?: boolean;
  /** Play immediately (above the fold) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * The site's single text reveal: lines (or chars) rise out of a mask.
 * Text is hidden with `[data-reveal]` until split, so it never flashes.
 */
export default function Reveal({ as: Tag = 'div', children, className, id, chars, immediate, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { visibility: 'visible' });
      return;
    }
    let split: SplitText | undefined;
    document.fonts.ready.then(() => {
      if (!ref.current) return;
      split = SplitText.create(el, {
        type: chars ? 'lines,chars' : 'lines',
        mask: 'lines',
        autoSplit: true,
        // Char splits need the aria-label so screen readers read words, and only
        // headings may carry one. Line splits read fine as they are.
        aria: chars ? 'auto' : 'none',
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.from(chars ? self.chars : self.lines, {
            ...REVEAL,
            stagger: chars ? 0.022 : REVEAL.stagger,
            delay,
            ...(immediate ? {} : { scrollTrigger: { trigger: el, start: REVEAL_START, once: true } }),
          });
        },
      });
    });
    return () => split?.revert();
  }, [chars, immediate, delay]);

  return (
    <Tag ref={ref} id={id} className={className} style={style} data-reveal="">
      {children}
    </Tag>
  );
}
