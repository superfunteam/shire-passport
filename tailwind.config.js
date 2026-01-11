/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shire': {
          50: '#f0f5f0',
          100: '#d9e5d9',
          200: '#b3cbb3',
          300: '#8db18d',
          400: '#679767',
          500: '#4a6741',
          600: '#3d5535',
          700: '#2f4329',
          800: '#22311d',
          900: '#141f11',
        },
        'gold': {
          50: '#fdf9eb',
          100: '#f9f0cc',
          200: '#f3e199',
          300: '#edd266',
          400: '#e7c333',
          500: '#d4af37',
          600: '#b8922a',
          700: '#8c6f20',
          800: '#604c16',
          900: '#34290c',
        },
        'parchment': {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f0ebe0',
          300: '#e5dccb',
          400: '#d4c7af',
          500: '#c3b293',
        },
        'earth': {
          50: '#f7f4f0',
          100: '#ebe4da',
          200: '#d4c7b5',
          300: '#bdaa90',
          400: '#a68d6b',
          500: '#8b7355',
          600: '#5c4d3a',
          700: '#3d3326',
          800: '#1f1a13',
          900: '#0f0d09',
        },
        'mordor': {
          500: '#8b2323',
          600: '#6b1c1c',
          700: '#4b1414',
        }
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Crimson Text', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(31, 26, 19, 0.12), 0 1px 3px rgba(31, 26, 19, 0.08)',
        'card-hover': '0 4px 16px rgba(31, 26, 19, 0.16), 0 2px 6px rgba(31, 26, 19, 0.1)',
        'modal': '0 8px 32px rgba(31, 26, 19, 0.24), 0 4px 12px rgba(31, 26, 19, 0.12)',
        'button': '0 2px 4px rgba(31, 26, 19, 0.1)',
      },
      borderRadius: {
        'card': '1rem',
        'modal': '1.5rem',
        'button': '0.75rem',
      },
      animation: {
        'stamp': 'stamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shake': 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(1.5)', opacity: '0' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
