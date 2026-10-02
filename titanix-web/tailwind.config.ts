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
          border: 'rgba(250, 250, 245, 0.11)', // hairlines
          yellow: '#EFE200',  // primary accent, sampled from the logo
          gold: '#C7BC00',    // darker yellow
          glow: '#F6EB2E',    // lighter yellow highlight
          text: '#FAFAF5',
          muted: '#A8A89E',
          faint: '#6E6E64',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
