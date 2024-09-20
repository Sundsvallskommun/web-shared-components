export const PopupMenu = () => ({
  '.sk-popup-menu': {
    '@apply hidden': {},
    '&[data-open="true"]': {
      '@apply flex': {},
    },
    '&[data-position="left"]': {
      '@apply mt-0 mr-8 right-full': {},
      '&[data-align="end"]': {
        '@apply bottom-0': {},
      },
      '&[data-align="start"]': {
        '@apply top-0': {},
      },
    },
    '&[data-position="right"]': {
      '@apply mt-0 ml-8 left-full': {},
      '&[data-align="end"]': {
        '@apply bottom-0': {},
      },
      '&[data-align="start"]': {
        '@apply top-0': {},
      },
    },
    '&[data-position="over"]': {
      '@apply mt-0 mb-8 bottom-full': {},
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
    '> *': {
      '@apply max-w-full w-full': {},
    },

    '@apply absolute flex-col justify-start items-start mt-8': {},
    '@apply w-max': {},
    '@apply rounded-utility': {},
    '@apply bg-background-100': {},
    '@apply z-10': {},
    '@apply p-8 gap-4': {},
    '@apply shadow-100': {},
    '@apply border-0': {},
    '@apply focus-within:border-0': {},
    '@apply focus:outline-0 focus-visible:outline-0 focus-visible:ring': {},
    '.sk-form-checkbox-label-left .sk-icon': {
      '@apply right-8': {},
    },
    '.sk-form-checkbox-label-right .sk-icon': {
      '@apply left-8': {},
    },
    '.sk-popup-menu-item': {
      '@apply list-none': {},
      '@apply w-full': {},
      '@apply h-40': {},
      '@apply min-h-40': {},
      '@apply bg-transparent hover:bg-primitives-gray-200': {},
      '@apply dark:hover:bg-primitives-overlay-lighten-1': {},
      '@apply cursor-pointer': {},
      '@apply flex flex-row shrink-0': {},
      '@apply pl-8 pr-8 py-4 gap-12': {},
      '@apply ring-offset-0': {},
      '@apply focus-visible:ring ring-ring': {},
      '@apply rounded-utility': {},
      '@apply text-body font-normal': {},
      '> *': {
        '@apply max-w-full': {},
      },
      '&:focus-visible, &:focus-within': {
        '@apply bg-primitives-gray-200': {},
        '@apply dark:bg-primitives-overlay-lighten-1': {},
      },
      svg: {
        '@apply w-20 h-20': {},
      },

      '@apply justify-start': {},

      '@apply border-0': {},
      '@apply items-center': {},
      '@apply no-underline': {},
      '&-submenu': {
        '&-wrapper': {
          '@apply relative': {},
        },
      },
    },

    '&-group': {
      '@apply w-full flex flex-col border-b-1 border-divider pb-4 pt-4 gap-4': {},
      '&:first-child': {
        '@apply pt-0': {},
      },
      '&:last-child': {
        '@apply border-0 pb-0': {},
      },
    },

    '&-items': {
      '@apply w-full': {},
      '@apply rounded-utility': {},
      '@apply focus-within:ring ring-ring': {},
      '.sk-popup-menu-item': {
        '@apply focus-visible:ring-0 ring-transparent ring-offset-0': {},
        '> *': {
          '@apply focus-visible:ring-0 ring-transparent ring-offset-0': {},
        },
      },
      '&:focus-within': {
        '.sk-popup-menu-item.active': {
          '@apply bg-primitives-gray-200': {},
          '@apply dark:bg-primitives-overlay-lighten-1': {},
        },
      },
    },

    '&-sm': {
      '@apply p-8 gap-6': {},

      '.sk-popup-menu-item': {
        '@apply h-32': {},
        '@apply min-h-32': {},
        '@apply gap-10 pl-8 pr-8 py-4': {},

        '@apply text-small': {},
        '&-group': {
          '@apply gap-6 pb-6': {},
          '> *': {
            '@apply gap-10 pl-8 pr-8 py-4': {},
          },
        },
        svg: {
          '@apply w-18 h-18': {},
        },
      },
    },
    '&.right': {
      '@apply right-0': {},
    },
  },
});
