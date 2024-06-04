export const AssistantPresentation = () => ({
  '.sk-ai-assistant-presentation': {
    '@apply flex flex-col gap-16 items-center justify-center': {},
    '@apply text-base': {},
    '@apply h-full grow': {},

    '&-header': {
      '@apply flex flex-col items-center justify-start': {},
      '&-title': {
        '@apply text-dark-primary text-center w-full': {},
      },
      '&-description': {
        '@apply text-dark-secondary text-center w-full': {},
      },
    },

    '&[data-size="lg"]': {
      '@apply min-h-[25.5em]': {},
      '@apply p-24': {},
      '@apply max-w-[27em]': {},

      '.sk-avatar': {
        '@apply w-90-1 h-90-1': {},
        '@apply max-w-90-1 max-h-90-1': {},
      },
      '.sk-ai-assistant-presentation-header': {
        '@apply gap-6 pb-24': {},
        '&-title': {
          '@apply text-h3-lg': {},
        },
        '&-description': {
          '@apply text-lead': {},
        },
      },
    },
    '&[data-size="sm"]': {
      '.sk-avatar': {
        '@apply w-72 h-72': {},
        '@apply max-w-72 max-h-72': {},
      },
      '.sk-ai-assistant-presentation-header': {
        '@apply gap-4 pb-16': {},
        '&-title': {
          '@apply text-h3-md': {},
        },
        '&-description': {
          '@apply text-small': {},
        },
      },
    },
  },
});
