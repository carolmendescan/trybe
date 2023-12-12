/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        defalt: 'url(\'/src/img/background.jpg\')',
      },
    },
  },
  plugins: [],
};
