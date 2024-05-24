export const AIModule = (colors: string[]) => ({
  '.sk-ai-module': {
    '@apply absolute': {},
    '@apply flex flex-col gap-0 items-center justify-start': {},
    '@apply shadow-200': {},
    '@apply overflow-hidden': {},
    '@apply transition-all': {},
    '@apply bottom-0 right-0': {},
    '&[data-fullscreen="false"]': {
      '@apply rounded-tl-groups': {},
    },
    '&[data-fullscreen="true"]': {
      '@apply w-full h-full': {},
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
  },
});
