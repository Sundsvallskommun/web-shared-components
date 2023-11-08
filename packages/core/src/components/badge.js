module.exports = Badge = (colors) => ({
  '.sk-badge': {
    '@apply inline-flex': {},
    '@apply justify-center items-center': {},
    '@apply text-light-primary': {},
    '@apply rounded-utility': {},
    '@apply overflow-hidden': {},

    // size
    '@apply h-[2.4rem] w-[2.4rem]': {},
    '@apply text-label-small': {},

    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},
          // hover
          [`@apply hover:bg-${color}-surface-primary-hover hover:text-light-primary`]: {},
          // keyboard active
          '&.active': {
            [`@apply bg-${color}-surface-primary-hover`]: {},
          },
          [`@apply active:bg-${color}-surface-primary-hover`]: {},

          '&[data-inverted="true"]': {
            '@apply text-inverted-light-primary': {},
            [`@apply bg-inverted-${color}-surface-primary text-inverted-${color}-text-secondary`]: {},
            // hover
            [`@apply hover:bg-inverted-${color}-surface-primary-hover hover:text-inverted-light-primary`]: {},
            // keyboard active
            '&.active': {
              [`@apply bg-inverted-${color}-surface-primary-hover`]: {},
            },
            [`@apply active:bg-inverted-${color}-surface-primary-hover`]: {},
          },
        },
      }),
      {}
    ),

    "&[data-color='primary']": {
      '@apply bg-primary-surface': {},

      '&[data-inverted="true"]': {
        '@apply text-inverted-light-primary': {},
        '@apply bg-inverted-primary-surface': {},
        '@apply hover:bg-inverted-primary-surface-hover': {},
        '&.active': {
          '@apply bg-inverted-primary-surface-hover': {},
        },
        [`@apply active:bg-inverted-primary-surface-hover`]: {},
      },
    },
  },
});
