module.exports = UserMenu = (colors) => ({
  '.sk-usermenu': {
    '@apply text-body mx-auto lg:mx-sm lg:relative': {},

    '[data-show-on-mobile="false"]': {
      '@apply max-lg:hidden': {},
    },
    '[data-show-on-desktop="false"]': {
      '@apply lg:hidden': {},
    },
    '&-wrapper': {
      '@apply block max-lg:-mr-md': {},
    },

    '&-button': {
      '&-content': {
        '@apply max-lg:font-bold lg:items-center lg:text-left': {},
      },
      '&-icon': {
        '@apply !text-2xl ml-auto align-top max-lg:mr-2 max-lg:text-primary': {},
      },
    },

    '&-first-row': {
      '@apply max-lg:hidden bg-white border-t-2 pb-sm -mt-0 mx-md': {},
    },

    '&-label': {
      '@apply flex align-middle mt-md lg:mb-xs': {},
      '&-content': {
        '@apply inline-block px-lg py-md lg:pl-md lg:pr-md lg:py-sm text-sm font-semibold uppercase whitespace-nowrap':
          {},
      },
      '&-line': {
        '@apply inline-block w-full h-px border-gray-300 border-t-2 mt-[2.6rem] lg:hidden': {},
      },
    },

    '&-body': {
      '@apply py-sm absolute rounded border-t-0 bg-white mt-6 right-0 left-0 border-none max-lg:shadow-lg lg:-mt-2 lg:border-2 lg:border-solid lg:border-white':
        {},
      '&[data-open="true"]': {
        '@apply lg:border-gray-300 lg:border-t-0 lg:shadow-lg': {},
      },
    },

    '&-header': {
      '@apply px-md py-sm bg-white border-none rounded lg:border-2 lg:border-solid lg:border-b-0 lg:border-transparent':
        {},
      '&[aria-expanded="true"]': {
        '@apply lg:border-gray-300 lg:shadow-none': {},
      },
    },
    '&-group': {
      'a, button': {
        '@apply block px-lg py-md lg:px-md lg:py-sm w-full cursor-pointer text-body no-underline': {},
        '&.active': {
          '@apply bg-hover text-white no-underline': {},
        },
      },
      '&.active': {
        'a, button': {
          '@apply bg-hover text-white no-underline': {},
        },
      },
    },
    '&-divider': {
      '@apply bg-white border-t-2 pb-sm mt-sm mx-md': {},
    },
  },
});
