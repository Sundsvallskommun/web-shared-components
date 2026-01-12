export const Alert = () => ({
  '.sk-alert': {
    '@apply flex justify-between rounded-button': {},
    '&-wrapper': {
      '@apply flex justify-between': {},
    },
    '&-title-sm': {
      '@apply text-small pt-1 m-0': {},
    },
    '&-title-md': {
      '@apply text-base': {},
    },
    '&-title-lg': {
      '@apply text-large': {},
    },
    '&-sub-text': {
      '@apply text-small text-secondary': {},
    },
    '&-sm': {
      '.sk-alert-wrapper': {
        '@apply gap-8 pl-10 pt-7 pb-2 pr-8': {},
      },
      '.sk-alert-button-wrapper': {
        '@apply my-0 px-6': {},
      },
    },
    '&-md': {
      '.sk-alert-wrapper': {
        '@apply gap-12 pl-16 pr-12 py-12': {},
      },
      '.sk-alert-icon-container': {
        '@apply pt-6': {},
      },
      '.sk-alert-text-container': {
        '@apply pt-1': {},
      },
      '.sk-alert-button-wrapper': {
        '@apply p-12': {},
      },
    },
    '&-lg': {
      '.sk-alert-wrapper': {
        '@apply gap-12 pl-16 pr-12 py-12': {},
      },
      '.sk-alert-icon-container': {
        '@apply pt-6': {},
      },
      '.sk-alert-button-wrapper': {
        '@apply p-12': {},
      },
    },
    '&-info': {
      '@apply border-1 border-vattjom-surface-primary bg-vattjom-background-100': {},
    },
    '&-neutral': {
      '@apply border-1 border-divider bg-background-100': {},
    },
    '&-success': {
      '@apply border-1 border-gronsta-surface-primary bg-gronsta-background-100': {},
    },
    '&-warning': {
      '@apply border-1 border-warning-surface-primary bg-warning-background-100': {},
    },
    '&-error': {
      '@apply border-1 border-error-surface-primary bg-error-background-100': {},
    },
  },
});
