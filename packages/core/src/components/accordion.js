module.exports = Accordion = (colors) => ({
  '.sk-disclosure': {
    '&:has(&-header:focus-visible)': {
      '@apply outline': {},
    },
    '&-header': {
      '@apply flex flex-col text-left': {},

      '[aria-expanded="true"] &': {
        '@apply bg-hover': {},
      },

      '&:focus-visible': {
        '@apply outline-0': {},
      },

      '&-icon': {
        '@apply ml-auto !text-2xl': {},
        svg: {
          '@apply !text-2xl': {},
        },
      },
    },

    '&-is-open &-header': {
      '@apply bg-hover': {},
    },

    '&-toggle': {
      '@apply flex items-center inline-block text-lg leading-lg text-left text-lg mx-md sm:mx-lg my-md': {},
      fontWeight: 'bold',

      '.sk-disclosure-title': {
        '@apply mr-md text-base leading-base md:text-lg md:leading-lg': {},
      },
      '.sk-disclosure-subtitle': {
        '@apply m-0 mr-md text-sm font-normal': {},
      },
    },

    '&-body': {
      '@apply h-0 overflow-hidden': {},
      transitionProperty: 'visibility, height, padding, margin',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '180ms',

      '&[aria-hidden="true"], &[data-hidden="true"]': {
        '@apply my-0 invisible': {},
      },

      '&[aria-hidden="false"], &[data-hidden="false"]': {
        '@apply block h-auto visible': {},
      },
    },

    '&-solid': {
      '@apply border border-primary': {},
      '.sk-disclosure-header': {
        '@apply bg-primary text-white': {},

        '[aria-expanded="true"] &': {
          '@apply bg-hover': {},
        },
      },
    },

    '&-solid[data-alert="true"], &-outline[data-alert="true"]': {
      '@apply border border-warning': {},

      '.sk-disclosure-header:not([data-disabled="true"])': {
        '@apply bg-warning-surface-accent text-warning': {},

        '[aria-expanded="true"] &': {
          '@apply bg-warning-surface-accent': {},
        },
      },
    },
    '&-solid[data-error="true"], &-outline[data-error="true"]': {
      '@apply border border-error': {},
      '.sk-disclosure-header:not([data-disabled="true"])': {
        '@apply bg-error-surface-accent text-error': {},

        '[aria-expanded="true"] &': {
          '@apply bg-error-surface-accent': {},
        },
      },
    },

    '&-is-open': {
      '@apply border border-gray-stroke': {},
      '& .sk-disclosure-header': {
        '@apply bg-hover text-white': {},
      },

      '&[data-alert="true"]': {
        '@apply border border-warning': {},
        '& .sk-disclosure-header': {
          '@apply border-b border-warning': {},
        },
      },

      '&[data-error="true"]': {
        '@apply border border-error': {},
        '& .sk-disclosure-header': {
          '@apply border-b border-error': {},
        },
      },
    },
    '&-is-open &-body': {
      '@apply overflow-visible animate-reset-overflow': {},
    },

    '&-outline': {
      '@apply border border-gray-stroke': {},
      '&:not([data-error="true"]):not([data-alert="true"]) .sk-disclosure-body': {
        '@apply mt-0': {},
      },
      '.sk-disclosure-toggle': {},
      '.sk-disclosure-header': {
        '@apply bg-transparent text-body': {},

        '[aria-expanded="true"] &': {
          '@apply bg-hover': {},
        },
      },
    },

    '&-plain': {
      '@apply border-0': {},
      '&:has(.sk-disclosure-header:focus-visible)': {
        '@apply outline-offset-4': {},
      },
      '.sk-disclosure-header': {
        '@apply bg-transparent text-body': {},

        '[aria-expanded="true"] &': {
          '@apply bg-hover': {},
        },
        '&[data-disabled="true"]': {
          '@apply bg-transparent text-gray-stroke': {},
        },
        '.sk-disclosure-toggle': {
          '@apply mx-0': {},
        },
      },
      '.sk-disclosure-body': {
        '@apply m-0': {},
      },
      '&[data-alert="true"]': {
        '@apply border-0': {},
        '.sk-disclosure-header': {
          '@apply border-0 text-warning': {},
        },
      },
      '&[data-error="true"]': {
        '@apply border-0': {},
        '.sk-disclosure-header': {
          '@apply border-0 text-error': {},
        },
      },
    },

    '&-disabled, &-disabled [role="button"]': {
      '@apply disabled:cursor-not-allowed cursor-not-allowed': {},
    },

    '&-header[data-disabled="true"]': {
      '@apply bg-gray-lighter text-gray-stroke': {},
    },

    '&-disabled, &&-disabled': {
      '@apply border-gray': {},
    },
  },
  '.sk-accordion': {
    '&-item': {
      '.sk-disclosure': {
        transitionProperty: 'margin',
        transitionDuration: '180ms',
        '&-disabled': {
          '@apply border-x-transparent border-y-transparent': {},
        },
        '&-plain, &-plain[data-disabled="true"]': {
          '@apply border border-transparent border-b-gray-stroke': {},
        },

        '&-solid[data-open="false"]': {
          '@apply border-white': {},
          '&[data-disabled="true"]': {
            '@apply border-x-transparent border-y-transparent': {},
          },
        },
        '&[data-open="true"]:not(&-plain)': {
          '@apply mt-md mb-md': {},
        },
      },
      '&:not(:first-child)': {
        '@apply mt-[-1px]': {},
      },
      '&:first-child .sk-disclosure[data-open="true"]:not(.sk-disclosure-plain)': {
        '@apply mt-0 mb-md': {},
      },
      '&:last-child .sk-disclosure[data-open="true"]:not(.sk-disclosure-plain)': {
        '@apply mt-md mb-0': {},
      },
      '&:last-child .sk-disclosure-plain': {
        '@apply border-b-transparent': {},
      },
    },
  },
});
