module.exports = Footer = (colors) => ({
  '.footer': {
    '&-innerwrapper': {
      '@apply bg-background-100 text-white py-12': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),
    },

    '&-content': {
      '@apply px-md md:flex items-center justify-center m-auto': {},
    },

    '&-bottomlinks': {
      '@apply  bg-background-100 text-body py-md': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),

      '&-container': {
        '@apply px-md flex items-center items-center justify-center m-auto md:space-x-10 flex-col md:flex-row': {},
        '> *': {
          '@apply text-body text-small py-sm': {},
        },
      },
    },
  },
});
