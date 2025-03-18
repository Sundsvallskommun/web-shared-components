export const AICornerModule = (colors: string[]) => ({
  '.sk-ai-corner-module': {
    '@apply fixed': {},
    '@apply max-w-full': {},
    '@apply max-h-full': {},
    '@apply z-50': {},
    '@apply flex flex-col gap-0 items-center justify-start': {},
    '@apply shadow-200': {},
    '@apply transition-all': {},
    '@apply duration-300': {},
    '@apply bottom-0 right-0': {},
    '@apply bg-background-content': {},

    '&-content': {
      '@apply flex w-full gap-0 h-full justify-between': {},
      '@apply relative': {},
      '&-row': {
        '@apply flex flex-col': {},
      },
      '&-main': {
        '@apply grow shrink max-h-full max-w-full items-center': {},
      },
    },

    '&-sidebar': {
      '@apply flex flex-col': {},
      '@apply lg:w-[22em]': {},
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
      '&-readmore': {
        '@apply text-center': {},
        '@apply max-w-[29em]': {},
        '@apply px-24 pb-16 pt-0': {},
      },
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
      '@apply max-h-[calc(100%-1em)]': {},
      '&[data-mobile="true"]': {
        '@apply rounded-tl-none': {},
        '@apply max-w-full': {},
        '@apply w-full': {},
        '@apply max-h-full': {},
      },
      '&[data-docked="false"]': {
        '@apply h-[44em]': {},
        '&[data-mobile="true"]': {
          '@apply h-full': {},
        },
      },
    },

    '&[data-mobile="true"]': {
      '.sk-ai-corner-module-feed': {
        '&-readmore': {
          '@apply max-w-full': {},
        },
      },
    },
    '.sk-ai-feed': {
      '@apply w-full': {},
    },
    '&[data-fullscreen="true"]': {
      '@apply w-full': {},
      '.sk-ai-corner-module-feed': {
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
      '@apply h-64 md:w-[19em]': {},
      '&[data-mobile="true"]': {
        '@apply w-full': {},
      },
    },
    '&-header': {
      '@apply h-64': {},
      '@apply flex items-center justify-between': {},
      '@apply w-full': {},
      '@apply shrink-0': {},
      '@apply px-14 py-16': {},
      '@apply transition-all': {},
      '@apply bg-inverted-background-content': {},
      '@apply text-inverted-dark-primary': {},
      '@apply rounded-tl-groups': {},

      '&[data-mobile="true"]': {
        '@apply rounded-tl-none': {},
      },
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
        '&-item': {
          '@apply relative flex justify-center': {},
          '.sk-tooltip': {
            '@apply absolute w-max': {},
            '&[data-position="below"]': {
              '@apply top-full': {},
              '@apply mt-12': {},
            },
            '&[data-position="above"]': {
              '@apply bottom-full': {},
              '@apply mb-12': {},
            },
            '&[data-rightoutside="true"]': {
              '@apply ml-[-100%]': {},
              '@apply w-auto': {},
            },
          },
        },
      },

      '&[data-variant="alt"]': {
        '@apply pt-0 px-24': {},
        '@apply h-auto': {},
        '@apply bg-transparent': {},
        '.sk-ai-assistant-avatar': {
          '@apply w-40 h-40 lg:w-56 lg:h-56': {},
        },
        '.sk-ai-corner-module-header-heading': {
          '@apply pb-4': {},
        },
        '.sk-ai-corner-module-header-heading-name': {
          '@apply text-label-large text-dark-primary': {},
        },
        '.sk-ai-corner-module-header-heading-subtitle': {
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
        '@apply rounded-tl-none': {},
        '@apply bg-background-content': {},
        '@apply text-dark-primary': {},
        '@apply px-20 pt-20 pb-12': {},
      },
    },
    '&-sessions': {
      '@apply px-20': {},
      '&-group': {
        '@apply py-8 px-12': {},
      },
      '&-history': {
        '@apply flex flex-col p-8 gap-16': {},
        '&-list': {
          '@apply flex flex-col p-0 gap-8': {},
          '[role="menuitem"]': {
            '@apply max-w-full': {},
            '@apply max-h-none h-auto text-wrap text-left': {},
          },
        },
      },
    },
    '.sk-avatar': {
      '@apply transition-all duration-500': {},
    },
    '&-mobile-menu': {
      '@apply rounded-0 py-16 absolute top-0 bottom-0 overflow-x-hidden': {},
      '@apply px-0': {},
      '@apply rounded-l-button': {},
      '@apply bg-background-100': {},
      '@apply shadow-100': {},
      '@apply transition-all': {},

      '&-top-bar': {
        '@apply flex justify-between items-start': {},
        '@apply pl-0 pr-16': {},
        '.sk-ai-corner-module-header': {
          '@apply shrink': {},
        },
      },
      '&-content': {
        '@apply flex flex-col pt-8': {},
        '[role="menuitem"]': {
          '@apply w-full': {},
        },
      },
      '&[data-show="true"]': {
        '@apply left-16 right-0': {},
      },
      '&[data-show="false"]': {
        '@apply w-0 h-0 left-full': {},
        '.sk-ai-corner-module-mobile-menu': {
          '&-top-bar': {
            '@apply hidden': {},
          },
          '&-content': {
            '@apply hidden': {},
          },
        },
      },
    },

    //ASSISTANT LIBRARY
    '&-assistant-library': {
      '@apply flex justify-between items-center': {},
      '@apply pl-20 pr-14 py-0': {},
      '@apply h-80': {},
      '@apply bg-background-content': {},

      '&-menu': {
        '@apply flex gap-12': {},
        '@apply p-0 m-0': {},
        '&-item': {
          '@apply h-52 w-52': {},
          '@apply rounded-groups': {},
          '@apply relative': {},
          '@apply flex justify-center': {},
          '&-button, & > *:first-child': {
            '@apply h-52 w-52': {},
            '@apply gap-0': {},
            '@apply rounded-groups': {},
            '@apply p-6': {},
            '.sk-ai-assistant-avatar': {
              '@apply w-40 h-40': {},
            },
            '&[aria-current]:not([aria-current="false"])': {
              '@apply bg-primary-surface': {},
              '.sk-ai-assistant-avatar': {
                '@apply ring-1 ring-background-content': {},
              },
            },
          },
          '.sk-tooltip': {
            '@apply absolute top-full mt-4': {},
          },
        },
      },
    },
  },
});
