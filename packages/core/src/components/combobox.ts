export const ComboBox = () => ({
  '.sk-combobox-base': {
    '@apply w-auto inline-block relative': {},
  },
  '.sk-form-combobox': {
    '@apply focus-within:ring ring-ring ring-offset': {},
    '@apply relative w-auto': {},
    '@apply inline-block': {},
    '&-sm': {
      '@apply h-32': {},
      '@apply rounded-button-sm': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-small': {},
        '@apply pr-52': {},
      },
    },
    '&-md': {
      '@apply h-40': {},
      '@apply rounded-button-md': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-medium': {},
        '@apply pr-62': {},
      },
    },
    '&-lg': {
      '@apply h-48': {},
      '@apply rounded-button-lg': {},
      '.sk-form-combobox-select.active': {
        '@apply text-input-large': {},
        '@apply pr-68': {},
      },
    },

    '&[data-showvalue="true"]': {
      '.sk-form-combobox-select': {
        '@apply caret-transparent': {},
      },
    },

    '&-select': {
      '@apply bg-right-12 bg-no-repeat': {},

      '&.sk-form-select': { '@apply focus:outline-none focus:ring-0 focus:ring-transparent': {} },
      '@apply w-full': {},

      '&:not(.active)': {
        '@apply cursor-default': {},
      },
      '@apply focus:border-transparent': {},
      '@apply focus:hover:border-transparent': {},
      '&.active': {
        '@apply bg-input-field-surface hover:bg-input-field-surface': {},
        '@apply placeholder:text-dark-placeholder': {},
        '@apply text-dark-primary': {},
        '@apply border-transparent': {},
      },
    },
    '&-list, &-list.sk-popup-menu': {
      '@apply w-full': {},
      '@apply max-h-[15em] overflow-y-auto': {},
      '.sk-form-combobox-list-option': {
        '&.sk-popup-menu-item': {
          '@apply cursor-default': {},
          '@apply leading-none': {},
          '@apply h-auto': {},
        },
        '&-group': {
          '&-label': {
            '&.sk-popup-menu-item': {
              '@apply cursor-default': {},
              '@apply leading-none': {},
              '@apply h-auto': {},
              '@apply text-label-medium': {},
              '@apply pl-6': {},
              '@apply bg-transparent hover:bg-transparent': {},
            },
          },
        },

        '&-checkbox': {
          '@apply w-0 h-0 m-0 p-0 opacity-0': {},
        },
        '&-tick': {
          '@apply opacity-0': {},
          '&[data-checked="true"]': {
            '@apply opacity-100': {},
          },
        },
      },
    },
  },
});
