import { preset } from '@sk-web-gui/core';

export default {
  presets: [preset()],
  content: [
    './packages/*/src/**/*.{ts,tsx,js}',
    './packages/*/stories/**/*.{tsx,mdx}',
    './.storybook/*.{tsx,mdx,scss}',
    './.storybook/stories/*.{tsx,mdx}',
    './.storybook/components/*.{tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  // plugins: [require('@tailwindcss/forms'), require('./packages/core/src/plugin')],
};
