module.exports = {
  content: [
    './packages/*/src/**/*.{ts,tsx}',
    './packages/*/stories/**/*.{tsx,mdx}',
    './.storybook/*.{tsx,mdx}',
    './.storybook/stories/*.{tsx,mdx}',
    './.storybook/components/*.{tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('./packages/core')],
};
