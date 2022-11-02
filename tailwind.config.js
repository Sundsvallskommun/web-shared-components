// const colors = require("tailwindcss/colors");
/* eslint @typescript-eslint/no-var-requires: "off" */
module.exports = {
  mode: 'jit',
  content: [
    './public/**/*.html',
    './packages/*/**/*.{js,jsx,ts,tsx,vue,mdx}',
    './.storybook/stories/**/*.{js,jsx,ts,tsx,vue,mdx}',
    './.storybook/components/**/*.{js,jsx,ts,tsx,vue,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fixoverflow': {
          'from, to': {
            'overflow': 'hidden',
          }
        }
        
      },
      animation: {
        'fixit': 'fixoverflow 180ms backwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./packages/core')({
      colors: [],
      cssBase: true,
    }),
  ],
};
