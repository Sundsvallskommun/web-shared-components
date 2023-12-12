module.exports = SearchBar = (colors) => ({
  '.sk-spinner': {
    '@apply box-border overflow-visible': {},

    path: {
      '@apply stroke-black': {},
    },

    ...colors.reduce((styles, color) => ({
      ...styles,
      [`&[data-color="${color}"]`]: {
        path: {
          [`@apply stroke-${color}-surface-primary`]: {},
        },
      },
    })),
  },
});
