module.exports = Comments = () => ({
  '.comment-header': {
    '@apply w-full flex items-center gap-8 p-16 border-b-4 border-gray-200': {},
  },

  '.comment-item': {
    '@apply w-full': {},

    '&-container': {
      '@apply flex relative w-full': {},

      '&-textpic': {
        '@apply flex gap-2 grow': {},
      },
    },
    '&-text': {
      '@apply text-base font-bold mx-0 mb-0 mt-4': {},
    },
    '&-commentorpublished': {
      '@apply float-right text-neutral-600 m-0': {},
    },
  },
  '.comment-input': {
    '@apply w-full flex gap-4 px-10 pt-8 pb-10': {},

    '&-inactive': {
      '@apply text-neutral-300 !text-3xl': {},
    },

    '&-active': {
      '@apply text-primary !text-3xl': {},
    },
  },
});
