/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        SoccerLeague: ['SoccerLeague'],
      },

      backgroundImage: {
        'hero-pattern': "url('../public/football.jpeg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
}
