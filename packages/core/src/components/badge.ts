export const Badge = (colors: string[]) => ({
  '.sk-badge': {
    '@apply inline-flex': {},
    '@apply justify-center items-center': {},
    '@apply text-light-primary': {},
    '@apply rounded-utility': {},
    '@apply overflow-hidden': {},

    // size
    '@apply min-w-24': {},
    '@apply p-4': {},
    '@apply text-label-small': {},

    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},

          '&[data-inverted="true"]': {
            '@apply text-inverted-light-primary': {},
            [`@apply bg-inverted-${color}-surface-primary text-inverted-${color}-text-secondary`]: {},
          },
        },
      }),
      {}
    ),

    "&[data-color='tertiary']": {
      '@apply bg-primary-surface': {},

      '&[data-inverted="true"]': {
        '@apply text-inverted-light-primary': {},
        '@apply bg-tertiary-surface dark:bg-inverted-primary-surface': {},
      },
    },
  },
});
