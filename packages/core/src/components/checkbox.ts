export const Checkbox = () => ({
  '.sk-form-checkbox': {
    '@apply bg-inherit': {},
    '@apply rounded-utility': {},
    '@apply bg-transparent border-transparent': {},

    // sizing
    '&-sm': {
      '@apply w-24 h-24': {},
    },

    '&-md': {
      '@apply w-24 h-24': {},
    },

    '&-lg': {
      '@apply w-24 h-24': {},
    },

    '+ .sk-icon': {
      '@apply absolute inset-0 my-auto bg-transparent': {},
      '@apply border-1 p-2 border-input-field-outline': {},
      '@apply bg-input-field-surface': {},

      svg: {
        '@apply hidden': {},
      },
    },

    '&&:checked': {
      '@apply text-light-primary bg-none': {},

      '& + .sk-icon': {
        '@apply text-light-primary bg-dark-primary border-dark-primary': {},

        svg: {
          '@apply block': {},
        },
      },
    },

    '&[type="checkbox"]:checked': {
      '@apply text-transparent': {},
    },
    '&&:hover:not(&&-disabled,&&:checked,&&[aria-invalid=true]),&&:hover:focus:not(&&-disabled,&&:checked,&&[aria-invalid=true])':
      {
        '& + .sk-icon, &:focus + .sk-icon': {
          '@apply text-dark-placeholder border-input-field-outline-hover': {},

          svg: {
            '@apply block': {},
          },
        },
      },

    '&&[aria-invalid=true]': {
      '& + .sk-icon': {
        '@apply border-2 border-error-surface-primary': {},
      },

      '&&:checked': {
        '& + .sk-icon': {
          '@apply p-2 bg-background-content text-dark-primary': {},

          svg: {
            '@apply block': {},
          },
        },
      },
    },

    // disabled
    '&&-disabled,&&-disabled:hover': {
      '@apply cursor-not-allowed': {},

      '& + .sk-icon': {
        '@apply bg-input-field-surface-disabled border-input-field-outline-disabled': {},
      },

      '&:checked': {
        '& + .sk-icon': {
          '@apply bg-dark-disabled text-light-primary border-0': {},
        },
      },

      '& ~ .sk-form-checkbox-label': {
        '@apply text-dark-disabled': {},
      },
    },

    //readonly
    '&[readonly], &[readonly="true"]': {
      '@apply border-primitives-overlay-darken-5': {},
      '@apply bg-primitives-gray-50': {},

      '&:hover:checked': {
        '& + .sk-icon': {
          '@apply bg-dark-primary border-dark-primary': {},
        },
      },
      '&:checked': {
        '& + .sk-icon': {
          '@apply bg-dark-secondary border-dark-secondary': {},
        },
      },
    },

    // label
    '&-label-left &-label': {
      '@apply mr-8': {},
    },
    '&-label-right &-label': {
      '@apply ml-8': {},
    },

    '&-label-left': {
      '.sk-icon': {
        '@apply left-auto right-0': {},
      },
    },

    '&-label-right': {
      '.sk-icon': {
        '@apply right-auto left-0': {},
      },
    },

    '&-label': {
      '@apply font-normal text-body select-none text-small': {},

      '&-wrapper': {
        '@apply relative inline-flex align-top items-center cursor-base': {},
      },

      '&-sm': {
        '@apply text-small': {},
      },

      '&-md': {
        '@apply text-base': {},
      },

      '&-lg': {
        '@apply text-large': {},
      },
    },

    '&-group': {
      '@apply flex flex-col gap-16 my-12': {},
      '&[data-direction="row"]': {
        '@apply flex-row': {},
      },
    },
  },
});
