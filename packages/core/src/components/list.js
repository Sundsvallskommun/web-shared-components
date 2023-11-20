module.exports = Link = () => ({
  '.sk-list': {
    // Generell
    li: {
      '&:before': {
        '@apply text-vattjom-surface-primary font-bold fixed mt-4': {},
      },
    },

    '&[data-style="bullet"]': {
      li: {
        "@apply before:content-['•']": {},

        '&:before': {
          '@apply text-[18px] mt-6 ml-6': {},
        },
      },
    },

    '&[data-style="numbered"]': {
      li: {
        counterIncrement: 'item',

        '&:before': {
          '@apply text-small items-center border-vattjom-surface-primary border-2 rounded-full px-[0.7rem]': {},
          content: 'counter(item)',
        },
      },
    },

    '&[data-style="stroke"]': {
      li: {
        "@apply before:content-['–']": {},

        '&:before': {
          '@apply text-[16px] ml-8': {},
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
