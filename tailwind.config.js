/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#24609B",
          200: "#C4E2FE",
        },
        secondary: {
          DEFAULT: "#FABD00",
        },
        black: {
          DEFAULT: "#1A1A1A",
          100: "#666666",
          200: "#4D4D4D",
        },
      },
    },
  },
  plugins: [],
};
