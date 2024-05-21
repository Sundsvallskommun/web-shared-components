export const AIFeed = () => ({
  '.sk-ai-feed': {
    '@apply mt-8 p-16 pb-24 pr-16 h-auto overflow-y-auto max-h-full flex flex-col': {},
    '&-entry': {
      '@apply flex items-start gap-12': {},
      '&-avatar': {
        '@apply grow-0 shrink-0 w-fit': {},
      },
      '&-container': {
        '@apply flex flex-col pb-20 gap-20': {},
      },
      '&-content': {
        '@apply break-words max-w-full flex flex-col grow gap-4': {},
      },
      '&-heading': {
        '@apply text-large font-bold': {},
      },
      '&-references': {
        '@apply bg-background-200 rounded-button pt-8 pb-8 pl-20 pr-12 gap-8 text-dark-primary': {},
        '&-header': {
          '@apply text-dark-primary': {},
        },
        '&-list': {
          '&-item': {
            '@apply max-w-full w-full my-8 rounded-6 whitespace-normal text-base': {},
            '.sk-link': {
              '@apply dark:text-black': {},
            },
          },
        },
      },
    },
  },
});
