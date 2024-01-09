import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(tsx|mdx)', '../packages/*/stories/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', 'storybook-dark-mode'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    skipBabel: true,
    check: false,
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  staticDirs: ['./public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Dokumentation', // set to change the name of generated docs entries
  },
};
export default config;
