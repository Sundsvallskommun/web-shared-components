export const TypingSequence = (colors: string[]) => ({
  '.sk-ai-typing-sequence': {
    '@apply bg-transparent': {},
    '@apply inline-flex': {},
    '@apply h-5 w-fit gap-6': {},
    '&-dot': {
      '@apply rounded-full': {},
      '@apply block': {},
      '@apply w-5 h-5': {},
      '@apply bg-dark-secondary': {},
      '&[data-inverted="true"]': {
        [`@apply bg-inverted-dark-secondary`]: {},
      },
      '&[data-order="1"]': {
        '@apply animate-typing-bounce-1': {},
      },
      '&[data-order="2"]': {
        '@apply animate-typing-bounce-2': {},
      },
      '&[data-order="3"]': {
        '@apply animate-typing-bounce-3': {},
      },
      ...colors.reduce(
        (styles, color) => ({
          ...styles,

          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
            '&[data-inverted="true"]': {
              [`@apply bg-inverted-${color}-surface-primary`]: {},
            },
          },
        }),
        {}
      ),
    },
  },
});
