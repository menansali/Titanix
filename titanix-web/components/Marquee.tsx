'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECH_MARQUEE } from '@/lib/data';

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const row = [...TECH_MARQUEE, ...TECH_MARQUEE];

  // GSAP-driven marquee: cruises at a base speed and accelerates with scroll
  // velocity, easing back down when scrolling stops.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Fall back to the slow CSS keyframe animation.
      track.classList.add('animate-marquee');
      return;
    }

    const BASE_SPEED = 55; // px per second
    let pos = 0;
    let boost = 0;
    let lastY = window.scrollY;

    const tick = (_time: number, deltaTime: number) => {
      const dt = deltaTime / 1000;
      const yNow = window.scrollY;
      const velocity = Math.abs(yNow - lastY) / Math.max(dt, 0.001);
      lastY = yNow;

      // Chase the scroll velocity, then decay toward cruise speed.
      const target = gsap.utils.clamp(0, 600, velocity * 0.35);
      boost += (target - boost) * Math.min(1, dt * 4);

      const half = track.scrollWidth / 2;
      if (half > 0) {
        pos = (pos - (BASE_SPEED + boost) * dt) % half;
        gsap.set(track, { x: pos });
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-titanix-border/60 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r sm:w-32 from-titanix-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l sm:w-32 from-titanix-void to-transparent" />
      <div ref={trackRef} className="flex w-max gap-4">
        {row.map((tech, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-titanix-border bg-white/[0.02] px-5 py-2 text-sm font-medium text-titanix-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
