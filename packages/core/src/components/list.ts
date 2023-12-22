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
          "@apply content-['•'] my-[.5rem] text-[1.8rem]": {},
        },
      },
    },

    '&[data-style="numbered"]': {
      li: {
        counterIncrement: 'item',

        '&:before': {
          '@apply text-small border-vattjom-surface-primary rounded-full leading-8': {},
          '@apply my-[.6rem] h-[2.2rem] w-[2.2rem] border-[.2rem]': {},
          content: 'counter(item)',
        },
      },
    },

    '&[data-style="stroke"]': {
      li: {
        '&:before': {
          "@apply content-['–'] my-[.4rem] text-[1.6rem]": {},
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
      '@apply text-large font-bold ml-[3.2rem]': {},
    },

    '&-text': {
      '@apply text-dark-secondary ml-[3.2rem]': {},
    },
  },
});
