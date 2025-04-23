export const Spinner = (colors: string[]) => ({
  '.sk-spinner': {
    '@apply box-border': {},
    '@apply flex justify-center items-center object-center': {},
    '@apply overflow-hidden': {},

    svg: {
      '@apply stroke-dark-secondary': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          svg: {
            [`@apply stroke-${color}-surface-primary`]: {},
          },
        },
      }),
      {}
    ),
  },
});
