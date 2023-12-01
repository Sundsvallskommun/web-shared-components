module.exports = ComboBox = () => ({
  '.sk-form-combobox': {
    '@apply focus-within:ring ring-ring ring-offset': {},
    '@apply relative w-fit': {},
    '@apply inline-block': {},
    '&-sm': {
      '@apply h-[3.2rem]': {},
      '@apply rounded-button-sm': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-small': {},
      },
    },
    '&-md': {
      '@apply h-[4rem]': {},
      '@apply rounded-button-md': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-medium': {},
      },
    },
    '&-lg': {
      '@apply h-[4.8rem]': {},
      '@apply rounded-button-lg': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-large': {},
      },
    },

    '&-select': {
      '@apply h-full bg-right-12 bg-no-repeat': {},
      '@apply focus:ring-0': {},
      '@apply w-full': {},
      '&:not(.active)': {
        '@apply cursor-default': {},
      },

      '&.active': {
        '@apply bg-background-content': {},
        '@apply placeholder:text-dark-placeholder': {},
        '@apply text-dark-primary': {},
      },
    },
    '&-list': {
      '@apply w-max': {},
      '@apply max-h-[23rem] overflow-y-auto': {},
      '&-option': {
        '@apply cursor-default': {},

        '&-checkbox': {
          '@apply w-0 h-0 m-0 p-0 opacity-0': {},
        },
      },
    },
  },
});
