/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        pine: { 50: '#f1f6f2', 100: '#dceadf', 500: '#527b5d', 700: '#31573e', 900: '#183326' },
        ember: { 400: '#e69a5a', 500: '#c87838', 700: '#944b25' },
        parchment: '#f6f2e8'
      }
    }
  },
  plugins: []
}
