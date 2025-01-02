export const Pagination = () => ({
  '.sk-pagination': {
    '@apply select-none': {},
    '@apply text-base': {},

    '&-list': {
      '@apply flex justify-between items-center': {},

      '.sk-pagination[data-hideprevnextlabel="true"] &': {
        '@apply w-fit': {},
      },

      li: {
        '@apply min-w-40 text-center': {},
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
      '@apply focus-visible:ring ring-ring ring-offset': {},
      '@apply rounded-full': {},
      '@apply h-32 w-32': {},
      "&[aria-current='true']": {
        '@apply font-bold no-underline text-dark-primary': {},
      },
    },

    '&-prevNextButton': {
      '@apply text-dark-secondary': {},

      '&.sk-btn': {
        '@apply bg-transparent text-dark-secondary font-normal': {},

        '&.sk-btn-disabled:disabled, .sk-btn[aria-disabled="true"]:disabled': {
          '@apply bg-transparent !important': {},
          '@apply text-dark-disabled hover:text-dark-disabled': {},
          '.sk-icon': {
            '@apply text-dark-disabled hover:text-dark-disabled': {},
          },
        },

        '.sk-icon': {
          '@apply bg-transparent text-dark-secondary': {},
        },

        '&:hover': {
          '@apply text-dark-primary': {},
          '@apply bg-tertiary-surface-hover': {},

          '.sk-icon': {
            '@apply text-dark-primary': {},
          },
        },
      },

      '&[disabled]': {
        '@apply cursor-default': {},
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
        '@apply w-full flex justify-center': {},
        '@apply gap-0 md:gap-24': {},
        '&-item': {
          '@apply px-0 grow-0 text-center': {},
          '&.ellipsis': {
            '@apply flex-shrink grow-0': {},
          },
          '&.prev-next': {
            '@apply flex-shrink': {},
            '&.prev': {
              '@apply text-left': {},
            },
            '&.next': {
              '@apply text-right': {},
            },
          },
          '.sk-pagination-pageLabel': {
            '@apply mx-xs': {},
          },
        },
      },
      '.form-select-wrapper': {
        '@apply w-full': {},
      },
    },
  },
});
