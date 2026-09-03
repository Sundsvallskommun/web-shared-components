export const MarkdownRendered = () => ({
  '.sk-ai-markdown': {
    '@apply flex flex-col gap-32': {},
    '&-p': {
      '@apply mb-0 my-0 break-words': {},
    },
    '&-a': {
      '@apply my-8': {},
    },
    '&-ol': {
      '@apply list-decimal ml-24 my-0': {},
    },
    '&-ul': {
      '@apply list-disc ml-24 my-0': {},
    },
    '&-li': {
      '@apply my-16': {},
    },
    '&-code': {
      '@apply bg-background-100 p-4': {},
    },
    '&-pre': {
      '@apply bg-background-100 text-dark-primary border-1 border-divider p-24 rounded-cards overflow-auto': {},
      '.sk-ai-markdown-code': {
        '@apply bg-transparent p-0': {},
      },
    },
    '&-inline-reference': {
      '@apply relative py-0 px-2': {},
      '&-button': {
        '@apply h-22 min-h-22 min-w-22 p-4 text-label-extra-small': {},
      },
      '&-inline': {
        '@apply inline-flex items-center gap-4 align-middle flex-wrap': {},
      },
      '&-panel': {
        '@apply inline-flex min-w-0 max-w-full break-words rounded-utility bg-background-100 p-8 -mt-8 -mb-8 shadow-100 z-10':
          {},
      },
    },
  },
});
