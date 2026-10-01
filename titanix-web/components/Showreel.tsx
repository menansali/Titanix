'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { PROJECTS } from '@/lib/data';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { MARK_SHAPES } from './Logo';

// iOS apps with screenshots, in portfolio order.
const APPS = PROJECTS.filter((p) => p.screenshots?.length && p.caseStudy);
const N = APPS.length;

// Phone body: stacked slabs fake the edge thickness in CSS 3D.
const DEPTH = 16; // px
const SLABS = 12;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Scroll: dwell on each app, then spin a full turn to the next. The screen
  // swaps while the back faces the viewer, so the change is never seen.
  useScrollProgress(sectionRef, (p) => {
    const f = clamp(p * N - 0.5, 0, N - 1);
    const idx = Math.min(Math.floor(f), N - 1);
    const spin = idx === N - 1 ? 0 : smooth(clamp((f - idx - 0.55) / 0.45));
    const next = spin >= 0.5 ? idx + 1 : idx;

    if (phoneRef.current) {
      const turn = reduced.current ? 0 : (idx + spin) * 360;
      phoneRef.current.style.transform = `rotateX(8deg) rotateY(${turn - 16}deg)`;
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  // Cursor tilt on top of the scroll rotation (pointer devices only).
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || reduced.current || !window.matchMedia('(pointer: fine)').matches) return;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    const onMove = (e: PointerEvent) => {
      rx(((e.clientY / window.innerHeight) - 0.5) * -14);
      ry(((e.clientX / window.innerWidth) - 0.5) * 18);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const app = APPS[active];

  return (
    <section
      ref={sectionRef}
      id="showreel"
      aria-label="Our apps"
      className="relative"
      style={{ height: `${N * 90 + 30}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="section grid w-full items-center gap-6 !pb-0 !pt-16 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:!pt-0">
          {/* Copy */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="eyebrow">Live on the App Store</span>
            <div className="relative mt-5 min-h-[13rem] sm:min-h-[15rem]">
              {APPS.map((a, i) => (
                <div
                  key={a.slug}
                  aria-hidden={i !== active}
                  className={`absolute inset-x-0 top-0 transition-all duration-500 ease-out ${
                    i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <div className="flex items-center justify-center gap-4 lg:justify-start">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[0.9rem] border border-titanix-border sm:h-14 sm:w-14">
                      <Image src={a.icon!} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium uppercase tracking-wider text-titanix-glow">{a.category}</p>
                      <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{a.title}</h3>
                    </div>
                  </div>
                  <p className="mx-auto mt-5 max-w-md font-display text-xl font-semibold leading-snug text-titanix-text [text-wrap:balance] sm:text-2xl lg:mx-0">
                    {a.caseStudy!.tagline}
                  </p>
                  <Link
                    href={`/work/${a.slug}`}
                    tabIndex={i === active ? 0 : -1}
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-titanix-glow hover:underline ${
                      i === active ? '' : 'pointer-events-none'
                    }`}
                  >
                    Read the case study <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mx-auto mt-2 flex max-w-xs items-center gap-3 lg:mx-0" aria-hidden="true">
              <span className="font-mono text-xs text-titanix-faint">
                0{active + 1} / 0{N}
              </span>
              <div className="h-px flex-1 overflow-hidden bg-titanix-border">
                <div ref={barRef} className="h-full origin-left scale-x-0 bg-brand-gradient" />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="order-1 flex justify-center lg:order-2" style={{ perspective: '1600px' }} aria-hidden="true">
            <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
              <div
                ref={phoneRef}
                className="relative h-[44svh] max-h-[640px] min-h-[300px] w-auto lg:h-[64svh]"
                style={{
                  aspectRatio: '9 / 19.2',
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(8deg) rotateY(-16deg)',
                  willChange: 'transform',
                }}
              >
                {/* Edge slabs */}
                {Array.from({ length: SLABS }, (_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-[14%/6.6%]"
                    style={{
                      transform: `translateZ(${(i / (SLABS - 1) - 0.5) * DEPTH}px)`,
                      background: 'linear-gradient(90deg, #3a3a34, #8d8d84 18%, #5c5c55 50%, #a3a39a 82%, #3a3a34)',
                    }}
                  />
                ))}

                {/* Front: bezel + screen */}
                <div
                  className="absolute inset-0 rounded-[14%/6.6%] bg-black p-[3.2%] shadow-[0_40px_120px_-30px_rgba(239,226,0,0.45)]"
                  style={{ transform: `translateZ(${DEPTH / 2 + 0.5}px)`, backfaceVisibility: 'hidden' }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.4%] bg-titanix-deep">
                    {APPS.map((a, i) => (
                      <Image
                        key={a.slug}
                        src={a.screenshots![0]}
                        alt=""
                        fill
                        sizes="280px"
                        priority={i === 0}
                        className={`object-cover transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                    {/* Dynamic Island + glass sheen */}
                    <div className="absolute left-1/2 top-[1.6%] h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent" />
                  </div>
                </div>

                {/* Back: titanium glass, camera, Titanix mark */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[14%/6.6%]"
                  style={{
                    transform: `rotateY(180deg) translateZ(${DEPTH / 2 + 0.5}px)`,
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(145deg, #2b2b26 0%, #1a1a16 55%, #2f2f29 100%)',
                  }}
                >
                  <div className="absolute left-[7%] top-[3.5%] grid h-[19%] w-[42%] grid-cols-2 gap-[8%] rounded-[22%] bg-white/[0.06] p-[7%] shadow-inner">
                    {[0, 1, 2].map((k) => (
                      <span key={k} className="aspect-square rounded-full bg-black ring-[3px] ring-white/10" />
                    ))}
                  </div>
                  <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2 opacity-90">
                    {MARK_SHAPES.map((s, k) => (
                      <polygon key={k} points={s.points} fill={s.fill} />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
