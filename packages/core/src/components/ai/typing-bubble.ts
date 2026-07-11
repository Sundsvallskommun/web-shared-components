export const TypingBubble = () => ({
  '.sk-ai-typing-bubble': {
    '@apply inline-flex items-center justify-center': {},
    '@apply text-small': {},
    '@apply min-h-30 px-12 py-6 gap-6 w-min': {},
    '@apply bg-tertiary-surface': {},
    '@apply text-dark-secondary': {},
    '@apply rounded-button': {},
    '&[data-position="left"]': {
      '@apply rounded-br-0': {},
    },
    '&[data-position="right"]': {
      '@apply rounded-bl-0': {},
      '@apply justify-start': {},
    },
    '&[data-inverted="true"]': {
      '@apply bg-inverted-tertiary-surface': {},
      '@apply justify-end': {},
    },
  },
});
