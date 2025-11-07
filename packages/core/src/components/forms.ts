export const Forms = () => ({
  '.sk-form-control': {
    '@apply flex flex-col gap-8 w-fit': {},
  },

  '.sk-form-label': {
    '@apply font-bold': {},
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

  'legend.sk-form-label': {
    display: 'contents',
  },

  '.sk-form-helper-text, .sk-form-error-message': {
    '@apply font-normal': {},
    '@apply text-small': {},
  },
  '.sk-form-error-message' : {
    '@apply text-error': {},
    '@apply flex gap-8 items-center': {}
  }
});
