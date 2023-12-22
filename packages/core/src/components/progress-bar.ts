export const ProgressBar = (colors: string[]) => ({
  '.sk-progress-bar': {
    '@apply flex h-[.4rem] rounded-circular bg-background-color-mixin-2': {},

    '&-fill': {
      '@apply rounded-circular': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          '.sk-progress-bar-fill': {
            [`@apply bg-${color}-surface-primary`]: {},
          },

          '&[data-accent="true"]': {
            [`@apply bg-inverted-${color}-surface-primary`]: {},
          },
        },
      }),
      {}
    ),

    "&[data-color='tertiary']": {
      '.sk-progress-bar-fill': {
        [`@apply bg-primary-surface`]: {},
      },
    },
  },
});
