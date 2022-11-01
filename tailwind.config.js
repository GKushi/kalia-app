/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
        gray: {
          DEFAULT: "#80838A",
        },
      },
    },
  },
  plugins: [],
};
