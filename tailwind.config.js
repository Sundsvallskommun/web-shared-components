// const colors = require("tailwindcss/colors");
/* eslint @typescript-eslint/no-var-requires: "off" */
module.exports = {
  mode: 'jit',
  content: [
    './public/**/*.html',
    './packages/*/src/**/*.{js,jsx,ts,tsx}',
    './packages/*/stories/**/*.{js,jsx,ts,tsx,mdx}',
    './.storybook/stories/**/*.{js,jsx,ts,tsx,mdx}',
    './.storybook/components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./packages/core')({
      colors: [],
      cssBase: true,
    }),
  ],
};
