/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        gold: '#FFD700',
        'royal-purple': '#663399',
        'luxury-black': '#1a1a2e'
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }
    },
  },
  plugins: [],
  darkMode: ['class'],
}