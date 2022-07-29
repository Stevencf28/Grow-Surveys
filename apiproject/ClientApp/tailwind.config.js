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
        20: '20px',
        25: '25px',
        30: '30px',
        35: '35px',
        40: '40px',
        45: '45px',
        50: '50px',
        outlet: 'calc(100vh - 64px)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
