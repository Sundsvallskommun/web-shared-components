module.exports = PopupMenu = () => ({
  '.sk-popup-menu-wrapper': {
    '@apply relative inline': {},

    '> a, > button': {
      '@apply inline-flex': {},
    },

    '.sk-popup-menu-items': {
      '@apply absolute flex flex-col justify-start items-start mt-16': {},
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
        '@apply h-40': {},

        '&-content': {
          '@apply bg-transparent hover:bg-primitives-gray-200': {},
          '@apply dark:hover:bg-primitives-overlay-lighten-1': {},
          '@apply cursor-pointer': {},
          '@apply flex flex-row shrink-0': {},
          '@apply px-8 py-4 gap-12': {},
          '@apply w-full': {},
          '@apply rounded-utility': {},
          '@apply h-40': {},
          '@apply justify-between': {},
          '@apply text-body font-normal': {},
          '&.active, &:active': {
            '@apply bg-primitives-gray-200': {},
            '@apply dark:bg-primitives-overlay-lighten-1': {},
          },
          svg: {
            '@apply w-[2rem] h-[2rem]': {},
          },
          '> *': {
            '@apply inline-flex shrink-0 flex-nowrap  bg-transparent hover:bg-transparent': {},

            '@apply gap-12': {},
            '@apply h-full': {},
            '@apply min-h-full': {},
            '@apply w-full': {},
            '@apply justify-start': {},
            '@apply p-0 m-0 pr-32': {},
            '@apply border-0': {},
            '@apply items-center': {},
            '@apply no-underline': {},
            fontSize: 'inherit',
            fontWeight: 'inherit',
            color: 'inherit',

            '&.active, &:active': {
              '@apply text-inherit bg-transparent': {},
            },
          },
        },
      },
      '&-sm': {
        '@apply p-8 gap-6': {},
        '.sk-popup-menu-item': {
          '@apply h-32': {},

          '&-content': {
            '@apply gap-10 px-4 py-0': {},
            '@apply text-sm': {},
            '@apply h-32': {},

            svg: {
              '@apply w-[1.8rem] h-[1.8rem]': {},
            },
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
  },
});
