/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f',
          800: '#112240',
          700: '#1a2d4d',
          600: '#233554',
          500: '#2d4a6e',
        },
        teal: {
          400: '#64ffda',
          500: '#45e0c0',
        },
        slate: {
          100: '#ccd6f6',
          200: '#a8b2d1',
          300: '#8892b0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 9s ease-in-out infinite',
        'dot-pulse': 'dotPulse 4s ease-in-out infinite',
        'particle-rise': 'particleRise 8s ease-in-out infinite',
        'wave': 'waveShift 6s ease-in-out infinite',
        'wave-slow': 'waveShift 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.1' },
        },
        particleRise: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.25' },
          '25%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.4' },
          '50%': { transform: 'translateY(-40px) translateX(-5px)', opacity: '0.15' },
          '75%': { transform: 'translateY(-60px) translateX(5px)', opacity: '0.3' },
        },
        waveShift: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5%)' },
        },
      },
    },
  },
  plugins: [],
}
