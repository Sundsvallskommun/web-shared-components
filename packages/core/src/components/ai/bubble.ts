export const Bubble = (colors: string[]) => ({
  '.sk-ai-bubble': {
    '@apply inline-flex text-left items-center justify-start': {},
    '@apply w-fit': {},
    '@apply focus-visible:ring ring-ring': {},
    '@apply relative': {},
    '@apply rounded-t-button rounded-br-button': {},
    '@apply pt-10 pr-12 pb-10 pl-14': {},
    '@apply gap-16': {},
    '@apply shadow-[0_1px_0_0_rgba(0,0,0,0.2)]': {},
    '@apply text-small': {},
    '@apply text-dark-secondary': {},
    '&[data-inverted="true"]': {
      '@apply text-inverted-dark-secondary': {},
    },
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
          '&[data-inverted="true"]': {
            [`@apply bg-${color}-surface-primary hover:bg-${color}-surface-primary-hover`]: {},
            '.sk-ai-bubble-tail': {
              [`@apply shadow-${color}-surface-primary`]: {},
            },
            '&:hover': {
              '.sk-ai-bubble-tail': {
                [`@apply shadow-${color}-surface-primary-hover`]: {},
              },
            },
          },
        },
      }),
      {}
    ),
    '&[data-color="primary"]': {
      '@apply bg-inverted-primary-surface hover:bg-inverted-primary-surface-hover': {},
      '.sk-ai-bubble-tail': {
        [`@apply shadow-inverted-primary-surface`]: {},
      },
      '&:hover': {
        '.sk-ai-bubble-tail': {
          [`@apply shadow-inverted-primary-surface-hover`]: {},
        },
      },
      '&[data-inverted="true"]': {
        '@apply bg-primary-surface hover:bg-primary-surface-hover': {},
        '.sk-ai-bubble-tail': {
          [`@apply shadow-primary-surface`]: {},
        },
        '&:hover': {
          '.sk-ai-bubble-tail': {
            [`@apply shadow-primary-surface-hover`]: {},
          },
        },
      },
    },
    '&-tail': {
      '@apply text-base': {},
      '@apply absolute left-0 bottom-[-1.25em]': {},
      '@apply w-32 h-32': {},
      '@apply rounded-tl-16 rounded-bl-0': {},
      '@apply bg-transparent': {},
      '@apply shadow-[0_-1em_0_0_var(--tw-shadow-color)]': {},
      '@apply scale-y-[25%]': {},
      '&:before': {
        '@apply content-[""]': {},
        '@apply absolute left-0 bottom-[-0.15625em]': {},
        '@apply w-32 h-32': {},
        '@apply rounded-tl-16 rounded-bl-0': {},
        '@apply bg-transparent': {},
        '@apply shadow-[0_-0.15625em_0_0_rgb(0,0,0,0.2)]': {},
        'clip-path': 'polygon(0 0, 0 1em, 0.25em 1em, 0.59375em 0)',
      },
    },
  },
});
