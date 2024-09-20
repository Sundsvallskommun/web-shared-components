export const Dialog = (colors: string[]) => ({
  '.sk-dialog': {
    '@apply w-fit max-w-prose md:min-w-[25em]': {},

    //Confirm dialog
    '&-confirm': {
      '&-label': {
        '@apply flex items-center justify-start gap-4': {},
        '@apply text-dark-primary': {},
        ...colors.reduce(
          (classes, color) => ({
            ...classes,
            [`&[data-color="${color}"]`]: {
              [`@apply text-${color}-text-primary`]: {},
            },
          }),
          {}
        ),
      },
      '&-heading': {
        '@apply text-h3': {},
      },
    },
  },
});
