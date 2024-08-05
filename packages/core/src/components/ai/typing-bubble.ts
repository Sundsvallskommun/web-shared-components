export const TypingBubble = () => ({
  '.sk-ai-typing-bubble': {
    '@apply inline-flex items-center justify-center': {},
    '@apply p-12 gap-8 w-min': {},
    '@apply bg-tertiary-surface': {},
    '@apply text-dark-secondary': {},
    '@apply rounded-button': {},
    '&[data-position="left"]': {
      '@apply rounded-br-0': {},
    },
    '&[data-position="right"]': {
      '@apply rounded-bl-0': {},
    },
    '&[data-inverted="true"]': {
      '@apply bg-inverted-tertiary-surface': {},
    },
  },
});
