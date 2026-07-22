'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  /** Max tilt in degrees. */
  max?: number;
  className?: string;
}

/**
 * Subtle 3D tilt following the cursor, springing flat on leave. Touch devices
 * never fire mouse-move, so cards stay flat there.
 */
export default function TiltCard({ children, max = 5, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20, mass: 0.8 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20, mass: 0.8 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max * 2);
    ry.set(px * max * 2);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
