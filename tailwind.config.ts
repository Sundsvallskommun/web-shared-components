import preset from './packages/core/src/preset';

export default {
  presets: [preset()],
  content: [
    './packages/*/src/**/*.{ts,tsx}',
    './packages/*/stories/**/*.{tsx,mdx}',
    './.storybook/*.{tsx,mdx,scss}',
    './.storybook/stories/**/*.{tsx,mdx}',
    './.storybook/components/**/*.{tsx,mdx}',
  ],
  darkMode: 'selector', // or 'media' or 'class'
};
