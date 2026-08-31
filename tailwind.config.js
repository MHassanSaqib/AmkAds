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
          black:      '#0D0D0D',
          white:      '#FFFFFF',
          orange:     '#F5821F',
          orangeHover:'#D9701A',
          greyLight:  '#F7F7F8',
          greyDark:   '#B3B3B3',
          greyMedium: '#4D4D4D',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter:  ['var(--font-inter)',  'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
        'orange-glow':      'radial-gradient(ellipse at center, rgba(245,130,31,0.15) 0%, transparent 70%)',
        'card-gradient':    'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(13,13,13,0.9) 100%)',
        'card-light':       'linear-gradient(135deg, #FFFFFF 0%, #F7F7F8 100%)',
        'orange-gradient':  'linear-gradient(135deg, #F5821F 0%, #D9701A 100%)',
        'section-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,130,31,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(245,130,31,0.6)' },
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
        'glow-orange': '0 0 30px rgba(245,130,31,0.3)',
        'card':       '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(245,130,31,0.2)',
      },
    },
  },
  plugins: [],
}
