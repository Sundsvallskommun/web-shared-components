module.exports = Link = () => ({
  '.sk-list': {
    // Generell
    li: {
      '&:before': {
        '@apply text-vattjom-surface-primary font-bold fixed h-24 w-24 text-center my-4': {},
      },
    },

    '&[data-style="bullet"]': {
      li: {
        "@apply before:content-['•']": {},

        '&:before': {
          '@apply text-[18px]': {},
        },
      },
    },

    '&[data-style="numbered"]': {
      li: {
        counterIncrement: 'item',

        '&:before': {
          '@apply text-small border-vattjom-surface-primary border-2 rounded-full h-[2.2rem] w-[2.2rem] my-[0.5rem] leading-8':
            {},
          content: 'counter(item)',
        },
      },
    },

    '&[data-style="stroke"]': {
      li: {
        "@apply before:content-['–']": {},

        '&:before': {
          '@apply text-[16px]': {},
        },
      },
    },

    '&-body': {
      '@apply pt-20': {},
    },

    '&-item': {
      '@apply text-large font-bold ml-[3.2rem]': {},
    },

    '&-text': {
      '@apply text-dark-secondary ml-[3.2rem]': {},
    },
  },
});
