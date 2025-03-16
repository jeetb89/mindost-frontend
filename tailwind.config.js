/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        breathe: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'breathe': 'breathe 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} 