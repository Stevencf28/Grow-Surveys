/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        5: '5px',
        10: '10px',
        15: '15px',
        20: '20px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
