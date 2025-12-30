/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titanix: {
          yellow: '#FACC15', // Yellow-400
          dark: '#09090b',    // Zinc-950
          card: '#18181b',    // Zinc-900
          text: '#fafafa',    // Zinc-50
          muted: '#a1a1aa',   // Zinc-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'scroll': 'scroll 40s linear infinite',
        'scroll-reverse': 'scrollReverse 40s linear infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    }
  },
  plugins: [],
}
