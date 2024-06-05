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
  },
});
