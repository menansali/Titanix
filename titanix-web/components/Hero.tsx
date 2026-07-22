'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { MARK_SHAPES } from './Logo';
import { STATS } from '@/lib/data';

function AnimatedMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {MARK_SHAPES.map((s, i) => (
        <motion.polygon
          key={i}
          points={s.points}
          fill={s.fill}
          initial={{ opacity: 0, x: 24, y: -24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      ))}
    </svg>
  );
}

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 * i, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28">
      <div className="section w-full min-w-0 !py-0">
        {/* Floating prism */}
        <motion.div
          className="pointer-events-none absolute right-4 top-24 hidden opacity-90 lg:block xl:right-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="animate-floaty drop-shadow-[0_0_60px_rgba(239,226,0,0.35)]">
            <AnimatedMark size={240} />
          </div>
        </motion.div>

        <div className="relative z-10 w-full min-w-0 max-w-3xl">
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <span className="eyebrow">
              <Flame size={13} className="text-titanix-glow" />
              Product studio · Est. 2021
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-6xl md:text-7xl"
          >
            We forge{' '}
            <span className="text-gradient">iOS apps</span>,{' '}
            <span className="text-gradient">SaaS</span> &amp;{' '}
            <span className="text-gradient">IoT</span> that ship.
          </motion.h1>

          <motion.p
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-base leading-relaxed text-titanix-muted sm:mt-7 sm:text-lg"
          >
            Titanix is a product studio turning bold ideas into real, shipped
            software — from native iOS experiences and scalable SaaS platforms
            to smart IoT systems that reach from bare metal to the cloud.
          </motion.p>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a href="#contact" className="btn-primary group w-full sm:w-auto">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className="btn-ghost w-full sm:w-auto">
              See the work
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fade}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:mt-16 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-titanix-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
