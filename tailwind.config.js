/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  colors: {
      'primary-orange': {
        50: '#CE2F00',
      },
      'primary-green': {
        50: '#398900',
      },
      'neutral-black': {
        100: '#22343D',
        300:"#173A56",
      },

    },},
  },
  plugins:[],
};
