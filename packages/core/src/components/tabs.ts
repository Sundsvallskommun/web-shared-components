export const Tabs = (colors: string[]) => ({
  '.sk-tabs': {
    '@apply w-full': {},

    '&-list': {
      '@apply flex items-center gap-20 border-b-1 border-transparent': {},

      '&[data-underline="true"]': {
        '@apply border-divider': {},
      },

      '&-item': {
        '@apply flex flex-col gap-y-10': {},

        '&[data-size="sm"]': {
          '> button': {
            '@apply text-small': {},
          },
        },

        '&:hover': {
          // hover
          '.sk-tabs-list-item-divider': {
            '@apply opacity-90': {},
          },
        },

        '&-button': {
          '@apply h-auto border-0 py-0 px-2': {},
          // ring
          '@apply rounded-4': {},

          '&[aria-disabled="true"]': {
            '@apply text-dark-disabled cursor-default': {},
          },

          '&:focus-visible': {
            // focus
            '@apply ring-[.3rem]': {},
            '@apply ring-ring': {},
            '@apply ring-offset-background-content': {},
            '@apply outline-0': {},
          },

          '.sk-callout': {
            '@apply absolute self-end': {},
          },
        },

        '.sk-tabs-list-item-divider': {
          '@apply m-0 min-h-2 h-2 opacity-0': {},
        },

        '&[data-current="true"]': {
          '.sk-tabs-list-item-divider': {
            '@apply opacity-100': {},
          },
        },

        ...colors.reduce(
          (styles, color) => ({
            ...styles,
            [`&[data-color="${color}"]`]: {
              '.sk-tabs-list-item-divider': {
                [`@apply bg-${color}-surface-primary`]: {},
              },
            },
          }),
          {}
        ),
        "&[data-color='tertiary']": {
          '.sk-tabs-list-item-divider': {
            '@apply bg-primary-surface': {},
          },
        },
      },
    },

    '&-panels': {
      '@apply mt-20': {},
    },

    '&-content': {
      '&:not([data-selected="true"])': {
        '@apply hidden': {},
      },
    },
  },
});
