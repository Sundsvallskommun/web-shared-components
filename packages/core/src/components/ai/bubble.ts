export const Bubble = (colors: string[]) => ({
  '.sk-ai-bubble': {
    '@apply inline-flex items-center justify-center': {},
    '@apply relative': {},
    '@apply rounded-t-button rounded-br-button': {},
    '@apply pt-10 pr-12 pb-10 pl-14': {},
    '@apply gap-16': {},
    '@apply shadow-[0_0.1rem_0_0_rgba(0,0,0,0.2)]': {},
    '@apply text-small': {},
    '@apply text-dark-secondary': {},
    ...colors.reduce(
      (styles, color) => ({
        ...styles,

        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-accent hover:bg-${color}-surface-accent-hover`]: {},
          '.sk-ai-bubble-tail': {
            [`@apply shadow-${color}-surface-accent`]: {},
          },
          '&:hover': {
            '.sk-ai-bubble-tail': {
              [`@apply shadow-${color}-surface-accent-hover`]: {},
            },
          },
        },
      }),
      {}
    ),
    '&-tail': {
      '@apply absolute left-0 bottom-[-2rem]': {},
      '@apply w-32 h-32': {},
      '@apply rounded-tl-16 rounded-bl-0': {},
      '@apply bg-transparent': {},
      '@apply shadow-[0_-1.6rem_0_0_var(--tw-shadow-color)]': {},
      '@apply scale-y-[25%]': {},
      '&:before': {
        '@apply content-[""]': {},
        '@apply absolute left-0 bottom-[-0.25rem]': {},
        '@apply w-32 h-32': {},
        '@apply rounded-tl-16 rounded-bl-0': {},
        '@apply bg-transparent': {},
        '@apply shadow-[0_-0.25rem_0_0_rgb(0,0,0,0.2)]': {},
        'clip-path': 'polygon(0 0, 0 1.6rem, 0.4rem 1.6rem, 0.95rem 0)',
      },
    },
  },
});