export const Label = (colors: string[]) => ({
  '.sk-label': {
    '@apply inline-flex flex-row': {},
    '@apply justify-center items-center': {},
    '@apply gap-6 px-10 py-4': {},
    '@apply h-24 max-h-24': {},
    '@apply text-label-small': {},

    '@apply rounded-utility-sm md:rounded-utility-md xl:rounded-utility-lg': {},

    '@apply bg-dark-primary': {},
    '@apply text-light-primary': {},

    '&[data-rounded="true"]': {
      '@apply rounded-full': {},
    },
    '&[data-inverted="true"]': {
      '@apply bg-tertiary-surface': {},
      '@apply text-dark-primary': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary`]: {},
          [`@apply text-${color}-text-secondary`]: {},
          '&[data-inverted="true"]': {
            [`@apply bg-${color}-surface-accent`]: {},
            [`@apply text-${color}-text-primary`]: {},
          },
        },
      }),
      {}
    ),
    '&[data-color="tertiary"]': {
      '@apply bg-dark-primary': {},
      '@apply text-light-primary': {},
      '&[data-inverted="true"]': {
        '@apply bg-tertiary-surface': {},
        '@apply text-dark-primary': {},
      },
    },
  },
});
