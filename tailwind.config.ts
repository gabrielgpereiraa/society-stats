import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        campo: {
          950: '#04080f',
          900: '#080f1c',
          800: '#0d1729',
          700: '#122035',
          600: '#1a2d4a',
          500: '#1e3a5f',
        },
        acento: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
          muted: '#10b98120',
        },
        gol: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          muted: '#f59e0b20',
        },
        alerta: {
          DEFAULT: '#ef4444',
          muted: '#ef444420',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'campo-gradient': 'linear-gradient(135deg, #04080f 0%, #0d1729 100%)',
        'card-gradient': 'linear-gradient(135deg, #0d1729 0%, #122035 100%)',
        'acento-gradient': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'gol-gradient': 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}

export default config
