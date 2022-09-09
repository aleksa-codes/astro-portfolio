/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,svelte,vue,js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: ['winter', 'night']
  }
};
