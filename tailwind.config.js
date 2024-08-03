/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar-color': 'rgba(0,0,0,.25)',
        'search-bar': 'rgb(23,61,119)'
      },
      backgroundImage: theme => ({
        'button-gradient': 'linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%)',
      }),
    },

  },
  plugins: [],
}