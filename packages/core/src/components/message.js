module.exports = Message = () => ({
  '.message': {
    '@apply max-w-2xl flex items-center font-bold text-sm sm:text-base px-6 py-6 m-2 shadow-lg w-max break-words': {},
    '@apply text-body bg-white border-l-4': {},
    // dark
    '@apply dark:text-neutral-100 dark:bg-neutral-700 dark:border-neutral-600': {},

    '&-text': {
      '@apply text-left flex-grow': {},
    },

    '&-info': {
      '@apply border-info': {},

      '.message-icon': {
        '@apply text-info': {},
      },
    },
    '&-success': {
      '@apply border-success': {},

      '.message-icon': {
        '@apply text-success': {},
      },
    },
    '&-error': {
      '@apply border-error': {},

      '.message-icon': {
        '@apply text-error': {},
      },
    },
    '&-warning': {
      '@apply border-warning': {},

      '.message-icon': {
        '@apply text-warning': {},
      },
    },
  },

  '.message-icon': {
    '@apply mr-4 flex-shrink-0 w-10 h-10': {},
  },

  '.message-close-button': {
    '@apply text-body border-transparent flex items-center justify-center transition-all duration-150 rounded-full outline-none cursor-base':
      {},
    marginLeft: '0.25em',
    marginRight: '-0.55em',

    '&-icon': {
      '@apply !text-xl': {},
    },

    '&-disabled': {
      '@apply disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none': {},
    },
  },
});
