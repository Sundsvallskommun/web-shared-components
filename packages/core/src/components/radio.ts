export const Radio = () => ({
  '.sk-form-radio': {
    backgroundImage: 'none',

    '@apply relative': {},
    '@apply box-border': {},
    '@apply bg-primitives-overlay-lighten-10': {},
    '@apply dark:bg-primitives-overlay-darken-6': {},
    '@apply border-1': {},
    '@apply border-primitives-overlay-darken-6': {},
    '@apply dark:border-primitives-overlay-lighten-6': {},
    '@apply m-0': {},
    '@apply h-24 w-24': {},

    //Hover
    '@apply hover:after:content-[""]': {},
    '@apply hover:border-primitives-overlay-darken-8': {},
    '@apply hover:dark:border-primitives-overlay-lighten-4': {},
    '&::after': {
      '@apply absolute': {},
      '@apply rounded-full': {},
      '@apply bg-dark-placeholder': {},
      '@apply m-5': {},
      '@apply top-0 left-0 bottom-0 right-0': {},
    },

    //Focus
    '@apply focus-visible:ring': {},
    '@apply focus-visible:bg-background-content': {},
    '@apply focus-visible:border-background-content': {},
    '@apply focus-visible:hover:border-background-content': {},

    //Invalid
    '&[aria-invalid="true"]': {
      '@apply border-2': {},
      '@apply border-error-surface-primary': {},
      '@apply hover:border-2': {},
      '@apply hover:border-error-surface-primary': {},
    },

    //Checked
    '&:checked, &[checked="true"]': {
      '@apply bg-primitives-overlay-lighten-10': {},
      '@apply dark:bg-primitives-overlay-darken-6': {},
      '@apply hover:bg-primitives-overlay-lighten-10': {},
      '@apply hover:dark:bg-primitives-overlay-darken-6': {},
      '@apply focus:bg-primitives-overlay-lighten-10': {},
      '@apply focus:dark:bg-primitives-overlay-darken-6': {},
      '@apply text-primitives-overlay-lighten-10': {},
      '@apply dark:text-primitives-overlay-darken-6': {},
      '@apply hover:text-primitives-overlay-lighten-10': {},
      '@apply hover:dark:text-primitives-overlay-darken-6': {},
      '@apply focus:text-primitives-overlay-lighten-10': {},
      '@apply focus:dark:text-primitives-overlay-darken-6': {},
      '@apply border-primitives-overlay-darken-6': {},
      '@apply focus:border-primitives-overlay-darken-6': {},
      '@apply dark:border-primitives-overlay-lighten-6': {},
      '@apply hover:border-primitives-overlay-darken-8': {},
      '@apply hover:dark:border-primitives-overlay-lighten-4': {},
      '@apply focus:outline-0': {},
      '@apply focus:ring-0 focus:ring-offset-0': {},
      '@apply focus-visible:ring': {},
      '@apply focus-visible:border-transparent': {},
      '@apply after:content-[""]': {},
      '&[aria-invalid="true"]': {
        '@apply border-2': {},
        '@apply border-error-surface-primary': {},
        '@apply hover:border-2': {},
        '@apply hover:border-error-surface-primary': {},
      },
      '&::after': {
        '@apply bg-dark-primary': {},
      },
    },

    '&:active': {
      '@apply ring-0 ring-offset-0': {},
    },

    //Disabled
    '&:disabled, &[disabled="true"]': {
      '@apply border-primitives-overlay-darken-3': {},
      '@apply dark:border-primitives-overlay-lighten-3': {},
      '@apply hover:border-primitives-overlay-darken-3': {},
      '@apply hover:dark:border-primitives-overlay-lighten-3': {},
      '@apply bg-background-200': {},
      '@apply hover:bg-background-200': {},
      '@apply cursor-not-allowed': {},
      '&:not(:checked):not([checked="true"]):after': {
        '@apply hidden': {},
      },
      '&:checked, &[checked="true"]': {
        '&::after': {
          '@apply bg-dark-disabled': {},
        },
      },
    },

    '&-label': {
      '@apply inline-flex align-top items-center': {},
      '@apply font-normal': {},
      '@apply p-2': {},
      '&-sm': {
        '@apply text-small': {},
        '@apply h-28': {},
        '@apply gap-10': {},
      },
      '&-md': {
        '@apply text-base': {},
        '@apply h-28': {},
        '@apply gap-10': {},
      },
      '&-lg': {
        '@apply text-large': {},
        '@apply h-30': {},
        '@apply gap-12': {},
      },
      '&[data-disabled="true"]': {
        '@apply text-dark-disabled': {},
        '@apply cursor-default': {},
      },
    },
    '&-group': {
      '@apply flex flex-row': {},
      '&[data-direction="column"]': {
        '@apply flex-col': {},
      },
      '&-sm': {
        '@apply gap-12': {},
      },
      '&-md': {
        '@apply gap-16': {},
      },
      '&-lg': {
        '@apply gap-16': {},
      },
    },
  },
});
