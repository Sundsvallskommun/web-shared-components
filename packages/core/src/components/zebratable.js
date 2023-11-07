module.exports = ZebraTable = () => ({
  '.sk-zebratable-wrapper': {
    '@apply rounded-groups': {},
    '@apply border-1': {},
    '&-inside': {
      '@apply border-0 rounded-t-groups': {},
      '@apply overflow-hidden': {},
    },
  },
  '.sk-zebratable': {
    '@apply w-full text-left table-auto': {},
    '@apply text-dark-secondary': {},

    '&-thead': {
      '&-tr': {
        '@apply hidden lg:table-row': {},
        '@apply text-label-sm leading-label-sm': {},
        '@apply font-bold': {},
      },

      '&-th': {
        '@apply py-16 px-16': {},

        "&[data-isColumnSortable='true']": {
          '@apply cursor-pointer': {},
        },
      },
      '@apply bg-transparent': {},
      '&[data-background="true"]': {
        '@apply bg-vattjom-background-200': {},
      },
    },

    '&-sortbutton': {
      '@apply flex items-center': {},

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
      '@apply text-dark-secondary bg-background-content': {},

      '&-tr': {
        '@apply bg-transparent': {},
        '@apply hover:bg-background-100': {},
        '@apply border-b-1': {},
        '@apply last-of-type:border-b-transparent': {},
        // '&.highlighted': {
        //   '@apply lg:border-4 lg:border-hover': {},
        // },
      },

      '&-td': {
        '@apply py-20 px-18': {},
        '@apply text-sm leading-sm': {},
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
      '@apply w-full text-sm leading-sm flex justify-between': {},
    },

    '&-bottom': {
      '@apply py-14 px-16': {},
      '@apply border-t-1': {},
      '@apply flex flex-row': {},
      '@apply justify-between items-center': {},
      '&-section': {
        '@apply flex flex-row': {},
        '@apply justify-start items-center': {},
        '@apply gap-8': {},
        '&-label': {
          '@apply font-normal': {},
          '@apply text-sm leading-sm': {},
          '@apply shrink-0': {},
        },
      },
      '&-pagination': {
        '@apply grow': {},
      },
    },
  },
});
