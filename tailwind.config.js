/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // This correctly identifies all your JS/JSX files
  ],
  theme: {
    extend: {
      colors: {
        'ontario-blue': '#0066CC',
        'ontario-yellow': '#f7f8d0',
        'ontario-black': '#232a2f',
      },
    },
  },
  plugins: [],
}