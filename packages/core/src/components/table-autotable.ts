export const TableAutoTable = () => ({
  '.sk-table-wrapper': {
    '@apply rounded-groups': {},
    '@apply border-1': {},
    '@apply bg-background-content': {},
    '@apply relative': {},

    '&-inside': {
      '@apply border-0 rounded-t-groups': {},
      '@apply overflow-hidden': {},
      '@apply w-full': {},
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
    '&:not([data-background="true"])': {
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

    '&-thead': {
      '@apply border-b-1 border-dark-primary': {},
      '@apply h-[5.6rem]': {},
      '.sk-table-sticky-col': {
        '@apply top-0': {},
        '@apply h-[5.6rem]': {},
      },
      '&-tr': {
        '@apply table-row': {},
        '@apply text-label-small': {},
      },

      '.sk-table-th': {
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
        '@apply bg-vattjom-background-200 border-b-transparent': {},
        '.sk-table-sticky-col': {
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
        '@apply border-b-1': {},
        '@apply last-of-type:border-b-transparent': {},
        '@apply focus-visible:shadow-insetring': {},
        '&:hover': {
          '.sk-table-sticky-col': {
            '@apply bg-background-100': {},
          },
        },
      },

      '&-td, .sk-table-th': {
        '@apply text-small': {},
        '@apply h-[6.3rem]': {},
        '@apply min-h-[6.3rem]': {},
        '.sk-table-sticky-col': {
          '@apply h-[6.3rem]': {},
          '@apply min-h-[6.3rem]': {},
        },
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
          '@apply h-[4.8rem]': {},
          '.sk-table-sticky-col': {
            '@apply h-[4.8rem]': {},
          },
        },
        '&-tbody': {
          '&-td, .sk-table-th': {
            '@apply h-[4.7rem]': {},
            '@apply min-h-[4.7rem]': {},
            '.sk-table-sticky-col': {
              '@apply h-[4.7rem]': {},
              '@apply min-h-[4.7rem]': {},
            },
          },
        },
      },
    },

    '.sk-table-sticky-col': {
      '@apply absolute': {},
      '@apply bg-background-content': {},
    },

    '[data-sticky="true"]': {
      '> .sk-table-col-content': {
        '@apply opacity-0': {},
      },
    },

    '&[data-hasscroll="true"]': {
      'td:first-of-type, th:first-of-type': {
        '.sk-table-sticky-col': {
          '@apply left-0': {},
          '@apply border-r-1': {},
        },
      },
      'td:last-of-type, th:last-of-type': {
        '.sk-table-sticky-col': {
          '@apply border-l-1': {},
          '@apply right-0': {},
        },
      },
    },
    '&-paginationwrapper': {
      '@apply max-w-[60rem]': {},
      '@apply shrink grow': {},
      '@apply hidden @screen-md/footer:flex': {},
    },

    '&-bottom': {
      '@apply @container/footer': {},
      '@apply py-14 px-16': {},
      '@apply border-t-1': {},
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
      },
      '&-pagination': {
        '@apply grow': {},
        '@apply shrink': {},
      },
    },
  },
});
