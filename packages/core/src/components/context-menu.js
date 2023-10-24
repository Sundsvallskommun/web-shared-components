module.exports = ContextMenu = () => ({
  '.context-menu-wrapper': {
    '@apply relative inline': {},

    '> a, > button': {
      '@apply inline-flex': {},
    },

    '.context-menu-items': {
      '@apply absolute rounded bg-white border border-body z-10 drop-shadow-md mt-sm flex flex-col justify-start items-start':
        {},
      '.context-menu-item': {
        '@apply text-base text-body hover:text-white focus-within:text-white min-h-[3.5rem] w-full flex justify-start items-center':
          {},

        'a, button': {
          '@apply text-base font-normal min-h-[3.5rem] py-[0.6rem] items-center w-full rounded-none border-transparent px-md flex justify-start':
            {},

          '&.active': {
            '@apply bg-primary text-white': {},
          },

          '.MuiSvgIcon-root': {
            '@apply text-base': {},
          },
        },

        '&:first-child a,&:first-child button': {
          '@apply pt-[0.675rem] pb-[0.525rem]': {},
        },
        '&:last-child a,&:last-child button': {
          '@apply pt-[0.525rem] pb-[0.675rem]': {},
        },
      },

      hr: {
        '@apply mx-sm w-[calc(100%_-_16px)]': {},
      },

      '&.right': {
        '@apply right-0': {},
      },
    },
  },
});
