export const Dot = (colors: string[]) => ({
  '.dot': {
    '@apply relative inline-flex rounded-full': {},
    '&-solid': {
      '@apply bg-neutral-500': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),

      '&.dot-bordered': {
        '@apply border-2 border-white': {},
        '@apply dark:border-neutral-800': {},
      },

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&.dot-bordered[data-color="${color}"]`]: {
            [`@apply border-${color}-background-200`]: {},
          },
        }),
        {}
      ),
    },

    '&-outline': {
      '@apply bg-white border-2 border-neutral-500': {},
      '@apply dark:bg-neutral-800': {},
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply border-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),
    },

    '&-3xs': {
      '@apply w-1.5 h-1.5': {},
    },

    '&-2xs': {
      '@apply w-2 h-2': {},
    },

    '&-xs': {
      '@apply w-2.5 h-2.5': {},
    },

    '&-sm': {
      '@apply w-3 h-3': {},
    },

    '&-md': {
      '@apply w-3.5 h-3.5': {},
    },

    '&-lg': {
      '@apply w-4 h-4': {},
    },

    '&-xl': {
      '@apply w-5 h-5': {},
    },

    '&-2xl': {
      '@apply w-6 h-6': {},
    },

    '&-3xl': {
      '@apply w-8 h-8': {},
    },
  },
});
