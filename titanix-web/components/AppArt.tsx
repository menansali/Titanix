import React from 'react';

/**
 * Generated, iOS-style app icons for apps without an exported AppIcon.
 * Each is a rounded-square gradient tile with a subtle top highlight and a
 * clean white symbol themed to the app — so it reads as a real app icon.
 */

type ArtName = 'lipstick' | 'visitly' | 'gymbuddy';

const GRADIENTS: Record<ArtName, [string, string]> = {
  lipstick: ['#F9A8D4', '#DB2777'], // beauty pink → magenta
  visitly: ['#38BDF8', '#4F46E5'], // sky → indigo (travel)
  gymbuddy: ['#FDBA74', '#EA580C'], // energetic orange (fitness)
};

function Symbol({ name }: { name: ArtName }) {
  switch (name) {
    case 'lipstick':
      return (
        <g fill="#ffffff">
          {/* bullet (angled tip) */}
          <path d="M21 20.5 L21 14.5 L28 10.5 L28 20.5 Z" />
          {/* collar */}
          <rect x="18.5" y="20" width="11" height="3" rx="1.3" />
          {/* tube */}
          <rect x="19.7" y="23" width="8.6" height="15" rx="2" opacity="0.9" />
        </g>
      );
    case 'visitly':
      return (
        <>
          {/* map pin */}
          <path
            d="M24 9.5 C18.2 9.5 14 13.7 14 19.4 C14 26.7 24 38 24 38 C24 38 34 26.7 34 19.4 C34 13.7 29.8 9.5 24 9.5 Z"
            fill="#ffffff"
          />
          {/* hole */}
          <circle cx="24" cy="19.2" r="4" fill="#3E6BE6" />
        </>
      );
    case 'gymbuddy':
      return (
        <g fill="#ffffff">
          {/* bar */}
          <rect x="14" y="22.4" width="20" height="3.2" rx="1.6" />
          {/* inner plates */}
          <rect x="11.5" y="18.5" width="3.6" height="11" rx="1.5" />
          <rect x="32.9" y="18.5" width="3.6" height="11" rx="1.5" />
          {/* outer plates */}
          <rect x="8.4" y="20.8" width="3" height="6.4" rx="1.3" />
          <rect x="36.6" y="20.8" width="3" height="6.4" rx="1.3" />
        </g>
      );
  }
}

export default function AppArt({ name, className = '' }: { name: ArtName; className?: string }) {
  const id = React.useId();
  const [from, to] = GRADIENTS[name];
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="24" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#${id}-bg)`} />
      <rect width="48" height="48" rx="11" fill={`url(#${id}-sheen)`} />
      <Symbol name={name} />
    </svg>
  );
}
