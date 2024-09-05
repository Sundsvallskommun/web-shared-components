export const Avatar = (colors: string[]) => ({
  '.sk-avatar': {
    '@apply inline-flex': {},
    '@apply justify-center items-center': {},
    '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
    '@apply overflow-hidden': {},
    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },

    '&&-sm': {
      '@apply h-32 w-32 min-h-24 max-h-32 min-w-24 max-w-32': {},
      '@apply text-label-small': {},
    },
    '&&-md': {
      '@apply h-40 w-40 min-h-32 max-h-40 min-w-32 max-w-40': {},
      '@apply text-label-medium': {},
    },
    '&&-lg': {
      '@apply h-64 w-64 min-h-40 max-h-64 min-w-40 max-w-64': {},
      '@apply text-label-large': {},
    },
    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},

          '&[data-accent="true"]': {
            [`@apply bg-${color}-surface-accent  text-${color}-text-primary`]: {},
          },
        },
      }),
      {}
    ),
    '&[data-color="primary"]': {
      '@apply bg-primary-surface  text-light-primary': {},

      '&[data-accent="true"]': {
        '@apply bg-inverted-primary-surface  text-inverted-light-primary': {},
      },
    },
    '&-img': {
      '@apply min-w-full min-h-full object-cover': {},
    },
    '&[data-hasimage="true"]': {
      '@apply bg-transparent': {},
    },
  },
});
