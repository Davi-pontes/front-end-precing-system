/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          colorBgPattern: 'rgb(128, 149, 199)',
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
    },
  },
  plugins: [],
}

