export const Radio = () => ({
  '.sk-form-radio': {
    backgroundImage: 'none',

    '@apply relative': {},
    '@apply box-border': {},
    '@apply bg-input-field-surface': {},
    '@apply border-1': {},
    '@apply border-input-field-outline': {},
    '@apply m-0': {},
    '@apply h-24 w-24': {},

    //Hover
    '@apply hover:after:content-[""]': {},
    '@apply hover:border-input-field-outline-hover': {},
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
      '@apply bg-input-field-surface': {},
      '@apply hover:bg-input-field-surface': {},
      '@apply focus:bg-input-field-surface': {},
      '@apply text-input-field-surface': {},
      '@apply border-input-field-outline': {},
      '@apply hover:text-input-field-surface': {},
      '@apply focus:text-input-field-surface': {},
      '@apply focus:border-input-field-outline': {},
      '@apply focus:hover:border-input-field-outline-hover': {},
      '@apply hover:border-input-field-outline-hover': {},
      '@apply focus:outline-0': {},
      '@apply focus:ring-0 focus:ring-offset-0': {},
      '@apply focus-visible:ring': {},
      '@apply focus-visible:hover:border-transparent': {},
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
      '@apply border-input-field-outline-disabled': {},
      '@apply hover:border-input-field-outline-disabled': {},
      '@apply bg-input-field-surface-disabled': {},
      '@apply hover:bg-input-field-surface-disabled': {},
      '@apply cursor-not-allowed': {},
      '&:not(:checked):not([checked="true"]):after': {
        '@apply hidden': {},
      },
      '&:checked, &[checked="true"]': {
        '@apply border-input-field-outline-disabled': {},
        '&::after': {
          '@apply bg-dark-disabled': {},
        },
      },
    },

    //ReadOnly
    '&[readonly], &[readonly="true"]': {
      '@apply bg-input-field-surface-disabled': {},
      '@apply border-input-field-outline-disabled': {},
      '@apply hover:border-input-field-outline-disabled': {},
      '&:not(:checked):not([checked="true"]):after': {
        '@apply hidden': {},
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
