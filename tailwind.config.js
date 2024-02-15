/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        3: '3px',
      },
    },
    fontFamily: {
      body: ['Poppins'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'emerald',
      {
        geocachetrek: {
          primary: '#004F4A',
          secondary: '#854B48',
          accent: '#00c94f',
          neutral: '#004F4A',
          'base-100': '#f3f4f6',
          info: '#ccfbf1',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
};
