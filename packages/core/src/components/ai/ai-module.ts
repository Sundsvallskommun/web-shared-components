export const AIModule = (colors: string[]) => ({
  '.sk-ai-module': {
    '@apply absolute': {},
    '@apply flex flex-col gap-0 items-center justify-start': {},
    '@apply shadow-200': {},
    '@apply overflow-hidden': {},
    '@apply transition-all': {},
    '@apply bottom-0 right-0': {},

    '&-content': {
      '@apply flex w-full gap-0 h-full justify-between': {},
      '&-row': {
        '@apply flex flex-col': {},
      },
    },

    '&-sidebar': {
      '@apply flex flex-col': {},
      '@apply min-w-[22em]': {},
      '@apply h-full': {},
      '@apply border-r-1 border-r-divider': {},
      '@apply pt-20 px-24 gap-16': {},
    },
    '&-feed': {
      '@apply flex flex-col grow': {},
      '@apply px-16 pt-16 pb-24 gap-16': {},
      '&-questions': {
        '@apply flex flex-col gap-8 w-full': {},
        '&-title': {
          '@apply text-label-medium text-dark-primary': {},
        },
        '&-wrapper': {
          '@apply flex flex-col gap-16 w-full': {},
        },
      },
    },

    '&[data-fullscreen="false"]': {
      '@apply rounded-tl-groups': {},
      '@apply max-w-[26em]': {},
    },
    '&[data-fullscreen="true"]': {
      '@apply w-full h-full': {},
      '.sk-ai-module-feed': {
        '@apply gap-40 grow w-full items-center': {},
        '&-questions': {
          '@apply flex-row gap-16': {},
        },
      },
    },

    '&-header': {
      '@apply flex items-center justify-between': {},
      '@apply w-full': {},
      '@apply px-14 py-16': {},
      '@apply transition-all': {},
      '@apply bg-inverted-background-content': {},
      '@apply text-inverted-dark-primary': {},

      '&[data-docked="true"]': {
        '@apply px-12 pt-10 pb-12': {},
      },

      '&-title': {
        '@apply flex justify-start items-center': {},
        '@apply gap-12 pr-16': {},
      },
      '&-heading': {
        '@apply flex flex-col gap-0': {},
        '&-name': {
          '@apply text-label-medium': {},
        },
        '&-subtitle': {
          '@apply text-small text-inverted-dark-secondary': {},
        },
      },

      '&-menu': {
        '@apply flex justify-center items-center': {},
        '@apply gap-12': {},
      },

      '&[data-variant="alt"]': {
        '@apply p-0': {},
        '@apply bg-transparent': {},
        '.sk-avatar': {
          '@apply w-56 h-56': {},
        },
        '.sk-ai-module-header-heading-name': {
          '@apply text-label-large text-dark-primary': {},
        },
        '.sk-ai-module-header-heading-subtitle': {
          '@apply text-small text-dark-secondary': {},
        },
      },

      ...colors.reduce(
        (styles, color) => ({
          ...styles,

          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),
      '&[data-fullscreen="true"]': {
        '@apply bg-background-content': {},
        '@apply text-dark-primary': {},
        '@apply px-20 pt-20 pb-12': {},
      },
    },
    '&-sessions': {
      '@apply px-20': {},
      '&-history': {
        '@apply flex flex-col p-8 gap-16': {},
        '&-list': {
          '@apply flex flex-col p-0 gap-8': {},
        },
      },
    },
  },
});