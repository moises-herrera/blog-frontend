/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#2F2F2F',
        },
        accent: {
          500: '#FF5050',
          600: '#f53636',
        },
        secondary: {
          100: '#E0E0E0',
          200: '#D3D3D3',
          300: '#7B7B7B',
          400: '#C3C3C3',
        },
      },
    },
  },
  plugins: [],
};
