module.exports = ButtonGroup = () => ({
  '.sk-btn-group': {
    '@apply inline-flex items-center': {},

    '&.sk-btn-group-attached': {
      '@apply rounded-groups': {},
      '@apply bg-tertiary-surface': {},
      '@apply py-6 px-12': {},

      '> *': {
        '@apply bg-transparent': {},
      },

      '.sk-btn[data-icon="true"] .sk-icon': {
        '@apply bg-transparent text-dark-secondary': {},
      },

      '.sk-icon': {
        '@apply p-0 w-fit h-fit': {},
      },
    },

    '&-divider': {
      '@apply grow bg-tertiary-surface px-6': {},

      hr: {
        '@apply h-[2rem]': {},
      },
    },
  },
});
