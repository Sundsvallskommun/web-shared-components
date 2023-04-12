import type { StorybookConfig } from '@storybook/react-webpack5';
import remarkGfm from 'remark-gfm';
import path from 'path';

const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(tsx|mdx)', '../packages/*/stories/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-addon-performance',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require('postcss'),
        },
        sass: {
          implementation: require('sass'),
        },
      },
    },
  ],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        lazyCompilation: true,
        fsCache: true,
      },
      fastRefresh: true,
    },
  },
  docs: {
    defaultName: 'Dokumentation', // set to change the name of generated docs entries
  },
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.(scss|css)$/,
  //     use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  //     include: path.join(__dirname, '../'),
  //   });
  //   config.module.rules.push({
  //     test: /\.(js|ts|jsx|tsx)$/,
  //     use: ['babel-loader'],
  //     include: path.join(__dirname, '../'),
  //     // include: path.join(__dirname, require('fs').realpathSync('./node_modules/@sk-web-gui/'), '**/*.{js,jsx,ts,tsx}'),
  //   });
  //   return config;
  // },
};
export default config;
