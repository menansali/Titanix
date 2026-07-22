import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Titanix brand — logo yellow + white on near-black
        titanix: {
          void: '#0A0A08',   // primary background
          deep: '#12120C',    // slightly raised surfaces
          panel: 'rgba(26, 26, 18, 0.6)', // glass panels
          border: 'rgba(239, 226, 0, 0.14)',
          yellow: '#EFE200',  // primary accent, sampled from the logo
          gold: '#C7BC00',    // darker yellow for gradient depth
          glow: '#F6EB2E',    // lighter yellow highlight
          text: '#FAFAF5',
          muted: '#A8A89E',
          faint: '#6E6E64',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #F6EB2E 0%, #EFE200 55%, #C7BC00 100%)',
        'brand-text': 'linear-gradient(120deg, #FFF9A8 0%, #F6EB2E 40%, #EFE200 100%)',
        'void-fade': 'radial-gradient(120% 120% at 50% 0%, #1C1B0E 0%, #0A0A08 60%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(239, 226, 0, 0.35)',
        'glow-lg': '0 0 80px -12px rgba(239, 226, 0, 0.45), 0 0 32px -8px rgba(246, 235, 46, 0.3)',
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
