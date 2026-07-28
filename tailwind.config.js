/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:      '#2563EB',
          blueDark:  '#1D4ED8',
          blueLight: '#3B82F6',
          amber:     '#F97316',
          amberDark: '#EA580C',
          navy:      '#0F172A',
          navyLight: '#1E293B',
          slate:     '#334155',
          muted:     '#64748B',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter:  ['var(--font-inter)',  'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'blue-glow':        'radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)',
        'card-gradient':    'linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)',
        'amber-gradient':   'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'blue-gradient':    'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        'section-gradient': 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      },
      animation: {
        'ticker':       'ticker 30s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'slide-up':     'slideUp 0.6s ease-out',
        'fade-in':      'fadeIn 0.8s ease-out',
        'spin-slow':    'spin 8s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37,99,235,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(37,99,235,0.6)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-blue':  '0 0 30px rgba(37,99,235,0.3)',
        'glow-amber': '0 0 30px rgba(249,115,22,0.3)',
        'card':       '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(37,99,235,0.2)',
      },
    },
  },
  plugins: [],
}
