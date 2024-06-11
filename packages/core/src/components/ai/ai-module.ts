export const AIModule = (colors: string[]) => ({
  '.sk-ai-module': {
    '@apply fixed': {},
    '@apply z-50': {},
    '@apply overflow-hidden': {},
    '@apply flex flex-col gap-0 items-center justify-start': {},
    '@apply shadow-200': {},
    '@apply transition-all': {},
    '@apply duration-300': {},
    '@apply bottom-0 right-0': {},

    '&-content': {
      '@apply flex w-full gap-0 h-full justify-between': {},
      '@apply overflow-hidden': {},
      '&-row': {
        '@apply flex flex-col': {},
        '@apply bg-background-content': {},
      },
      '&-main': {
        '@apply grow shrink max-h-full max-w-full items-center': {},
      },
    },

    '&-sidebar': {
      '@apply flex flex-col': {},
      '@apply min-w-[22em]': {},
      '@apply h-full': {},
      '@apply overflow-hidden': {},
      '@apply border-r-1 border-r-divider': {},
      '@apply pt-20 px-0 gap-16': {},
      '&-sessions': {
        '@apply flex flex-col': {},
        '@apply grow w-full': {},
        '@apply overflow-y-auto': {},
        '@apply px-24 pb-20 gap-16': {},
      },
    },
    '&-feed': {
      '@apply flex flex-col grow': {},
      '@apply px-16 pt-16 pb-24 gap-16': {},
      '@apply w-full': {},
      '@apply max-h-full overflow-y-auto': {},
      '@apply max-w-full overflow-x-hidden': {},
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
    '.sk-ai-inputsection': {
      '@apply shrink-0': {},
    },
    '&[data-fullscreen="false"]': {
      '@apply rounded-tl-groups': {},
      '@apply max-w-[26em]': {},
      '@apply w-[26em]': {},
      '@apply max-h-[44em]': {},
      '&[data-docked="false"]': {
        '@apply h-[44em]': {},
      },
    },

    '.sk-ai-feed': {
      '@apply w-full': {},
    },
    '&[data-fullscreen="true"]': {
      '@apply w-full': {},
      '.sk-ai-module-feed': {
        '@apply gap-40 grow w-full items-center': {},
        '.sk-ai-feed': {
          '@apply text-base max-w-[50em]': {},
        },
        '&-questions': {
          '@apply flex-row gap-16': {},
          '&-wrapper': {
            '@apply text-base max-w-[50em]': {},
          },
        },
      },
      '.sk-ai-inputsection': {
        '@apply text-base max-w-[50em]': {},
        '@apply pt-20 pb-32': {},
      },
    },
    '&[data-docked="true"]': {
      '@apply h-64 w-[19em]': {},
    },
    '&-header': {
      '@apply flex items-center justify-between': {},
      '@apply w-full': {},
      '@apply shrink-0': {},
      '@apply px-14 py-16': {},
      '@apply transition-all': {},
      '@apply bg-inverted-background-content': {},
      '@apply text-inverted-dark-primary': {},

      '&[data-docked="true"]': {
        '@apply px-12 pt-10 pb-12': {},
        '@apply cursor-pointer': {},
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
        '@apply pt-0 px-24': {},
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
    '.sk-avatar': {
      '@apply transition-all duration-500': {},
    },
  },
});
