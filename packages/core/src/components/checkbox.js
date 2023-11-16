module.exports = Checkbox = () => ({
  '.sk-form-checkbox': {
    '@apply bg-inherit': {},
    '@apply rounded-utility': {},
    '@apply bg-transparent border-transparent': {},

    // sizing
    '&-sm': {
      '@apply w-[2.4rem] h-[2.4rem]': {},
    },

    '&-md': {
      '@apply w-[2.4rem] h-[2.4rem]': {},
    },

    '&-lg': {
      '@apply w-[2.4rem] h-[2.4rem]': {},
    },

    '+ .sk-icon': {
      '@apply absolute inset-0 my-auto bg-transparent': {},
      '@apply border-[0.1rem] p-2 border-primitives-overlay-darken-6 dark:border-primitives-overlay-lighten-6': {},
      '@apply bg-primitives-overlay-lighten-10 dark:bg-primitives-overlay-darken-6': {},

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

    '&&:hover:not(&&-disabled,&&:checked,&&[aria-invalid=true]),&&:hover:focus:not(&&-disabled,&&:checked,&&[aria-invalid=true])':
      {
        '& + .sk-icon, &:focus + .sk-icon': {
          '@apply text-primitives-overlay-darken-6 dark:text-primitives-overlay-lighten-5 border-primitives-overlay-darken-8 dark:border-primitives-overlay-lighten-4':
            {},

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
        '@apply bg-background-200 border-primitives-overlay-darken-3': {},
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

    // label
    '&-label-left &-label': {
      '@apply mr-[.8rem]': {},
    },
    '&-label-right &-label': {
      '@apply ml-[.8rem]': {},
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
    },
  },
});
