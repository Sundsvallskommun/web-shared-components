module.exports = Pagination = () => ({
  '.sk-pagination': {
    '@apply select-none': {},

    '&-sm': {
      '@apply text-small': {},
    },

    '&-md': {
      '@apply text-base': {},
    },

    '&-lg': {
      '@apply text-large': {},
    },

    '&-list': {
      '@apply flex justify-between items-center': {},

      '.sk-pagination[data-hideprevnextlabel="true"] &': {
        '@apply w-[41.2rem]': {},
      },

      li: {
        '@apply min-w-[4rem] text-center': {},
      },

      'li:first-child': {
        '@apply text-left': {},
      },

      'li:last-child': {
        '@apply text-right': {},
      },
    },
    '.form-select-wrapper': {
      '@apply w-fit': {},
    },
    '&-pageLabel': {
      '@apply leading-base cursor-pointer underline text-vattjom-surface-primary': {},

      "&[aria-current='true']": {
        '@apply font-bold no-underline text-dark-primary': {},
      },

      '&:hover': {
        '@apply no-underline': {},
      },
    },

    '&-prevNextButton': {
      '@apply text-dark-secondary': {},

      '&.sk-btn': {
        '@apply bg-transparent text-dark-secondary font-normal': {},

        '&.sk-btn-disabled:disabled, .sk-btn[aria-disabled="true"]:disabled': {
          '@apply bg-transparent !important': {},
        },

        '.sk-icon': {
          '@apply bg-transparent text-dark-secondary': {},
        },

        '&:hover': {
          '@apply text-white': {},

          '.sk-icon': {
            '@apply text-white': {},
          },
        },
      },

      '&[disabled]': {
        '@apply opacity-50 cursor-default': {},
      },

      "&[disabled='false']": {
        '.sk-pagination-prevNextButton-label, .sk-pagination-prevNextButton-icon': {
          '@apply cursor-pointer': {},
        },
      },

      '&-label': {
        '@apply hidden sm:inline ml-sm leading-none': {},
      },

      '&-icon': {
        '@apply m-1 leading-none flex items-center': {},
      },
    },

    '&-ellipsis': {
      '@apply inline-block w-16 text-center': {},
    },
    '&.fit-content': {
      '@apply w-full max-w-full': {},
      '.sk-pagination-list': {
        '@apply w-full flex justify-between': {},
        '&-item': {
          '@apply px-0  flex-shrink grow text-center': {},
          '&.ellipsis': {
            '@apply flex-shrink grow-0': {},
          },
          '&.prev-next': {
            '@apply flex-shrink grow-0': {},
          },
          '.sk-pagination-pageLabel': {
            '@apply w-full max-w-[1.5em] mx-xs': {},
          },
        },
      },
      '.form-select-wrapper': {
        '@apply w-full': {},
      },
    },
  },
});
