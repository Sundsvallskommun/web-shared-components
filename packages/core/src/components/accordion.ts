export const Accordion = () => ({
  '.sk-disclosure': {
    '@apply mt-6 mb-8': {},
    '@apply text-dark-secondary': {},
    '&[data-inverted="true"]': {
      '@apply text-inverted-dark-secondary': {},
    },
    '&-icon': {
      '@apply flex self-center': {},
    },
    '&-header': {
      '@apply py-8': {},
      '@apply flex flex-row text-left': {},
      '@apply cursor-pointer': {},
      '@apply items-center justify-between': {},
      '@apply gap-16': {},
      '&-icon': {
        '@apply w-32 h-32': {},
        '&-sm': {
          '@apply w-20 min-h-20': {},
        },
        '&-md': {
          '@apply w-24 min-h-24': {},
        },
      },

      '&-title': {
        '@apply text-dark-primary': {},
        '@apply w-full': {},
        '@apply flex flex-row': {},
        '@apply items-center': {},
        '@apply grow shrink': {},
        '&[data-inverted="true"]': {
          '@apply text-inverted-dark-primary': {},
        },
        '*': {
          '@apply m-0': {},
          '@apply text-inherit': {},
          fontSize: 'inherit',
          FontFamily: 'inherit',
          lineHeight: 'inherit',
        },
        '&-disabled': {
          '@apply text-dark-disabled': {},
          '&[data-inverted="true"]': {
            '@apply text-inverted-dark-disabled': {},
          },
        },
        '&-sm': {
          '@apply gap-16': {},
          '@apply text-h4-sm': {},
          '&[data-variant="alt"]': {
            '@apply gap-12': {},
          },
        },
        '&-md': {
          '@apply gap-16': {},
          '@apply text-h4-md': {},
          '&[data-variant="alt"]': {
            '@apply gap-12': {},
          },
        },
        '&-lg': {
          '@apply gap-16': {},
          '&[data-variant="alt"]': {
            '@apply gap-16': {},
            '@apply text-h3-md': {},
          },
        },
        '&-divider': {
          '@apply border-divider': {},
          '&[data-inverted="true"]': {
            '@apply border-inverted-divider': {},
          },
        },
      },

      '&:focus-visible': {
        '@apply outline-0': {},
      },
      '&[aria-disabled="true"]': {
        '@apply text-dark-disabled': {},
        '@apply cursor-default': {},
        '*': {
          '@apply cursor-default': {},
        },
        '&[data-inverted="true"]': {
          '@apply text-inverted-dark-disabled': {},
        },
      },
      '&-sm': {
        '@apply gap-16': {},
        '@apply h-32': {},
        '&[data-variant="alt"]': {
          '@apply gap-12': {},
        },
        '&[data-variant="default"]': {
          '@apply min-h-40': {},
        },
      },
      '&-md': {
        '@apply gap-16': {},
        '&[data-variant="alt"]': {
          '@apply gap-12': {},
        },
        '&[data-variant="default"]': {
          '@apply min-h-56': {},
        },
      },
      '&-lg': {
        '@apply gap-16': {},
        '.sk-disclosure-header-icon': {
          '@apply w-32 min-h-32': {},
        },
        '&[data-variant="alt"]': {
          '@apply gap-16': {},
        },
      },
    },
    '&[data-variant="alt"]': {
      '.sk-disclosure-header': {
        '@apply py-0': {},
        '@apply h-32': {},
      },
    },
    '&-label': {
      '@apply shrink-0': {},
    },

    '&-md': {
      '&[data-variant="default"]': {
        '.sk-disclosure-header': {
          '@apply py-8': {},
          '@apply min-h-56': {},
        },
        '.sk-disclosure-header-button': {
          '@apply w-40 h-40': {},
        },
      },
    },

    '&-body': {
      '&[data-size="sm"]': {
        '@apply pr-12': {},
      },
      '&[data-size="md"]': {
        '@apply pr-12': {},
      },
      '&[data-size="lg"]': {
        '@apply pr-16': {},
      },
      '@apply text-base': {},
      '@apply flex flex-col': {},
      '@apply mb-32': {},
      '@apply mr-32': {},
      '@apply gap-8': {},
      '@apply py-0': {},
      transitionProperty: 'height, opacity, padding, margin',

      transitionDuration: '180ms',

      '&[aria-hidden="true"]': {
        '@apply my-0 overflow-hidden max-h-0 opacity-0': {},
      },

      '&[aria-hidden="false"]': {
        '@apply block opacity-100': {},
      },

      '&[data-variant="alt"]': {
        '@apply mt-24': {},
        '&[data-size="sm"]': {
          '@apply pr-12': {},
        },
        '&[data-size="md"]': {
          '@apply pr-12': {},
        },
        '&[data-size="lg"]': {
          '@apply pr-16': {},
        },
        '&[data-has-icon="true"]': {
          '&[data-size="sm"]': {
            '@apply ml-32': {},
          },
          '&[data-size="md"]': {
            '@apply ml-36': {},
          },
          '&[data-size="lg"]': {
            '@apply ml-48': {},
          },
        },
      },
    },
  },
  '.sk-accordion': {
    '&-item': {
      '.sk-disclosure': {
        transitionProperty: 'margin',
        transitionDuration: '180ms',
        '@apply border-b-1 border-divider': {},
        '&[data-inverted="true"]': {
          '@apply border-inverted-divider': {},
        },
      },

      '&:last-child .sk-disclosure': {
        '@apply border-b-transparent': {},
      },
    },
  },
});
