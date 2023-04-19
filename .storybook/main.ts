import type { StorybookConfig } from '@storybook/react-vite';
// import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(tsx|mdx)', '../packages/*/stories/*.stories.@(tsx|mdx)'],
  addons: [
    // '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    // 'storybook-addon-performance',
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     mdxPluginOptions: {
    //       mdxCompileOptions: {
    //         remarkPlugins: [remarkGfm],
    //       },
    //     },
    //   },
    // },
    // '@storybook/addon-styling',
    // {
    //   name: '@storybook/addon-styling',
    //   options: {
    //     postCss: {
    //       implementation: require('postcss'),
    //     },
    //     // sass: {
    //     //   implementation: require('sass'),
    //     // },
    //   },
    // },
  ],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  docs: {
    defaultName: 'Dokumentation', // set to change the name of generated docs entries
  },
  // async viteFinal(config, { configType }) {
  //   // Be sure to return the customized config
  //   return mergeConfig(config, {
  //     // Customize the Vite config for Storybook
  //   });
  // },
};
export default config;
