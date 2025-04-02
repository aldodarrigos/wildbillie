// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9B05",
        secondary: "#111111",
        tertiary: "#222222",
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
      },
      backgroundImage:{
        'primary-gradient': 'linear-gradient(to bottom, #FF9B05, #FF5005)',
        'primary-gradient-hover': 'linear-gradient(to bottom, #FF5005, #FF9B05)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};