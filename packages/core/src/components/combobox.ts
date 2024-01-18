export const ComboBox = () => ({
  '.sk-form-combobox': {
    '@apply focus-within:ring ring-ring ring-offset': {},
    '@apply relative w-auto': {},
    '@apply inline-block': {},
    '&-sm': {
      '@apply h-[3.2rem]': {},
      '@apply rounded-button-sm': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-small': {},
        '@apply pr-[5.2rem]': {},
      },
    },
    '&-md': {
      '@apply h-[4rem]': {},
      '@apply rounded-button-md': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-medium': {},
        '@apply pr-[6.1rem]': {},
      },
    },
    '&-lg': {
      '@apply h-[4.8rem]': {},
      '@apply rounded-button-lg': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-large': {},
        '@apply pr-[6.8rem]': {},
      },
    },

    '&:not([aria-expanded="true"])': {
      '.sk-form-combobox-select': {
        '@apply caret-transparent': {},
      },
    },

    '&-select': {
      '@apply h-full bg-right-12 bg-no-repeat': {},

      '&.sk-form-select': { '@apply focus:outline-none focus:ring-0 focus:ring-transparent': {} },
      '@apply w-full': {},

      '&:not(.active)': {
        '@apply cursor-default': {},
      },
      '@apply focus:border-transparent': {},
      '@apply focus:hover:border-transparent': {},
      '&.active': {
        '@apply bg-primitives-overlay-lighten-10': {},
        '@apply dark:bg-primitives-overlay-darken-6': {},
        '@apply placeholder:text-dark-placeholder': {},
        '@apply text-dark-primary': {},
        '@apply border-transparent': {},
      },
    },
    '&-list': {
      '@apply w-full': {},
      '@apply max-h-[23rem] overflow-y-auto': {},
      '&-option': {
        '&.sk-popup-menu-item': {
          '@apply cursor-default': {},
          '@apply leading-none': {},
          '@apply h-auto': {},
        },

        '&-checkbox': {
          '@apply w-0 h-0 m-0 p-0 opacity-0': {},
        },
      },
    },
  },
});
