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
          '@apply gap-[.8rem]': {},
        },
        '.sk-divider-text': {
          '@apply text-label-small': {},
        },
      },
    },
    '&-md': {
      '&.sk-divider': {
        '&-root': {
          '@apply gap-[1rem]': {},
        },
        '.sk-divider-text': {
          '@apply text-label-medium': {},
        },
      },
    },
    '&-lg': {
      '&.sk-divider': {
        '&-root': {
          '@apply gap-[1.2rem]': {},
        },
        '.sk-divider-text': {
          '@apply text-label-large': {},
        },
      },
    },
  },
});
