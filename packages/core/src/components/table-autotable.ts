export const TableAutoTable = () => ({
  '.sk-table-wrapper': {
    '@apply rounded-groups': {},
    '@apply border-1': {},
    '@apply bg-background-content': {},
    '&-inside': {
      '@apply border-0 rounded-t-groups': {},
      '@apply overflow-hidden': {},
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
      '@apply h-48': {},
      '&-tr': {
        '@apply table-row': {},
        '@apply text-label-small': {},
      },

      '&-th': {
        '@apply py-4': {},
        '@apply px-16': {},

        "&[data-isColumnSortable='true']": {
          '@apply cursor-pointer': {},
        },
      },
      '@apply bg-transparent': {},
      '&[data-background="true"]': {
        '@apply bg-vattjom-background-200 border-b-transparent': {},
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
      },

      '&-td': {
        '@apply text-small': {},
        '&-content': {
          '@apply justify-start items-center': {},
          '@apply gap-8': {},
          '@apply py-8 px-18': {},
          '@apply h-[6.3rem]': {},
          '@apply min-h-[6.3rem]': {},
          '@apply focus-visible:shadow-insetring': {},
        },
      },
    },

    '&[data-dense="dense"]': {
      '.sk-table': {
        '&-thead': {
          '&-th': {
            '@apply py-4': {},
          },
        },
        '&-tbody': {
          '&-td-content': {
            '@apply py-0': {},
            '@apply h-[4.7rem]': {},
            '@apply min-h-[4.7rem]': {},
          },
        },
      },
    },

    '&-paginationwrapper': {
      '@apply w-full max-w-[60rem]': {},
      '@apply shrink': {},
    },

    '&-bottom': {
      '@apply py-14 px-16': {},
      '@apply border-t-1': {},
      '@apply flex flex-row': {},
      '@apply gap-32': {},
      '@apply justify-between items-center': {},
      '&-section': {
        '@apply shrink-0': {},
        '@apply flex flex-row': {},
        '@apply justify-start items-center': {},
        '@apply gap-8': {},
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
