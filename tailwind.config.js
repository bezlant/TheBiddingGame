/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fugaz: ['"Fugaz One"', 'cursive'],
        alfa: ['"Alfa Slab One"', 'cursive'],
        squada: ['"Squada One"', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('/football.png')",
      },
    },
  },
  plugins: [],
}
