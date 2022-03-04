

module.exports = {
  stories: [
    './stories/**/*.stories.@(tsx|mdx)',
    '../packages/**/stories/*.stories.@(tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-a11y',
    'addon-screen-reader',
    '@storybook/addon-essentials',
    'storybook-addon-performance/register',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    reactDocgen: false,
  },
};
