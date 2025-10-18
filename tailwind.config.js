/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg3-gold': '#d4af37',
        'bg3-dark': '#1a1a1a',
        'bg3-darker': '#0f0f0f',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

