export const Tabs = () => ({
  '.sk-tabs': {
    '@apply w-full': {},
    '&-panels': {
      '@apply p-8': {},
      '@apply mt-8': {},
    },

    '&-content': {
      '&:not([data-selected="true"])': {
        '@apply hidden': {},
      },
    },
  },
});
