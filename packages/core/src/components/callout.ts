export const Callout = (colors: string[]) => ({
  '.sk-callout': {
    '@apply inline-flex': {},
    '@apply p-4': {},

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          '.sk-callout-content': {
            [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},
          },

          '&[data-inverted="true"]': {
            '.sk-callout-content': {
              '@apply text-inverted-light-primary': {},
              [`@apply bg-inverted-${color}-surface-primary text-inverted-${color}-text-secondary`]: {},
            },
          },
        },
      }),
      {}
    ),

    "&[data-color='tertiary']": {
      '.sk-callout-content': {
        '@apply bg-primary-surface': {},
      },
      '&[data-inverted="true"]': {
        '.sk-callout-content': {
          '@apply text-inverted-light-primary': {},
          '@apply bg-tertiary-surface dark:bg-inverted-primary-surface': {},
        },
      },
    },

    '&-content': {
      '@apply rounded-full': {},
      '@apply h-8 w-8': {},
    },
  },
});
