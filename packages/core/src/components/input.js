module.exports = Input = () => ({
  '.sk-input': {
    '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
    '@apply border-1': {},
    '@apply border-primitives-overlay-darken-6': {},
    '@apply dark:border-primitives-overlay-lighten-6': {},
    '@apply hover:border-primitives-overlay-darken-8': {},
    '@apply dark:hover:border-primitives-overlay-lighten-4': {},
    '@apply px-12 md:px-16 xl:px-20': {},
    '@apply py-6 md:py-8 xl:py-12': {},
    '@apply gap-6 md:gap-8 xl:gap-8': {},

    '@apply placeholder:text-dark-placeholder': {},
    '@apply text-dark-primary': {},

    '@apply bg-primitives-overlay-lighten-10': {},
    '@apply dark:bg-primitives-overlay-darken-6': {},

    //Invalid
    '&:invalid, &[aria-invalid="true"]': {
      '@apply border-2 border-error-surface-primary': {},
    },

    //Focus
    '@apply focus:ring': {},
    '@apply focus:border-primitives-overlay-lighten-10': {},
    '@apply dark:focus:border-primitives-overlay-darken-6': {},

    //Disabled
    '&:disabled, &[aria-disabled="true"]': {
      '@apply bg-primitives-overlay-darken-1': {},
      '@apply dark:bg-primitives-overlay-lighten-1': {},
      '@apply border-primitives-overlay-darken-3': {},
      '@apply dark:border-primitives-overlay-lighten-3': {},
      '@apply text-dark-disabled': {},
    },
    '&-lg': {
      '@apply text-input-large': {},
    },
    '&-md': {
      '@apply text-input-medium': {},
    },
    '&-sm': {
      '@apply text-input-small': {},
    },
  },
});
