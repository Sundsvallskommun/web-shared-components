module.exports = PopupMenu = () => ({
  '.sk-popup-menu-items': {
    '&[data-position="left"]': {
      '@apply mt-0 mr-8 right-[100%]': {},
      '&[data-align="end"]': {
        '@apply bottom-0': {},
      },
      '&[data-align="start"]': {
        '@apply top-0': {},
      },
    },
    '&[data-position="right"]': {
      '@apply mt-0 ml-8 left-[100%]': {},
      '&[data-align="end"]': {
        '@apply bottom-0': {},
      },
      '&[data-align="start"]': {
        '@apply top-0': {},
      },
    },
    '&[data-position="over"]': {
      '@apply mt-0 mb-8 bottom-[100%]': {},
      '&[data-align="end"]': {
        '@apply right-0': {},
      },
      '&[data-align="start"]': {
        '@apply left-0': {},
      },
    },
    '&[data-position="under"]': {
      '&[data-align="end"]': {
        '@apply right-0': {},
      },
      '&[data-align="start"]': {
        '@apply left-0': {},
      },
    },
    '@apply absolute flex flex-col justify-start items-start mt-8': {},
    '@apply w-max': {},
    '@apply rounded-utility': {},
    '@apply bg-background-100': {},
    '@apply z-10': {},
    '@apply p-8 gap-4': {},
    '@apply shadow-100': {},
    '@apply border-0': {},
    '@apply focus-within:border-0': {},
    '@apply focus:outline-0 focus-visible:outline-0 focus-visible:ring': {},

    '.sk-popup-menu-item': {
      '@apply w-full': {},
      '@apply h-[4rem]': {},
      '@apply min-h-[4rem]': {},
      '@apply bg-transparent hover:bg-primitives-gray-200': {},
      '@apply dark:hover:bg-primitives-overlay-lighten-1': {},
      '@apply cursor-pointer': {},
      '@apply flex flex-row shrink-0': {},
      '@apply pl-8 pr-32 py-4 gap-12': {},

      '@apply rounded-utility': {},
      '@apply text-body font-normal': {},
      '&.active, &:active': {
        '@apply bg-primitives-gray-200': {},
        '@apply dark:bg-primitives-overlay-lighten-1': {},
      },
      svg: {
        '@apply w-[2rem] h-[2rem]': {},
      },

      '@apply justify-start': {},

      '@apply border-0': {},
      '@apply items-center': {},
      '@apply no-underline': {},
    },
    '&-group': {
      '@apply w-full flex flex-col border-b-1 border-divider pb-4 gap-4': {},
      '&:first-child': {
        '@apply pt-0': {},
      },
      '&:last-child': {
        '@apply border-0 pb-0': {},
      },
      '> *': {
        '@apply pl-8 pr-32 py-4 gap-12': {},
      },
    },
    '&-sm': {
      '@apply p-8 gap-6': {},

      '.sk-popup-menu-item': {
        '@apply h-[3.2rem]': {},
        '@apply min-h-[3.2rem]': {},
        '@apply gap-10 pl-8 pr-24 py-4': {},

        '@apply text-small': {},
        '&-group': {
          '@apply gap-6 pb-6': {},
          '> *': {
            '@apply gap-10 pl-8 pr-24 py-4': {},
          },
        },
        svg: {
          '@apply w-[1.8rem] h-[1.8rem]': {},
        },
      },
    },
    '&.right': {
      '@apply right-0': {},
    },
  },
});
