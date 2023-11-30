module.exports = Card = (colors) => ({
  '.sk-card-list': {
    '@apply grid grid-cols-1 md:grid-cols-2 gap-10': {},
  },

  '.sk-card': {
    '@apply bg-white relative rounded-b-cards': {},
    '@apply flex flex-col': {},
    '@apply no-underline hover:no-underline': {},

    width: '40rem',
    height: '492px',

    '@apply rounded-cards': {},

    ...colors.reduce(
      (styles, color) => ({
        ...styles,

        '&[data-color="mono"], &[data-color="tertiary"]': {
          '@apply border-solid border-1': {},
          borderTop: 'none',
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
      },
    },

    [`&[data-layout="horizontal"]`]: {
      '@apply flex-row': {},
      height: '140px',

      '.sk-card-image': {
        height: '100%',
        width: '128px',
        '@apply float-left': {},
        '@apply rounded-none': {},
        '@apply rounded-l-cards': {},
      },

      '.sk-card-body': {
        '@apply border-none': {},

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

  '.sk-card-image': {
    '@apply object-cover': {},
    width: '100%',
    height: '318px',
    '@apply rounded-t-cards': {},
  },

  '.sk-card-body': {
    '@apply px-24 pb-24 pt-16 rounded-b-cards': {},
    '@apply grow': {},

    '&-meta': {
      '@apply flex space-x-12 mt-16': {},
      span: {
        '@apply flex space-x-4 my-auto': {},
      },
    },

    '&-wrapper': {
      '@apply flex gap-x-32': {},
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
        '@apply line-clamp-3 m-0 pt-8 text-base': {},
      },
    },

    '&-icon': {
      '@apply hidden': {},
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
});
