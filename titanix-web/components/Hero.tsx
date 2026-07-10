'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { ActiveMark } from './Logo';
import { STATS } from '@/lib/data';

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
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="section !py-0">
        {/* Floating prism */}
        <motion.div
          className="pointer-events-none absolute right-4 top-24 hidden opacity-90 lg:block xl:right-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="animate-floaty drop-shadow-[0_0_60px_rgba(124,58,237,0.5)]">
            <ActiveMark size={240} />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-3xl">
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
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
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
            className="mt-7 max-w-xl text-lg leading-relaxed text-titanix-muted"
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
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary group">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className="btn-ghost">
              See the work
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fade}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-16 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
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
