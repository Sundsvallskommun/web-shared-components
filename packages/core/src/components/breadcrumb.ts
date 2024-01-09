export const Breadcrumb = () => ({
  '.sk-breadcrumb': {
    '@apply text-body relative': {},

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

    [`&[data-color="vattjom"]`]: {
      'a.sk-link': {
        [`@apply text-vattjom-text-primary`]: {},
      },
    },
  },
});
