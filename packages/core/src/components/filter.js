module.exports = Filter = () => ({
  '.sk-filter': {
    '@apply w-full': {},

    '&-label': {
      '@apply text-label-medium': {},
    },

    '.sk-form-checkbox-label': {
      '@apply grow flex items-center justify-between': {},
      '&-wrapper': {
        '@apply w-full': {},
      },
    },
  },
});
