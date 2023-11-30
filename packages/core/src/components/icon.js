module.exports = Icon = (colors) => ({
  '.sk-icon': {
    '@apply inline-flex items-center justify-center': {},

    '&.sk-icon-padded': {
      '@apply rounded-utility': {},
      '@apply text-light-primary fill-light-primary': {},
      '@apply p-[0.4rem]': {},

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
    },

    '&[data-size="fit"]': {
      '@apply w-fit h-fit': {},
    },

    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          '@apply text-inverted-light-primary': {},
          [`@apply text-inverted-${color}-text-secondary fill-inverted-${color}-text-secondary`]: {},

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
      '&[data-inverted="true"]': {
        '@apply text-light-primary fill-light-primary': {},
      },
    },
  },
});
