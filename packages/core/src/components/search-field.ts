export const SearchField = () => ({
  '.sk-search-field-suggestions': {
    '&.sk-form-combobox': {
      '@apply h-auto': {},
    },
    '.sk-form-combobox': {
      '&-list': {
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
        '@apply w-[2rem] h-[2rem]': {},
        svg: {
          '@apply w-[2rem] h-[2rem]': {},
        },
      },
    },
    '&-lg': {
      '.sk-search-field-icon': {
        '@apply w-[2.2rem] h-[2.2rem]': {},
        svg: {
          '@apply w-[2.2rem] h-[2.2rem]': {},
        },
      },
    },
  },
});
