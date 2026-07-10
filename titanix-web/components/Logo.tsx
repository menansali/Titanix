import React from 'react';

interface LogoProps {
  size?: number;
  showWord?: boolean;
  className?: string;
}

/**
 * Titanix mark — a modern, vectorized "T" monogram. Built from a rounded
 * crossbar and stem with a subtle two-tone fold down the stem, so the letter
 * reads as a faceted, engineered form rather than a flat glyph. Rendered in the
 * brand violet→indigo gradient; no container, so it sits cleanly on any surface.
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-lit`} x1="6" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="24" y1="10" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D28D9" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <clipPath id={`${id}-stem`}>
          <rect x="20" y="8" width="8" height="32" rx="4" />
        </clipPath>
      </defs>

      {/* Stem (lit face) */}
      <rect x="20" y="8" width="8" height="32" rx="4" fill={`url(#${id}-lit)`} />
      {/* Stem fold (shadow face), clipped to the stem */}
      <rect x="24" y="8" width="4" height="32" fill={`url(#${id}-fold)`} clipPath={`url(#${id}-stem)`} />
      {/* Crossbar */}
      <rect x="6" y="8" width="36" height="8" rx="4" fill={`url(#${id}-lit)`} />
    </svg>
  );
}

/**
 * Alternate: standalone three descending chevrons (no tile). Kept for A/B —
 * set `ActiveMark = LogoChevron` to use it.
 */
export function LogoChevron({ size = 36 }: { size?: number }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-c`} x1="8" y1="12" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <g strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M10 14 L19 22.5 L28 14" stroke={`url(#${id}-c)`} />
        <path d="M14 20 L23 28.5 L32 20" stroke="#E9E4FF" />
        <path d="M18 26 L27 34.5 L36 26" stroke={`url(#${id}-c)`} />
      </g>
    </svg>
  );
}

// Active mark used across the site. Swap to `LogoChevron` for the alternate.
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
