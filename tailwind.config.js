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
        primary: '#2E4193',
        second: '#6CBDC7',
        light: '#DDDDDD',
        error: '#D32D49',
        mud: '#FFF1D8',
        gray: '#DDDDDD',
        sky: '#E0F9FF',
        warningInput: '#FFE0E0',
        grayLight: '#A4A3A3',
        lightOrange: '#FEF6E7',
        gray300: '#808080',
      },
      boxShadow: {
        ml: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        xml: '0 1px 12px 0 rgba(0, 0, 0, 0.38)',
      },
      fontSize: {
        xsm: '13px',
        1.2: '12px',
      },
      height: {
        50: '50px',
      },
    },
  },
  plugins: [],
};
