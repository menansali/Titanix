import React from 'react';

interface LogoProps {
  size?: number;
  showWord?: boolean;
  className?: string;
}

export const BRAND_YELLOW = '#EFE200';
export const BRAND_WHITE = '#FFFFFF';

/**
 * The real Titanix mark — four chevron strokes traced from the original logo
 * artwork (see /public/logo.png), alternating white and brand yellow. Points
 * live in a 0–100 viewBox so the mark scales cleanly anywhere.
 */
export const MARK_SHAPES: { points: string; fill: string }[] = [
  { points: '7.1,11.4 29.7,23 29.7,35.3 6.9,22.8', fill: BRAND_WHITE },
  { points: '93.1,7.1 93.4,16.9 29.6,53.9 7.1,41.2 7.1,30.6 30,42.6', fill: BRAND_YELLOW },
  { points: '93.3,30.2 93.5,41.5 29.5,78.4 7,65.7 7,54.3 30.1,66.7', fill: BRAND_WHITE },
  { points: '93.1,55.4 93.1,68.3 50.8,92.8 40.5,86.1', fill: BRAND_YELLOW },
];

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {MARK_SHAPES.map((s, i) => (
        <polygon key={i} points={s.points} fill={s.fill} />
      ))}
    </svg>
  );
}

// Active mark used across the site.
export const ActiveMark = LogoMark;

export default function Logo({ size = 36, showWord = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ActiveMark size={size} />
      {showWord && (
        <span className="font-display text-xl font-bold tracking-tight text-titanix-text">
          Titanix
        </span>
      )}
    </div>
  );
}
