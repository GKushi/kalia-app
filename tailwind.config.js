/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors
      colors: {
        black: {
          DEFAULT: "#2F3648",
        },
        blue: {
          DEFAULT: "#B0B8DB",
        },
        success: {
          DEFAULT: "#31FF90",
        },
        danger: {
          DEFAULT: "#FF398C",
        },
        purple: {
          DEFAULT: "#CC1CCF",
        },
        white: {
          DEFAULT: "#FCFCFC",
        },
      },
    },
  },
  plugins: [],
};
