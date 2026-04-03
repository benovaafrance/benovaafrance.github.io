/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#722626',
        accent: '#C5A880',
        cream: '#FDFBF7',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        'text-secondary': '#78716C',
        border: '#E5E0D8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
