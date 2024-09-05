export const AIServiceModule = (colors: string[]) => ({
  '.sk-ai-service-module': {
    '@apply flex gap-0': {},
    '@apply rounded-groups': {},
    '@apply bg-background-content': {},
    '@apply shadow-100': {},

    '&[data-inverted="true"]': {
      '@apply text-inverted-dark-primary': {},
      '@apply bg-inverted-background-content': {},
    },
    '&-row': {
      '@apply flex flex-col': {},
      '@apply grow shrink': {},
      '@apply p-16 md:p-32': {},
      '@apply bg-transparent': {},
      '@apply first:rounded-l-groups': {},
      '@apply last:rounded-r-groups': {},
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
            '@apply text-light-primary': {},
            '&[data-inverted="true"]': {
              [`@apply bg-inverted-${color}-surface-primary`]: {},
              '@apply text-inverted-light-primary': {},
            },
          },
        }),
        {}
      ),
    },

    '&-content': {
      '@apply flex flex-col gap-6 md:gap-24': {},
      '@apply p-4 md:p-8': {},
      '@apply w-full': {},
    },

    '&-header, &-header > *': {
      '@apply font-header text-display-3-sm md:text-display-3-md xl:text-display-3-lg': {},
    },

    '&-form': {
      '@apply w-full': {},
      '@apply flex flex-col': {},
      '@apply gap-8': {},
      '@apply relative': {},

      '&-control': {
        '@apply w-full': {},
      },

      '&-label': {
        '@apply text-label-large': {},
      },

      '&-error': {
        '@apply text-small': {},
      },
      '&-input': {
        '@apply w-full': {},
        '&-group': {
          '@apply w-full': {},
          '.sk-form-input-addin-right': {
            '@apply pr-8': {},
          },
        },
        '&-wrapper': {
          '@apply relative': {},
          '@apply w-full h-48': {},
        },
      },

      '&-readmore': {
        '@apply text-small': {},
        '@apply text-light-secondary': {},
        '&[data-inverted="true"]': {
          '@apply text-inverted-light-secondary': {},
        },
      },
    },

    '&-assistant': {
      '&-expanded': {
        '@apply h-[35em] max-h-[35em]': {},
        '@apply rounded-button': {},
        '@apply overflow-hidden': {},
        '@apply flex flex-col gap-0': {},
        '@apply shadow-200': {},
        '@apply bg-background-content': {},
        '@apply absolute top-0 left-0 right-0': {},

        '&-feed': {
          '@apply shrink grow': {},
          '@apply pl-16 pt-16 pr-48 pb-24': {},
          '@apply max-h-full overflow-y-auto': {},
          '@apply text-dark-primary': {},
          'sk-ai-markdown': {
            '@apply text-dark-secondary': {},
          },
        },

        '&[data-inverted="true"]': {
          '@apply bg-inverted-background-content': {},
          '.sk-ai-service-module-feed': {
            '@apply text-inverted-dark-primary': {},
            'sk-ai-markdown': {
              '@apply text-inverted-dark-secondary': {},
            },
          },
        },
        '&-close-button': {
          '@apply absolute right-12 top-12': {},
        },
      },
    },

    '&-questions': {
      '@apply w-[22.5em] max-w-[22.5em] min-w-[22.5em]': {},
      '@apply flex flex-col gap-12': {},
      '@apply pb-8': {},
      '@apply text-dark-primary': {},
      '&-title, &-title > *': {
        '@apply text-label-large': {},
      },
      '&-list': {
        '@apply flex flex-col gap-8': {},
      },

      '&[data-inverted="true"]': {
        '@apply text-inverted-dark-primary': {},
      },
    },
  },
});
