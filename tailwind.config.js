/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red': {
          50: '#ffe3e3',
          100: '#ffbdbd',
          200: '#ff9b9b',
          300: '#f86a6a',
          400: '#ff7a93',
          500: '#fc6c87',
          600: '#FF365B',
          700: '#e83638',
          800: '#c81e1e',
          900: '#a71d1d',
        }
      },
      maxWidth: {
        'xxs': '16rem',
        '150-px': '150px',
      },
      height: {
        '500-px' : '500px',
        '70-px' : '70px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
