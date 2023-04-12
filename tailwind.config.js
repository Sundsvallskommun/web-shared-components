const path = require('path');
const fs = require('fs');
/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");
/* eslint @typescript-eslint/no-var-requires: "off" */
module.exports = {
  content: [
    // './public/**/*.html',
    // './packages/*/src/**/*.{js,jsx,ts,tsx}',
    // './packages/*/stories/**/*.{js,jsx,ts,tsx,mdx}',
    './.storybook/**/*.{js,jsx,ts,tsx,mdx}',
    path.join(fs.realpathSync('./node_modules/@sk-web-gui'), '/*/dist/**/*.{js,jsx}'),
    path.join(fs.realpathSync('./node_modules/@sk-web-gui/core/src/'), '**/*.{js,jsx}'),
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
