/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-app-bg': "url('./assets/bg-nature-flower.jpg')",
      },
      keyframes: {
        'spin-90': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(90deg)' },
        },
      },
      animation: {
        'spin-fast': 'spin-90 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}

