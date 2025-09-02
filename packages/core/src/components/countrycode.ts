export const CountryCode = () => ({
  '.sk-country-code': {
    '@apply font-flag': {},
    '&-combobox': {
      '@apply w-fit': {},
      '&.sk-form-combobox': {
        '&-sm': {
          '@apply w-[12.0rem]': {},
        },
        '&-md': {
          '@apply w-[13.2rem]': {},
        },
        '&-lg': {
          '@apply w-[13.8rem]': {},
        },
      },
      '.sk-form-combobox': {
        '&-select': {
          '@apply w-auto max-w-full': {},
        },
        '&-list': {
          '@apply w-auto': {},
          '&-option-tick': {
            '@apply w-0': {},
          },
        },
      },
    },
  },
});
