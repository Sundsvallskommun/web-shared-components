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
  },
});
