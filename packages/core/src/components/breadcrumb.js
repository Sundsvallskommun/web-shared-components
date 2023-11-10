module.exports = Breadcrumb = (colors) => ({
  '.breadcrumb': {
    '@apply text-body relative': {},

    '&-item': {
      '@apply inline-flex items-center whitespace-nowrap': {},
    },

    '&-separator': {
      '@apply mx-6': {},
    },
  },


  '.breadcrumb-item': {

    'span': {
      '&[aria-current="page"]': {
        '@apply font-bold': {},
      },  
    },
    
    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          'a.link': {
            [`@apply text-${color}-text-primary`]: {},
          }
        },
      }),
      {}
    ),
  }
});