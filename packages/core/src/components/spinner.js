module.exports = SearchBar = (colors) => ({
  '.sk-spinner': {
    '@apply box-border overflow-visible': {},

    circle: {
      '@apply fill-none stroke-current': {},
      '@apply stroke-[10rem] origin-center': {},
      cx: '50%',
      cy: '50%',
      r: '50%',
      strokeWidth: '15%',
      strokeLinecap: 'round',
    },

    ...colors.reduce((styles, color) => ({
      ...styles,
      [`&[data-color="${color}"]`]: {
        circle: {
          [`@apply stroke-${color}-surface-primary`]: {},
        },
      },
    })),
  },
});
