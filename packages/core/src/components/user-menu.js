module.exports = UserMenu = (colors) => ({
  '.usermenu': {
    // "@apply mx-sm mt-sm mb-0 px-md py-0 divide-y divide-y-2 divide-gray-300 bg-white border-2 border-white border-solid rounded":
    '@apply text-body': {},
    // "@apply ": {},
    '&-is-open': {
      // "@apply border-2 border-gray-300 border-solid rounded": {},
      // "box-shadow": "0px 4px 12px rgba(27, 29, 31, 0.12)",
    },

    '&-header': {
      '[aria-expanded="true"] &': {
        '@apply bg-hover': {},
      },
    },
    '&-item': {
      '@apply block px-lg py-md lg:px-md lg:py-sm w-full cursor-pointer text-body no-underline': {},
      '&.active': {
        '@apply bg-hover text-white no-underline': {},
      },
    },
  },
});
