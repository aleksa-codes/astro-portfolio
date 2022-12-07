/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],

  theme: {
    extend: {
      future: {
        hoverOnlyWhenSupported: true
      },
      screens: {
        xs: '480px'
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        },
        fade: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        },
        scale: {
          '0%': { scale: 0 },
          '70%': { scale: 0 },
          '100%': { scale: 1 }
        },
        boxshadow: {
          '0%, 100%': { 'box-shadow': '#463aa1 0px -1rem 0px inset' },
          '50%': { 'box-shadow': '#463aa1 0px -2.25rem 0px inset' }
        },
        winterboxshadow: {
          '0%, 100%': { 'box-shadow': '#c7d2fe 0px -1rem 0px inset' },
          '50%': { 'box-shadow': '#c7d2fe 0px -2.25rem 0px inset' }
        }
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.61, 1, 0.88, 1)'
      },
      animation: {
        'waving-hand': 'scale 2.75s ease-in-out, wave 2.5s linear infinite 2s',
        'content-fade': 'fade 0.4s ease',
        'box-shadow': 'boxshadow 2s ease-in-out 2s',
        'winter-box-shadow': 'winterboxshadow 2s ease-in-out 2s'
      },
      backgroundImage: {
        laptop: "url('/assets/laptop-animate.svg')"
      }
    }
  },
  daisyui: {
    themes: ['night', 'winter']
  },
  darkMode: ['class', '[data-theme="winter"]']
};
