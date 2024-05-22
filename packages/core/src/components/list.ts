export const List = () => ({
  '.sk-list': {
    // General
    li: {
      '&:before': {
        '@apply text-vattjom-surface-primary font-bold': {},
        '@apply absolute inline-flex items-center justify-center text-center': {},
        '@apply w-24 h-24': {},
      },
    },

    '&[data-style="bullet"]': {
      li: {
        '&:before': {
          "@apply content-['•'] my-5 text-lead": {},
        },
      },
    },

    '&[data-style="numbered"]': {
      li: {
        counterIncrement: 'item',

        '&:before': {
          '@apply text-small border-vattjom-surface-primary rounded-full leading-8': {},
          '@apply my-6 h-22 w-22 border-2': {},
          content: 'counter(item)',
        },
      },
    },

    '&[data-style="stroke"]': {
      li: {
        '&:before': {
          "@apply content-['–'] my-4 text-base": {},
        },
      },
    },

    '.sk-link': {
      '&-tertiary': {
        '@apply text-dark-primary': {},
        '&:hover': {
          '@apply text-dark-secondary': {},
        },
      },
    },

    '&-item': {
      '@apply pt-20': {},
    },

    '&-header': {
      '@apply text-large font-bold ml-32': {},
    },

    '&-text': {
      '@apply text-dark-secondary ml-32': {},
    },
  },
});
