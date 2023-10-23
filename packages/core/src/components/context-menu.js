module.exports = ContextMenu = () => ({
  '.context-menu-wrapper': {
    '.context-menu-items': {
      '@apply absolute bg-white border border-body z-10 drop-shadow-md mt-sm flex flex-col justify-start items-start':
        {},
      '.context-menu-item': {
        '@apply text-body hover:text-white focus-within:text-white min-h-[3.5rem] w-full flex justify-start items-center':
          {},

        'a, button': {
          '@apply text-sm font-normal min-h-[3.5rem] items-center w-full rounded-none border-transparent px-md flex justify-start':
            {},

          '&.active': {
            '@apply bg-primary text-white': {},
          },

          svg: {
            '@apply text-sm': {},
          },
        },
      },
    },
  },
});
