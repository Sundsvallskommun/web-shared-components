module.exports = Card = (colors) => ({
  '.sk-card-list': {
    '@apply grid grid-cols-1 md:grid-cols-2 gap-10': {},
  },

  '.sk-card': {
    '@apply p-lg bg-white relative rounded-b-cards': {},
    '@apply p-0': {},

    width: '40rem',
    '@apply rounded-cards': {},

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          // card
          [`@apply bg-${color}-surface-primary-hover`]: {},

          // clickable
          '&.sk-card-clickable': {
            // hover
            [`@apply hover:cursor-pointer hover:bg-${color}-surface-primary`]: {},

            //Hide and show of icon
            '.sk-card-body-icon': {
              ['@apply inline-flex']: {},
            },
          },

          // Meta
          '.sk-card-meta': {
            '@apply text-light-primary': {},

            span: {
              '@apply text-light-primary': {},
            },
          },

          // header
          '.sk-card-body-header': {
            'h1, h2, h3, h4, h5, h6, h7, a': {
              [`@apply text-light-primary`]: {},
            },
          },

          // Content
          '.sk-card-body-content': {
            'p, a': {
              [`@apply text-light-secondary`]: {},
            },
          },

          // Icon
          '.sk-card-body-icon': {
            [`@apply text-dark-primary`]: {},
            [`@apply bg-${color}-surface-accent`]: {},
          },

          // inverted.
          [`&[data-inverted="true"]`]: {
            // card
            [`@apply bg-${color}-surface-accent-hover`]: {},

            // clickable
            '&.sk-card-clickable': {
              // hover
              [`@apply hover:cursor-pointer hover:bg-${color}-surface-accent`]: {},
            },

            // Meta
            '.sk-card-meta': {
              '@apply text-dark-primary': {},

              span: {
                '@apply text-dark-primary': {},
              },
            },

            // header
            '.sk-card-body-header': {
              ' h1, h2, h3, h4, h5, h6, h7, a': {
                [`@apply text-dark-primary`]: {},
              },
            },

            // Content
            '.sk-card-body-content': {
              'p, a': {
                [`@apply text-dark-secondary`]: {},
              },
            },

            // Icon
            '.sk-card-body-icon': {
              [`@apply text-${color}-surface-accent`]: {},
              [`@apply bg-${color}-surface-primary`]: {},
            },
          },
        },
      }),
      {}
    ),

    [`&[data-layout="horizontal"]`]: {
      '@apply flex': {},

      '.sk-card-image': {
        height: '140px',
        width: '128px',
        '@apply float-left': {},
        '@apply rounded-none': {},
        '@apply rounded-l-cards': {},
      },

      '.sk-card-body-content': {
        'p, a': {
          '@apply text-small': {},
        },
      },

      '.sk-card-meta': {
        '@apply hidden': {},
      },
    },
  },

  '.sk-card-body': {
    '@apply p-24 rounded-b-cards': {},

    '.sk-card-meta': {
      '@apply flex space-x-6 pb-10': {},
    },

    '.sk-card-body-wrapper': {
      '@apply flex': {},
    },

    '.sk-card-body-header': {
      ' h1, h2, h3, h4, h5, h6, h7, a': {
        '@apply line-clamp-1 text-h3-md': {},
      },
    },

    '.sk-card-body-content': {
      'p, a': {
        '@apply line-clamp-3 m-0 pt-8 text-base': {},
      },
    },
  },

  '.sk-card-body-icon': {
    '@apply ml-32 hidden': {},
  },

  '.sk-card-image': {
    '@apply object-cover': {},
    width: '100%',
    height: '318px',
    '@apply rounded-t-cards': {},
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
