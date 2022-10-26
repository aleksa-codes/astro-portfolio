/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,svelte,vue,js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  theme: {
    extend: {
      future: {
        hoverOnlyWhenSupported: true
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
          '0%, 100%': { box-hadow: '0px -0.5rem 0px inset inherit' },
          '50%': { boxShadow: '0px 0px 0px -1rem inset inherit' }
        }
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.61, 1, 0.88, 1)'
      },
      animation: {
        'waving-hand': 'scale 3s ease-in-out, wave 2.5s linear infinite 2s',
        'content-fade': 'fade 0.4s ease',
        'box-shadow': 'boxshadow 1.5s ease-in-out'
      },
      backgroundImage: {
        laptop: "url('/laptop-animate.svg')"
      }
    }
  },
  daisyui: {
    themes: ['night', 'winter']
  }
};
