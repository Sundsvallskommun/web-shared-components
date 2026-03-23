export const Breadcrumb = (colors: string[]) => ({
  '.sk-breadcrumb': {
    '@apply text-body text-base relative': {},

    '&-item': {
      '@apply inline-flex items-center whitespace-nowrap': {},
    },

    '&-separator': {
      '@apply mx-6': {},
    },
  },

  '.sk-breadcrumb-item': {
    span: {
      '&[aria-current="page"]': {
        '@apply font-bold': {},
      },
    },

    [`&[data-color="primary"]`]: {
      'a.sk-link': {
        [`@apply text-secondary`]: {},
      },
    },

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          'a.sk-link': {
            [`@apply text-${color}-text-primary`]: {},
          },
        },
      }),
      {}
    ),
  },
});