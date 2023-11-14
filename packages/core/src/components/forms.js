module.exports = Forms = () => ({
  '.sk-form-control': {
    '@apply flex flex-col gap-8 w-fit': {},
  },

  '.sk-form-label': {
    '&-sm': {
      '@apply text-label-small': {},
    },
    '&-md': {
      '@apply text-label-medium': {},
    },
    '&-lg': {
      '@apply text-label-large': {},
    },
  },

  '.sk-form-helper-text, sk-form-error-message': {
    '@apply font-normal': {},
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
});
