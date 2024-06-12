/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
    
      screens: {
        'xs': '480px',
      
      },
    
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
    
  },
  plugins: [require('tailwindcss-animate')],
} };