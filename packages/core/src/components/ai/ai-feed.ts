export const AIFeed = () => ({
  '.sk-ai-feed': {
    '@apply text-left': {},
    '@apply h-auto max-h-full flex flex-col gap-32': {},
    '&-entry': {
      '@apply flex items-start gap-12': {},
      '@apply w-full': {},
      '&-avatar': {
        '@apply grow-0 shrink-0 w-fit': {},
      },
      '&-container': {
        '@apply flex flex-col pb-20 gap-20': {},
        '@apply w-full': {},
      },
      '&-content': {
        '@apply break-words max-w-full flex flex-col grow gap-4': {},
      },
      '&-heading': {
        '@apply text-large font-bold': {},
        '&[data-showtitle="false"]': {
          '@apply w-0 h-0 opacity-0': {},
        },
      },
      '&-references': {
        '@apply rounded-button py-0 pl-20 pr-12 gap-8': {},
        '@apply bg-background-200 text-dark-primary': {},

        '&[data-inverted="true"]': {
          '@apply bg-inverted-background-200 text-inverted-dark-primary': {},
        },
        '&-header': {
          '@apply text-dark-primary': {},
          '&[data-inverted="true"]': {
            '@apply text-inverted-dark-primary': {},
          },
        },
        '&-list': {
          '&-item': {
            '@apply max-w-full w-full my-8 rounded-6 whitespace-normal text-base': {},
          },
        },
      },
    },
    '&-live-wrapper': {
      '@apply absolute w-1 h-1 -m-1 overflow-hidden whitespace-nowrap p-0 opacity-0': {},
    },

    '&[data-size="lg"]': {
      '.sk-ai-feed-avatar, .sk-avatar': {
        '@apply w-40 h-40': {},
      },
      '.sk-ai-feed-container': {
        '@apply pb-32 gap-32': {},
        '@apply w-full': {},
      },
    },
    '&[data-size="sm"]': {
      '.sk-ai-feed-avatar, .sk-avatar': {
        '@apply w-32 h-32': {},
      },
    },
  },
});
