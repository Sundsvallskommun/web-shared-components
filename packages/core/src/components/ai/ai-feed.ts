export const AIFeed = () => ({
  '.sk-ai-feed': {
    '@apply h-auto max-h-full flex flex-col gap-32': {},
    '&-entry': {
      '@apply flex items-start gap-12': {},
      '&-avatar': {
        '@apply grow-0 shrink-0 w-fit': {},
      },
      '&-container': {
        '@apply flex flex-col pb-20 gap-32': {},
      },
      '&-content': {
        '@apply break-words max-w-full flex flex-col grow gap-4': {},
      },
      '&-heading': {
        '@apply text-large font-bold': {},
      },
      '&-references': {
        '@apply bg-background-200 rounded-button py-0 pl-20 pr-12 gap-8 text-dark-primary': {},
        '&-header': {
          '@apply text-dark-primary': {},
        },
        '&-list': {
          '&-item': {
            '@apply max-w-full w-full my-8 rounded-6 whitespace-normal text-base': {},
            '.sk-link': {
              '@apply dark:text-dark-primary': {},
            },
          },
        },
      },
    },
    '&-live-wrapper': {
      '@apply w-0 h-0 opacity-0': {},
    },

    '&[data-size="lg"]': {
      '.sk-ai-feed-avatar, .sk-avatar': {
        '@apply w-40 h-40': {},
      },
    },
    '&[data-size="sm"]': {
      '.sk-ai-feed-avatar, .sk-avatar': {
        '@apply w-32 h-32': {},
      },
    },
  },
});
