export const Table = () => ({
  '.sk-table-wrapper': {
    '@apply text-base': {},
    '@apply rounded-groups': {},
    '@apply border-1 border-divider': {},
    '@apply bg-background-content': {},
    '@apply relative': {},

    '&-inside': {
      '@apply border-0 rounded-t-groups': {},
      '@apply overflow-hidden': {},
      '@apply w-full': {},
      '@apply h-full max-h-full': {},
      '&[data-scroll="x"]': {
        '@apply overflow-x-auto': {},
      },
      '&[data-scroll="y"]': {
        '@apply overflow-y-auto': {},
      },
      '&[data-scroll="true"]': {
        '@apply overflow-auto': {},
      },
    },
    '&:not([data-background="true"]):not([data-wrappingborder="true"])': {
      '@apply border-0': {},
      '@apply bg-transparent': {},
    },
    '.sk-table-wrapper-inside': {
      '@apply border-0 rounded-b-groups': {},
    },
  },
  '.sk-table': {
    '@apply w-full text-left table-auto': {},
    '@apply text-dark-secondary': {},

    '&-caption': {
      '@apply text-left': {},
      '@apply w-full': {},
      ...['left', 'center', 'right'].reduce(
        (classes, position) => ({
          ...classes,
          [`&[data-textalign="${position}"]`]: {
            [`@apply text-${position}`]: {},
          },
        }),
        {}
      ),
      '&-sr': {
        '@apply sr-only': {},
      },
    },
    '&-auto': {
      '&-cell': {
        '@apply w-full': {},
      },
    },

    '&-thead': {
      '@apply border-b-1 border-dark-primary': {},
      '&[data-stickyheader="true"]': {
        '@apply sticky top-0': {},
        '@apply bg-background-content': {},
        '@apply border-b-0': {},
        '.sk-table-col-content': {
          '@apply border-b-1 border-dark-primary': {},
        },
      },

      '&-tr': {
        '@apply table-row': {},
        '@apply text-label-small': {},
      },

      '.sk-table-th': {
        '@apply h-56': {},
        '@apply p-0': {},
        '&:first-of-type': {
          '.sk-table-sticky-col': {
            '@apply rounded-tl-groups': {},
          },
        },
        '&:last-of-type': {
          '.sk-table-sticky-col': {
            '@apply rounded-tr-groups': {},
          },
        },
        '.sk-table-col-content': {
          '@apply py-4': {},
          '@apply px-16': {},
        },

        "&[data-isColumnSortable='true']": {
          '@apply cursor-pointer': {},
        },
      },
      '@apply bg-transparent': {},
      '&[data-background="true"]': {
        '@apply border-b-0': {},
        '@apply bg-vattjom-background-200 border-b-transparent': {},
        '.sk-table-col-content': {
          '@apply border-b-0': {},
        },
        '[data-sticky="true"]': {
          '@apply bg-vattjom-background-200': {},
        },
      },
    },

    '&-sortbutton': {
      '@apply flex items-center': {},
      '@apply focus-visible:ring ring-ring ring-offset-0': {},
      '@apply focus-visible:bg-vattjom-background-200': {},
      '@apply rounded-utility': {},
      '@apply pr-16': {},
      '@apply h-40': {},
      '&[data-sronly="true"]': {
        '@apply sr-only': {},
      },

      '&-icon': {
        '@apply inline-flex pl-sm': {},

        '&-sort': {
          '@apply text-dark-secondary': {},
          '@apply flex flex-col': {},

          svg: {
            '@apply h-16 w-16': {},
            '@apply first-of-type:-mb-4': {},
            '@apply last-of-type:-mt-4': {},
          },

          "&[data-sortmode='ascending']": {
            '> *': {
              '@apply last-of-type:text-dark-ghost': {},
            },
          },

          "&[data-sortmode='descending']": {
            '> *': {
              '@apply first-of-type:text-dark-ghost': {},
            },
          },
        },
      },
    },

    '&-tbody': {
      '@apply text-dark-secondary bg-transparent': {},

      '&-tr': {
        '@apply bg-transparent': {},
        '@apply hover:bg-background-100': {},
        '@apply border-b-1 border-divider': {},
        '@apply last-of-type:border-b-transparent': {},
        '@apply focus-visible:shadow-insetring': {},
        '&:hover': {
          td: {
            '@apply bg-background-100': {},
          },
        },
      },

      '&-td, .sk-table-th': {
        '@apply p-0': {},
        '@apply text-small': {},
        '@apply h-64-1': {},
        '@apply min-h-64-1': {},

        '@apply focus-visible:shadow-insetring': {},
        '.sk-table-col-content': {
          '@apply py-8 px-18': {},
          '@apply gap-8': {},
        },
      },
    },

    '&-col-content': {
      '@apply flex': {},
      '@apply w-full': {},
      '@apply justify-start items-center': {},
      '@apply h-full': {},
    },

    '&[data-dense="dense"]': {
      '.sk-table': {
        '&-col-content': {
          '@apply py-0': {},
        },
        '&-thead': {
          th: {
            '@apply h-48': {},
          },
        },
        '&-tbody': {
          '&-td, .sk-table-th': {
            '@apply h-48-1': {},
            '@apply min-h-48-1': {},
          },
        },
      },
    },

    '[data-sticky="true"]': {
      '@apply sticky': {},
      '@apply bg-background-content': {},

      '&:first-of-type': {
        '@apply left-0': {},
      },
      '&:last-of-type': {
        '@apply right-0': {},
      },
    },

    '&[data-hasscroll="true"]': {
      '[data-sticky="true"]': {
        '&:first-of-type': {
          '.sk-table-col-content': {
            '@apply border-r-1 border-r-divider': {},
          },
        },
        '&:last-of-type': {
          '.sk-table-col-content': {
            '@apply border-l-1 border-r-divider': {},
          },
        },
        '.sk-table-col-content': {},
      },
    },
    '&-paginationwrapper': {
      '@apply max-w-[37.5em]': {},
      '@apply shrink grow': {},
      '@apply hidden @screen-md/footer:flex': {},
    },

    '&-bottom': {
      '@apply @container/footer': {},
      '@apply py-14 px-16': {},
      '@apply border-t-1 border-divider': {},
      '@apply flex flex-row': {},
      '@apply flex-wrap': {},
      '@apply @screen-lg/footer:gap-32': {},
      '@apply @screen-md/footer:gap-16': {},
      '@apply gap-8': {},
      '@apply justify-between items-center': {},
      '&-section': {
        '@apply shrink-0': {},
        '@apply flex flex-col': {},
        '@apply justify-start items-center': {},
        '@apply @screen-sm/footer:flex-row': {},
        '@apply gap-8': {},
        '&.sk-table-pagination-mobile': {
          '@apply @screen-md/footer:hidden': {},
        },
        '&-label': {
          '@apply font-normal': {},
          '@apply text-small': {},
          '@apply shrink-0': {},
        },
        '&-pagesize': {
          '@apply max-w-60': {},
        },
      },
      '&-pagination': {
        '@apply grow': {},
        '@apply shrink': {},
      },
    },
  },
});
