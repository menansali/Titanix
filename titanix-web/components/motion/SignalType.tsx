'use client';

import { useEffect, useRef } from 'react';
import { field } from '@/lib/signal';

const WIDE = 125; // Archivo's widest cut, the headline's resting width
const DIP = 40; // how far a letter narrows at full signal

/**
 * The hero headline, set letter by letter so the signal can pass through it:
 * each letter narrows (Archivo's width axis) as the transmitter's coverage and
 * rings reach it, using the same position, clock and ring maths as the shader
 * behind it. Markup and entrance are plain HTML + CSS (`.rise`), so it still
 * paints before JavaScript; this only adds the response afterwards. Mouse
 * only, off under reduced motion and when the shader isn't running.
 */
export default function SignalType({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h = ref.current;
    if (!h) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;

    const letters = Array.from(h.querySelectorAll<HTMLElement>('[data-l]'));
    const width = new Float32Array(letters.length).fill(WIDE);
    const cx = new Float32Array(letters.length);
    const cy = new Float32Array(letters.length);
    let raf = 0;
    let onScreen = false;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!field.live) return;
      // Read every position first, then write, so layout runs once a frame.
      for (let i = 0; i < letters.length; i++) {
        const r = letters[i].getBoundingClientRect();
        cx[i] = r.left + r.width / 2;
        cy[i] = r.top + r.height / 2;
      }
      const vh = window.innerHeight;
      // The transmitter idles at 0.25 when the pointer is away; only a live one moves type.
      const s = Math.min(1, Math.max(0, (field.signal - 0.3) / 0.7));
      for (let i = 0; i < letters.length; i++) {
        const d = Math.hypot(cx[i] - field.x, cy[i] - field.y) / vh;
        const cover = Math.exp(-d * d * 18);
        const ring = Math.pow(0.5 + 0.5 * Math.sin(d * 42 - field.time * 2.2), 3) * Math.exp(-d * 3.2);
        const k = Math.min(1, cover * 0.6 + ring * 0.7) * s;
        const w = WIDE - DIP * k;
        if (Math.abs(w - width[i]) > 0.15) {
          width[i] = w;
          letters[i].style.fontVariationSettings = `'wdth' ${w.toFixed(1)}`;
        }
      }
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting === onScreen) return;
      onScreen = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (onScreen) raf = requestAnimationFrame(frame);
    });
    io.observe(h);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      for (const l of letters) l.style.fontVariationSettings = '';
    };
  }, []);

  const last = lines.length - 1;
  return (
    <h1 ref={ref} aria-label={`${lines.join(' ')}.`} className={className}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
          <span className="rise" style={{ animationDelay: `${0.08 + i * 0.09}s` }}>
            {line.split(' ').map((word, w) => (
              <span key={w}>
                {w > 0 && ' '}
                <span className="whitespace-nowrap">
                  {Array.from(word).map((ch, c) => (
                    <span key={c} data-l="">
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
            {i === last && (
              <span data-l="" className="text-titanix-yellow">
                .
              </span>
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}
