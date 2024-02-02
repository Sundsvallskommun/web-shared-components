export const Modal = () => ({
  '.sk-modal': {
    '&-wrapper': {
      '@apply fixed inset-0 z-20 overflow-y-auto': {},
      '@apply bg-primitives-overlay-darken-6': {},
      '@apply dark:bg-primitives-overlay-darken-8': {},

      '&-inner': {
        '@apply min-h-screen px-4 text-center': {},
      },
    },

    '&-overlay': {
      '@apply fixed inset-0': {},
    },

    '&-dialog': {
      '@apply text-dark-secondary': {},
      '@apply inline-flex flex-col': {},
      '@apply text-left': {},
      '@apply align-middle': {},
      '@apply transition-all transform': {},
      '@apply rounded-cards': {},
      '@apply bg-background-content': {},
      '@apply dark:bg-background-100': {},
      '@apply px-24 pt-24 pb-40': {},
      '@apply gap-16': {},

      '&-header': {
        '@apply flex justify-between items-center w-full': {},
        '&-title': {
          '@apply grow': {},
          '@apply text-label-medium': {},
        },
      },
    },
    '&-content': {
      '@apply flex flex-col': {},
      '@apply py-8 pb-16 gap-12': {},
      'h1, h2, h3, h4, h5, h6': {
        '@apply text-dark-primary': {},
      },
    },
    '&-footer': {
      '@apply flex flex-row justify-start': {},
      '@apply p-0 gap-12': {},
    },
  },
});
