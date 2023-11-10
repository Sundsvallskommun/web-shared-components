module.exports = {
  presets: [require('./packages/core/src/preset')], // with support for custom-scrollbar
  content: [
    './packages/*/src/**/*.{ts,tsx,js}',
    './packages/*/stories/**/*.{tsx,mdx}',
    './.storybook/*.{tsx,mdx}',
    './.storybook/stories/*.{tsx,mdx}',
    './.storybook/components/*.{tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  // plugins: [require('@tailwindcss/forms'), require('./packages/core/src/plugin')],
};
