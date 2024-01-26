/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: 'glow 2s infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 3px #3b82f6, 0 0 6px #3b82f6, 0 0 9px #3b82f6, 0 0 12px #3b82f6' },
          '50%': { boxShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6, 0 0 20px #3b82f6' },
          '100%': { boxShadow: '0 0 3px #3b82f6, 0 0 6px #3b82f6, 0 0 9px #3b82f6, 0 0 12px #3b82f6' },
        },
      },
    },
  },
  plugins: [],
}

