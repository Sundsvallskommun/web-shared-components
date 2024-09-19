export const SearchField = () => ({
  '.sk-search-field-suggestions': {
    '&.sk-form-combobox': {
      '@apply h-auto': {},
    },
    '.sk-form-combobox': {
      '&-list': {
        '@apply w-full': {},
        '&-option': {
          '.sk-icon': {
            '@apply hidden': {},
          },
        },
      },
    },
  },
  '.sk-search-field': {
    '&-md': {
      '.sk-search-field-icon': {
        '@apply w-20 h-20': {},
        svg: {
          '@apply w-20 h-20': {},
        },
      },
    },
    '&-lg': {
      '.sk-search-field-icon': {
        '@apply w-22 h-22': {},
        svg: {
          '@apply w-22 h-22': {},
        },
      },
    },
  },
});
