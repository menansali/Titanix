import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Titanix rebrand — violet + indigo on deep violet-black
        titanix: {
          void: '#0B0A14',   // primary background
          deep: '#100E1D',    // slightly raised surfaces
          panel: 'rgba(23, 21, 40, 0.6)', // glass panels
          border: 'rgba(139, 122, 255, 0.14)',
          violet: '#7C3AED',
          indigo: '#6366F1',
          glow: '#8B5CF6',
          cyan: '#22D3EE',    // rare secondary spark
          text: '#FAFAFA',
          muted: '#A1A1AA',
          faint: '#6B6B78',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #7C3AED 0%, #6366F1 55%, #8B5CF6 100%)',
        'brand-text': 'linear-gradient(120deg, #C4B5FD 0%, #A78BFA 40%, #818CF8 100%)',
        'void-fade': 'radial-gradient(120% 120% at 50% 0%, #1A1533 0%, #0B0A14 60%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(124, 58, 237, 0.45)',
        'glow-lg': '0 0 80px -12px rgba(124, 58, 237, 0.55), 0 0 32px -8px rgba(99, 102, 241, 0.4)',
        glass: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-24px) rotate(6deg)' },
        },
        blob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-60px) scale(1.12)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.9)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        gridpulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        'floaty-slow': 'floaty 12s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        gridpulse: 'gridpulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
