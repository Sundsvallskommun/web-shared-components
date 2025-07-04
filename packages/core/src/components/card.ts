export const Card = (colors: string[]) => ({
  '.sk-card': {
    '@apply text-base': {},
    '@apply bg-white relative rounded-b-cards rounded-cards': {},
    '@apply flex flex-col': {},
    '@apply no-underline hover:no-underline': {},
    '@apply h-full': {},

    '&-wrapper': {
      '@apply grid': {},
    },

    '&-image': {
      '@apply object-cover grow': {},
      '@apply rounded-t-cards': {},
    },

    '&-body': {
      '@apply px-24 pb-24 pt-16 rounded-b-cards': {},
      '@apply shrink': {},

      '&-wrapper': {
        '@apply flex': {},
      },

      '&-meta': {
        '@apply flex space-x-12 mt-16 text-base': {},
        span: {
          '@apply flex space-x-4 items-center': {},
          time: {
            '@apply h-24': {},
          },
        },

        '&.sk-card-image': {
          '@apply min-h-[12.5em] max-h-[20em]': {},
        },
      },

      '&-header': {
        'h1, h2, h3, h4, h5, h6, h7, a': {
          '@apply line-clamp-1 text-h3-md text-dark-primary mt-16': {},
        },
        span: {
          '@apply pl-12': {},
        },
      },

      '&-content': {
        '@apply w-full': {},
        'p, a': {
          '@apply line-clamp-3 m-0 pt-8 text-base text-body': {},
        },
      },

      '&-icon': {
        '@apply hidden': {},
      },
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,

        '&[data-color="mono"], &[data-color="tertiary"]': {
          '@apply border-solid border-1': {},
          '@apply border-primitives-overlay-darken-5 dark:border-primitives-overlay-lighten-5': {},
          '@apply bg-primitives-gray-lightest dark:bg-primitives-gray-800': {},

          '.sk-card-body-meta': {
            '@apply text-dark-secondary': {},
          },

          '.sk-card-body-icon': {
            '@apply bg-primitives-overlay-darken-9 dark:bg-primitives-overlay-lighten-10': {},
            '@apply text-primitives-gray-lightest dark:text-primitives-overlay-darken-9': {},
            '@apply hover:bg-primitives-overlay-darken-10 dark:hover:bg-primitives-gray-lightest': {},
          },

          // inverted.
          [`&[data-inverted="true"]`]: {
            '@apply bg-primitives-gray-800': {},

            '.sk-card-body': {
              // Meta
              '&-meta': {
                span: {
                  '@apply text-light-secondary': {},
                },
              },

              // header
              '&-header': {
                'h1, h2, h3, h4, h5, h6, h7, a': {
                  [`@apply text-light-primary`]: {},
                },
              },

              // Content
              '&-content': {
                'p, a': {
                  [`@apply text-light-secondary`]: {},
                },
              },

              '.sk-card-body-icon': {
                '@apply bg-primitives-overlay-lighten-10 text-primitives-gray-900': {},
                '@apply hover:bg-primitives-gray-lightest': {},
              },
            },
          },
        },

        '&[data-color="tertiary"]': {
          '@apply border-solid border-1': {},
          '@apply border-primitives-overlay-darken-5 dark:border-primitives-overlay-lighten-5': {},
          '@apply bg-primitives-gray-50 dark:bg-primitives-gray-700': {},
        },

        [`&[data-color="${color}"]`]: {
          // card
          [`@apply bg-${color}-surface-primary-hover`]: {},

          // clickable
          '&.sk-card-use-hover-effect': {
            // hover
            [`@apply hover:cursor-pointer hover:bg-${color}-surface-primary`]: {},
          },

          // Meta
          '.sk-card-body': {
            '&-meta': {
              span: {
                '@apply text-light-secondary': {},
              },
            },

            // header
            '&-header': {
              'h1, h2, h3, h4, h5, h6, h7, a': {
                [`@apply text-light-primary`]: {},
              },
            },

            // Content
            '&-content': {
              'p, a': {
                [`@apply text-light-secondary`]: {},
              },
            },
          },

          // inverted.
          [`&[data-inverted="true"]`]: {
            // card
            [`@apply bg-${color}-surface-accent-hover`]: {},

            // clickable
            '&.sk-card-use-hover-effect': {
              // hover
              [`@apply hover:cursor-pointer hover:bg-${color}-surface-accent`]: {},
            },

            '.sk-card-body': {
              // Meta
              '&-meta': {
                span: {
                  '@apply text-dark-secondary': {},
                },
              },

              // header
              '&-header': {
                'h1, h2, h3, h4, h5, h6, h7, a': {
                  [`@apply text-dark-primary`]: {},
                },
              },

              // Content
              '&-content': {
                'p, a': {
                  [`@apply text-dark-secondary`]: {},
                },
              },
            },
          },
        },
      }),
      {}
    ),

    // clickable
    '&.sk-card-use-hover-effect': {
      //Hide and show of icon
      '.sk-card-body-icon': {
        '@apply inline-flex': {},
        '@apply mt-auto mb-auto mr-24': {},
      },
    },

    [`&[data-layout="horizontal"]`]: {
      '@apply flex-row h-full': {},

      '.sk-card': {
        '&-image': {
          '@apply h-full w-[8em]': {},
          '@apply float-left': {},
          '@apply rounded-none rounded-l-cards grow-0': {},
        },

        '&-body': {
          '@apply w-full': {},
          '@apply border-none': {},

          '&-wrapper': {
            '@apply w-full': {},
          },

          '&-content': {
            'p, a': {
              '@apply text-small': {},
            },
          },

          '&-meta': {
            '@apply hidden': {},
          },
        },
      },
    },
  },

  '.sk-card-link': {
    '@apply hover:cursor-pointer': {},

    '&::after': {
      content: "''",
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
    },
  },

  /**
   * Meta card
   */
  '.sk-meta-card': {
    '@apply no-underline hover:no-underline': {},
    '@apply flex bg-vattjom-surface-accent': {},
    '@apply p-14 rounded-groups': {},

    '&.sk-meta-card-use-hover-effect:hover': {
      '@apply cursor-pointer': {},
    },

    '&.sk-meta-card-use-hover-effect[data-color="vattjom"]:hover': {
      '@apply bg-vattjom-background-300': {},
    },

    '&.sk-meta-card-use-hover-effect[data-color="mono"]:hover': {
      '@apply bg-primitives-overlay-darken-2 dark:bg-primitives-overlay-lighten-2': {},
    },

    '&[data-color="mono"]': {
      '@apply bg-primitives-overlay-darken-1 dark:bg-primitives-overlay-lighten-1': {},
    },

    '&[data-color="vattjom"]': {
      '@apply bg-vattjom-background-200': {},
    },

    '&-text-icon': {
      '@apply mr-12 rounded-12 p-8': {},
      '@apply bg-primitives-gray-lightest dark:bg-primitives-gray-800': {},
      '@apply text-dark': {},
      svg: {
        height: 'unset',
        width: 'unset',
      },
    },

    '&-body': {
      '&-header': {
        'h1, h2, h3, h4, h5, h6, h7, a, p': {
          '@apply mt-6 line-clamp-1': {},
          '@apply text-dark-primary': {},
        },
      },
      '&-content': {
        'p, a': {
          '@apply text-primitives-gray-700 dark:text-primitives-gray-200': {},
          '@apply text-dark-secondary line-clamp-1': {},
        },
      },
    },

    '&-external-link-icon': {
      '@apply ml-auto h-32 w-32 p-6 text-dark shrink-0': {},
    },
  },

  '.sk-meta-card[data-size="sm"]': {
    '@apply h-[8.6rem]': {},
  },
  '.sk-meta-card[data-size="md"]': {
    '@apply h-[9.4rem]': {},
  },
  '.sk-meta-card[data-size="sm"] .sk-meta-card-body-header': {
    'h1, h2, h3, h4, h5, h6, h7, a, p': {
      fontSize: '1.6rem ',
      lineHeight: '2.4rem ',
      fontWeight: 'bold ',
    },
  },
  '.sk-meta-card[data-size="sm"] .sk-meta-card-body-content': {
    '@apply text-[1.4rem]': {},
  },
  '.sk-meta-card[data-size="md"] .sk-meta-card-body-header': {
    'h1, h2, h3, h4, h5, h6, h7, a, p': {
      fontSize: '1.8rem',
      lineHeight: '2.6rem',
      fontWeight: 'bold',
    },
  },
  '.sk-meta-card[data-size="md"] .sk-meta-card-body-content': {
    '@apply text-[1.6rem]': {},
  },
});
