import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2042 Theme
        bg: {
          dark: 'hsl(220 15% 7%)',
          darker: 'hsl(220 13% 4%)',
          card: 'hsl(220 12% 10%)',
        },
        border: {
          primary: 'hsl(220 10% 14%)',
          secondary: 'hsl(220 10% 20%)',
        },
        accent: {
          gold: 'hsl(36 72% 50%)',
          goldLight: 'hsl(36 72% 55%)',
          teal: 'hsl(166 100% 35%)',
          green: 'hsl(140 50% 35%)',
          orange: 'hsl(15 85% 45%)',
        },
        text: {
          primary: 'hsl(40 5% 70%)',
          secondary: 'hsl(40 4% 50%)',
          muted: 'hsl(40 4% 38%)',
        },
      },
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      spacing: {
        sidebar: '3.5rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
