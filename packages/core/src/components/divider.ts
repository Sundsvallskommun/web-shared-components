export const Divider = () => ({
  '.sk-divider': {
    '@apply border-t-0 border-divider': {},
    '&-vertical': {
      '@apply min-h-[1em] border-l-1 border-solid h-auto ml-4 mt-8 mb-4 mr-4 self-stretch': {},
      '&[data-strong="true"]': {
        '@apply border-l border-solid h-auto mx-2': {},
      },
    },
    '&-horizontal': {
      '@apply flex-1 border-b-1 border-solid w-auto my-2': {},
      '&[data-strong="true"]': {
        '@apply border-b border-solid w-auto my-2': {},
      },
    },

    '&-root': {
      '@apply flex items-center gap-16': {},
    },

    '&-sm': {
      '&.sk-divider': {
        '&-root': {
          '@apply gap-8': {},
        },
        '.sk-divider-text': {
          '@apply text-h4-sm': {},
        },
      },
    },
    '&-md': {
      '&.sk-divider': {
        '&-root': {
          '@apply gap-10': {},
        },
        '.sk-divider-text': {
          '@apply text-h4-md': {},
        },
      },
    },
    '&-lg': {
      '&.sk-divider': {
        '&-root': {
          '@apply gap-12': {},
        },
        '.sk-divider-text': {
          '@apply text-h4-lg': {},
        },
      },
    },
  },
});
