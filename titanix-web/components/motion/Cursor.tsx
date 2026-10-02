'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion';

/**
 * A small yellow dot that trails the pointer. Over anything with
 * `data-cursor="Label"` it opens into a disc with that label. Mouse only;
 * the native cursor is kept everywhere except over labelled targets.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      setLabel(t?.dataset.cursor ?? '');
    };
    const onLeave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      shown = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  const open = label !== '';
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none invisible fixed left-0 top-0 z-[100] opacity-0"
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-titanix-yellow font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-[width,height] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
          open ? 'h-[5.5rem] w-[5.5rem]' : 'h-2.5 w-2.5'
        }`}
      >
        <span className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      </div>
    </div>
  );
}
