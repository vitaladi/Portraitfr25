/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#dc7835", // Orange
        secondary: "#1a1a1a", // Noir profond
      },
    },
  },
  plugins: [],
};
