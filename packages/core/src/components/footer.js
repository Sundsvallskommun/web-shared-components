module.exports = Footer = (colors) => ({
  '.footer': {
    '&-innerwrapper': {
      '@apply bg-gray text-white py-12': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}`]: {},
          },
        }),
        {}
      ),
    },

    '&-content': {
      '@apply px-md md:flex items-center justify-center m-auto': {},
    },

    '&-bottomlinks': {
      '@apply bg-gray-middle text-body py-md': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}`]: {},
          },
        }),
        {}
      ),

      '&-container': {
        '@apply px-md flex items-center items-center justify-center m-auto md:space-x-10 flex-col md:flex-row': {},
        '> *': {
          '@apply text-body text-sm leading-sm py-sm': {},
        },
      },
    },
  },
});
