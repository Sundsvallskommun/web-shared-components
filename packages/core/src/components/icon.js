module.exports = Icon = (colors) => ({
  '.sk-icon': {
    '@apply inline-flex items-center justify-center': {},
    '@apply text-light-primary fill-light-primary': {},
    '@apply rounded-utility': {},

    // size
    '@apply p-[0.4rem]': {},

    '&[data-size="fit"]': {
      '@apply p-0 w-fit h-fit': {},
    },

    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary text-${color}-text-secondary fill-${color}-text-secondary`]: {},

          '&[data-inverted="true"]': {
            '@apply text-inverted-light-primary': {},
            [`@apply bg-inverted-${color}-surface-primary text-inverted-${color}-text-secondary fill-inverted-${color}-text-secondary`]:
              {},
          },
        },
      }),
      {}
    ),

    "&[data-color='primary']": {
      '@apply bg-primary-surface text-light-primary fill-light-primary': {},

      '&[data-inverted="true"]': {
        '@apply text-inverted-light-primary fill-inverted-light-primary': {},
        '@apply bg-tertiary-surface': {},
      },
    },

    '&[data-variant="ghost"]': {
      '@apply bg-transparent': {},
      '@apply text-current': {},

      '&[data-inverted="true"]': {
        [`@apply bg-transparent`]: {},
      },

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-surface-primary fill-${color}-surface-primary`]: {},

            '&[data-inverted="true"]': {
              [`@apply text-inverted-${color}-surface-primary fill-inverted-${color}-surface-primary`]: {},
            },
          },
        }),
        {}
      ),
    },
  },
});
