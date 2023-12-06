module.exports = ZebraTable = () => ({
  '.sk-zebratable-wrapper': {
    '@apply rounded-groups': {},
    '@apply border-1': {},
    '@apply bg-background-content': {},
    '&-inside': {
      '@apply border-0 rounded-t-groups': {},
      '@apply overflow-hidden': {},
    },
    '&[data-variant="table"]': {
      '&:not([data-background="true"])': {
        '@apply border-0': {},
        '@apply bg-transparent': {},
      },
      '.sk-zebratable-wrapper-inside': {
        '@apply border-0 rounded-b-groups': {},
      },
    },
  },
  '.sk-zebratable': {
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
      '@apply px-16': {},
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

          "&[data-sortmodeascending='true']": {
            svg: {
              '@apply last-of-type:text-dark-ghost': {},
            },
          },

          "&[data-sortmodeascending='false']": {
            svg: {
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
      },

      '&-td': {
        '@apply py-20 px-18': {},
        '@apply text-small': {},
      },
    },

    '&[data-dense="true"]': {
      '.sk-zebratable': {
        '&-thead': {
          '&-th': {
            '@apply py-12': {},
          },
        },
        '&-tbody': {
          '&-td': {
            '@apply py-12': {},
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
