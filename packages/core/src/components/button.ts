function buttonPrimary(colors: string[]) {
  return {
    '&-primary': {
      '@apply text-light-primary': {},
      /* hover */
      '@apply hover:bg-primary-surface-hover': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            path: {
              [`@apply stroke-${color}-text-secondary`]: {},
            },
            [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},
            // hover
            [`@apply hover:bg-${color}-surface-primary-hover hover:text-light-primary`]: {},
            // keyboard active
            '&.active': {
              [`@apply bg-${color}-surface-primary-hover`]: {},
            },
            [`@apply active:bg-${color}-surface-primary-hover`]: {},

            '&[data-inverted="true"]': {
              path: {
                [`@apply stroke-${color}-text-primary`]: {},
              },
              '@apply text-inverted-light-primary': {},
              [`@apply bg-inverted-${color}-surface-primary text-inverted-${color}-text-secondary`]: {},
              // hover
              [`@apply hover:bg-inverted-${color}-surface-primary-hover hover:text-inverted-light-primary`]: {},
              '&:hover': {
                '.sk-icon': {
                  path:{
                    [`@apply stroke-inverted-light-primary`]: {},
                  },
                },
                '.sk-spinner': {
                  path:{
                    [`@apply stroke-inverted-light-primary`]: {},
                  },
                },
              },
              // keyboard active
              '&.active': {
                [`@apply bg-inverted-${color}-surface-primary-hover`]: {},
              },
              [`@apply active:bg-inverted-${color}-surface-primary-hover`]: {},
            },
            '&.sk-btn-disabled, &[aria-disabled="true"]': {
              path: {
                [`@apply stroke-dark-disabled`]: {},
              },
            },
          },
        }),
        {}
      ),

      "&[data-color='primary']": {
        path: {
          [`@apply stroke-light-primary`]: {},
        },
        '@apply bg-primary-surface': {},
        '@apply hover:bg-primary-surface-hover': {},
        '&.active': {
          '@apply bg-primary-surface-hover': {},
        },
        [`@apply active:bg-primary-surface-hover`]: {},

        '&[data-inverted="true"]': {
          path: {
            [`@apply stroke-inverted-light-primary`]: {},
          },
          '@apply text-inverted-light-primary': {},
          '@apply bg-inverted-primary-surface': {},
          '@apply hover:bg-inverted-primary-surface-hover': {},
          '&.active': {
            '@apply bg-inverted-primary-surface-hover': {},
          },
          [`@apply active:bg-inverted-primary-surface-hover`]: {},
        },
        '&.sk-btn-disabled, &[aria-disabled="true"]': {
          path: {
            [`@apply stroke-dark-disabled`]: {},
          },
        },
      },
    },
  };
}
function buttonSecondary() {
  return {
    '&-secondary': {
      '@apply border-secondary-outline': {},
      '@apply text-dark-secondary': {},
      '@apply bg-secondary-surface': {},
      /* hover */
      '@apply hover:border-secondary-outline-hover': {},
      '@apply hover:bg-secondary-surface-hover': {},
      /* focus */
      '@apply focus-visible:border-background-content': {},

      // State
      '&.sk-btn-disabled, &[aria-disabled="true"]': {
        path: {
          [`@apply stroke-dark-disabled`]: {},
        },
        '@apply disabled:bg-secondary-surface-disabled bg-secondary-surface-disabled disabled:border-transparent border-transparent !important':
          {},
      },

      '&[data-inverted="true"]': {
        path: {
          [`@apply stroke-inverted-dark-secondary`]: {},
        },
        '@apply border-inverted-secondary-outline': {},
        '@apply text-inverted-dark-secondary': {},
        '@apply bg-inverted-secondary-surface': {},
        /* hover */
        '@apply hover:border-inverted-secondary-outline-hover': {},
        '@apply hover:bg-inverted-secondary-surface-hover': {},
        /* focus */
        '@apply focus-visible:border-inverted-background-content': {},

        // State
        '&.sk-btn-disabled, &[aria-disabled="true"]': {
          path: {
            [`@apply stroke-dark-disabled`]: {},
          },
          '@apply disabled:bg-inverted-secondary-surface-disabled bg-inverted-secondary-surface-disabled disabled:border-transparent border-transparent !important':
            {},
        },
      },
    },
  };
}

function buttonTertiary() {
  return {
    '&-tertiary': {
      '@apply text-dark-secondary': {},
      '@apply bg-tertiary-surface': {},
      /* hover */
      '@apply hover:bg-tertiary-surface-hover': {},

      // State
      '&.sk-btn-disabled, &[aria-disabled="true"]': {
        path: {
          [`@apply stroke-dark-disabled`]: {},
        },
        '@apply disabled:bg-tertiary-surface-disabled bg-tertiary-surface-disabled disabled:border-transparent border-transparent !important':
          {},
      },

      '&[data-inverted="true"]': {
        path: {
          [`@apply stroke-inverted-dark-secondary`]: {},
        },
        '@apply text-inverted-dark-secondary': {},
        '@apply bg-inverted-tertiary-surface': {},
        /* hover */
        '@apply hover:bg-inverted-tertiary-surface-hover': {},
        '&.sk-btn-disabled, &[aria-disabled="true"]': {
          path: {
            [`@apply stroke-dark-disabled`]: {},
          },
          '@apply disabled:bg-inverted-tertiary-surface-disabled bg-inverted-tertiary-surface-disabled disabled:border-transparent border-transparent !important':
            {},
        },
      },
    },
  };
}
function buttonGhost() {
  return {
    '&-ghost': {
      '@apply text-dark-secondary': {},
      '@apply bg-transparent': {},
      '@apply border-transparent': {},
      /* hover */
      '@apply hover:bg-transparent': {},
      '@apply hover:border-transparent': {},

      // State
      '&.sk-btn-disabled, &[aria-disabled="true"]': {
        '@apply disabled:bg-transparent bg-transparent disabled:border-transparent border-transparent !important': {},
      },

      '&[data-inverted="true"]': {
        '@apply text-inverted-dark-secondary': {},
      },
    },
  };
}

function buttonLink(colors: string[]) {
  return {
    '&-link': {
      '@apply h-auto p-0 leading-normal text-neutral-600 hover:underline active:text-neutral-700': {},
      '&.active': {
        '@apply underline': {},
      },
      // dark colors
      '@apply dark:text-neutral-200': {},
      '@apply dark:active:text-neutral-500': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-text active:text-${color}-text`]: {},
            // dark colors
          },
        }),
        {}
      ),
    },
  };
}

export const Button = (colors: string[]) => ({
  '.sk-btn': {
    '@apply box-border': {},
    '@apply border-2 border-transparent': {},
    '@apply cursor-pointer': {},
    '@apply relative': {},
    '@apply m-0': {},
    '@apply px-24 py-8 gap-8': {},
    '@apply inline-flex items-center justify-center flex-shrink-0 align-middle': {},
    '@apply rounded-button': {},
    transitionProperty: 'background-color, border-color, color, fill, stroke, box-shadow',
    '@apply	duration-75 ease-out': {},
    '@apply outline-none appearance-none select-none whitespace-nowrap': {},
    '@apply focus-visible:outline-none': {},
    '@apply focus-visible:ring': {},

    "&[data-rounded='true']": {
      '@apply rounded-circular': {},
    },

    // sizing
    '&-sm': {
      '@apply text-label-small': {},
      '@apply px-14 py-8 gap-6': {},
      '@apply max-h-32 h-32': {},
      '@apply rounded-button-sm': {},
      'svg, .sk-icon': {
        '@apply h-16 w-16': {},
      },
    },

    '&-md': {
      '@apply text-label-medium': {},
      '@apply px-18 py-8 gap-8': {},
      '@apply max-h-40 h-40': {},
      '@apply rounded-button-md': {},
      'svg, .sk-icon': {
        '@apply h-18 w-18': {},
      },
    },

    '&-lg': {
      '@apply text-label-large': {},
      '@apply px-24 py-8 gap-8': {},
      '@apply max-h-48 h-48': {},
      '@apply rounded-button-lg': {},
      'svg, .sk-icon': {
        '@apply h-20 w-20': {},
      },
    },

    // State
    '&-disabled, &[aria-disabled="true"]': {
      '@apply shadow-none disabled:shadow-none disabled:cursor-default cursor-default': {},
      '@apply disabled:text-dark-disabled text-dark-disabled disabled:bg-primary-surface-disabled bg-primary-surface-disabled disabled:border-transparent border-transparent !important':
        {},
    },

    '&-loading': {
      '&-spinner': {
        '@apply absolute mr-0': {},
        '&[data-hastext="true"]': {
          '@apply relative mr-2': {},
        },
      },
    },
    // variants
    ...buttonPrimary(colors),
    ...buttonSecondary(),
    ...buttonTertiary(),
    ...buttonGhost(),
    ...buttonLink(colors),

    '&[data-background="false"]:not(:hover)': {
      '@apply bg-transparent': {},
    },
    '.sk-btn-has-icon': {
      '&-left': {
        '@apply h-full flex items-center justify-center -ml-2': {},
        '.sk-icon': {
          '@apply bg-transparent': {},
          color: 'currentColor',
        },
      },
      '&-right': {
        '@apply h-full flex items-center justify-center -mr-2': {},
        '.sk-icon': {
          '@apply bg-transparent': {},
          color: 'currentColor',
        },
      },
    },
    '&-lg .sk-btn-has-icon-left': {
      '@apply -ml-4': {},
    },
    '&-lg .sk-btn-has-icon-right': {
      '@apply -mr-4': {},
    },
    '&[data-icon=true]': {
      '@apply p-0': {},

      '.sk-icon': {
        '@apply bg-transparent': {},
        color: 'currentColor',
      },

      "&[data-rounded='true']": {
        '@apply rounded-full': {},
      },

      '&.sk-btn-sm': {
        '@apply w-32 min-w-32 max-w-32': {},
        'svg, .sk-icon': {
          '@apply h-20 w-20': {},
        },
      },

      '&.sk-btn-md': {
        '@apply w-40 min-w-40 max-w-40': {},

        'svg, .sk-icon': {
          '@apply h-20 w-20': {},
        },
      },

      '&.sk-btn-lg': {
        '@apply w-48 min-w-48 max-w-48': {},

        'svg, .sk-icon': {
          '@apply h-24 w-24': {},
        },
      },
      '.sk-btn-has-icon': {
        '&-left': {
          '@apply m-0': {},
        },
        '&-right': {
          '@apply m-0': {},
        },
      },
    },
  },
});
