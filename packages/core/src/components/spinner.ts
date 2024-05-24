export const Spinner = (colors: string[]) => ({
  '.sk-spinner': {
    '@apply box-border': {},
    '@apply flex justify-center items-center object-center': {},
    '@apply overflow-hidden': {},

    '&-lottie': {
      '@apply w-[200%] h-[200%] my-0 mr-0 ml-[-50%]': {},
    },
    path: {
      '@apply stroke-dark-secondary': {},
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          path: {
            [`@apply stroke-${color}-surface-primary`]: {},
          },
        },
      }),
      {}
    ),
  },
});
