module.exports = PopupMenu = () => ({
  '.sk-popup-menu-wrapper': {
    '@apply relative inline': {},

    '> a, > button': {
      '@apply inline-flex': {},
    },
  },
  '.sk-popup-menu-items': {
    '@apply absolute flex flex-col justify-start items-start mt-8': {},
    '@apply w-max': {},
    '@apply rounded-utility': {},
    '@apply bg-white': {},
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
    '&-sm': {
      '@apply p-8 gap-6': {},
      '.sk-popup-menu-item': {
        '@apply h-[3.2rem]': {},
        '@apply min-h-[3.2rem]': {},

        '@apply gap-10 pl-4 pr-24 py-0': {},
        '@apply text-sm': {},

        svg: {
          '@apply w-[1.8rem] h-[1.8rem]': {},
        },
      },
    },

    hr: {
      '@apply w-full mx-sm w-[calc(100%_-_16px)]': {},
    },

    '&.right': {
      '@apply right-0': {},
    },
  },
});
