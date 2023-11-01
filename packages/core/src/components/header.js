module.exports = Header = (colors) => ({
  '.header': {
    '@apply lg:border-t-8 lg:border-primary lg:static lg:w-auto lg:h-auto lg:min-h-0': {},

    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply border-${color}-text`]: {},
        },
      }),
      {}
    ),

    [`&[data-color="none"]`]: {
      [`@apply border-none`]: {},
    },

    '&-container': {
      '@apply flex lg:h-[112px] shadow-lg relative mx-auto px-7 pt-[22px] pb-[8px] z-10': {},
    },

    '&-content': {
      '@apply flex items-center w-full justify-between m-auto flex-shrink-0 text-body max-w-[140rem]': {},
    },

    '&-usermenu': {
      '@apply lg:-mr-lg block flex-shrink lg:flex lg:items-center lg:w-auto': {},

      '&-content': {
        '@apply flex flex-grow lg:flex justify-end items-center lg:w-auto': {},
      },
    },
  },
});
