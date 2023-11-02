module.exports = Header = () => ({
  '.sk-header': {
    '@apply bg-background-content p-12 md:px-32 md:pt-24 md:pb-20 lg:pt-32 lg:pb-20 lg:px-80 lg:h-auto lg:min-h-0': {},
    '@apply shadow-100': {},

    '&-container': {
      '@apply flex flex-col gap-24': {},
    },

    '&-top-content': {
      '@apply flex items-center w-full justify-between m-auto flex-shrink-0 py-4 gap-20': {},
    },
    '&-bottom-content': {
      '@apply flex items-center w-full justify-start p-8 lg:p-0': {},
    },

    '&-usermenu': {
      '@apply hidden lg:flex-shrink md:flex lg:items-center lg:w-auto': {},

      '&-content': {
        '@apply relative flex flex-grow justify-end items-center lg:w-auto': {},
      },
    },
    '&-mobilemenu': {
      '@apply block md:hidden relative': {},
    },
  },
});
