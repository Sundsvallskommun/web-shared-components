export const Accordion = () => ({
  '.sk-disclosure': {
    '&-icon': {
      '@apply flex self-center': {},
    },
    '&-header': {
      '@apply mt-6 mb-8': {},
      '@apply flex flex-col text-left': {},
      '@apply cursor-pointer': {},
      '*': {
        '@apply cursor-pointer': {},
      },
      '&:focus-visible': {
        '@apply outline-0': {},
      },

      '&-icon': {
        '@apply ml-auto': {},
        '@apply text-dark-secondary': {},
        svg: {
          '@apply w-20 h-20': {},
        },
      },
      '&[data-disabled="true"]': {
        '@apply text-dark-disabled': {},
        '.sk-disclosure-title': {
          '@apply text-dark-disabled': {},
        },
        '@apply cursor-default': {},
        '*': {
          '@apply cursor-default': {},
        },
      },
    },
    '&-label': {
      '@apply shrink-0': {},
    },
    '&-toggle': {
      '@apply flex items-center justify-between': {},
      '@apply gap-16': {},
      '.sk-icon': {
        '@apply w-32 h-32': {},
      },
    },
    '&-title': {
      '@apply text-dark-primary': {},
      '&-wrapper': {
        '@apply w-full': {},
        '@apply flex flex-row': {},
        '@apply items-center': {},
      },
    },

    '&-sm': {
      '.sk-disclosure-title': {
        '@apply text-h4-sm font-bold': {},
        '&-wrapper': {
          '@apply gap-12': {},
        },
      },
      '.sk-disclosure-toggle': {
        '@apply gap-12': {},
        '.sk-icon': {
          '@apply w-20 min-h-20': {},
        },
      },
      '.sk-disclosure-support': {
        '@apply text-small': {},
      },
      '&[data-variant="default"]': {
        '.sk-disclosure-toggle': {
          '@apply py-4': {},
          '@apply min-h-40': {},
        },
        '.sk-disclosure-header-icon': {
          '@apply w-32 h-32': {},
        },
      },
      '&[data-variant="alt"]': {},
    },
    '&-md': {
      '.sk-disclosure-title': {
        '@apply text-h4-md font-bold': {},
        '&-wrapper': {
          '@apply gap-12': {},
        },
      },
      '.sk-disclosure-toggle': {
        '@apply gap-12': {},
        '.sk-icon': {
          '@apply w-24 min-h-24': {},
        },
      },
      '.sk-disclosure-support': {
        '@apply text-body': {},
      },
      '&[data-variant="default"]': {
        '.sk-disclosure-toggle': {
          '@apply py-8': {},
          '@apply min-h-56': {},
        },
        '.sk-disclosure-header-icon': {
          '@apply w-40 h-40': {},
        },
      },
    },
    '&-lg': {
      '&[data-variant="alt"]': {
        '.sk-disclosure-support': {
          '@apply text-large': {},
        },
        '.sk-disclosure-title': {
          '@apply text-h3-md font-bold': {},
          '&-wrapper': {
            '@apply gap-16': {},
          },
        },
      },
    },

    '&-body': {
      '&[data-size="sm"]': {
        '@apply px-12': {},
      },
      '&[data-size="md"]': {
        '@apply px-12': {},
      },
      '&[data-size="lg"]': {
        '@apply px-16': {},
      },
      '@apply text-base': {},
      '@apply flex flex-col': {},
      '@apply mb-32': {},
      '@apply mr-32': {},
      '@apply gap-8': {},
      '@apply py-0': {},
      transitionProperty: 'visibility, height, opacity, padding, margin',

      transitionDuration: '180ms',

      '&[aria-hidden="true"], &[data-hidden="true"]': {
        '@apply my-0 invisible max-h-0 opacity-0': {},
      },

      '&[aria-hidden="false"], &[data-hidden="false"]': {
        '@apply block max-h-screen opacity-100 visible': {},
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
      },

      '&:last-child .sk-disclosure': {
        '@apply border-b-transparent': {},
      },
    },
  },

  '&[data-inverted="true"]': {
    '&.sk-disclosure': {
      '&-icon': {
        '@apply text-inverted-dark-secondary': {},
      },

      '&[data-disabled="true"]': {
        '@apply text-inverted-dark-disabled': {},
        '.sk-disclosure-title': {
          '@apply text-inverted-dark-disabled': {},
        },
      },

      '&-title': {
        '@apply text-inverted-dark-primary': {},
      },
    },
    '&.sk-accordion': {
      '&-item': {
        '@apply border-inverted-divider': {},
      },
    },
  },
});
