export const MenuBar = (colors: string[]) => ({
  '.sk-menubar': {
    '@apply flex flex-row': {},
    '@apply p-8 gap-16': {},
    '@apply rounded-cards': {},

    '&[data-background="true"]': {
      '@apply bg-background-color-mixin-1': {},
    },

    '&-item': {
      '@apply inline-block': {},
      '@apply relative': {},
      '@apply h-40': {},
      'a, button': {
        color: 'unset',
      },

      '> *:first-child': {
        '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
        '@apply cursor-pointer': {},
        '@apply bg-transparent text-dark-primary': {},
        '@apply hover:bg-tertiary-surface': {},
        '@apply font-bold': {},
        '@apply gap-2 px-14 py-8': {},
        '@apply h-full min-h-full': {},
        '@apply text-base leading-base': {},
        '@apply inline-flex shrink-0 flex-nowrap': {},

        '@apply border-0': {},
        '@apply focus-visible:bg-background-content focus-visible:ring': {},
        '&[aria-current="page"]:not(:hover),&[aria-selected="true"]:not(:hover), ': {
          '@apply bg-primary-surface text-light-primary': {},
          '@apply focus-visible:ring': {},
        },
      },
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            '> *:first-child': {
              [`@apply hover:bg-${color}-surface-accent`]: {},
              [`@apply hover:text-${color}-text-primary`]: {},
              '@apply focus-visible:bg-background-content focus-visible:ring': {},
              '&[aria-current="page"]:not(:hover),&[aria-selected="true"]:not(:hover)': {
                [`@apply bg-${color}-surface-primary`]: {},
                '@apply focus-visible:ring': {},
              },
            },
          },
        }),
        {}
      ),
    },
  },
});
