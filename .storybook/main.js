

module.exports = {
  stories: [
    './stories/**/[^.ignore]*.stories.@(tsx|mdx)',
    '../packages/**/stories/[^.ignore]*.stories.@(tsx|mdx)'
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
