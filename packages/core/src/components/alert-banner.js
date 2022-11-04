module.exports = Modal = () => ({
  '.alert-banner': {
    '@apply p-md': {},

    '&-content': {
      '@apply w-full m-auto flex': {},

      '&-wrapper': {
        '@apply flex-grow flex': {},
      },
    },

    '&-icon': {
      '@apply mr-[10px]': {},
    },

    '&-message': {
      '@apply underline inline-block max-w-[800px] text-body text-base': {},
    },

    '&-close': {
      '@apply p-4 -m-4 inline-flex': {},
    },
  },
});
