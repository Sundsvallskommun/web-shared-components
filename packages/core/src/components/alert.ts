export const Alert = () => ({
  '.sk-alert': {
    '@apply flex rounded-button': {},
    '&-sm': {
      '@apply rounded-xl gap-8 pl-10 pr-6': {},
      '.sk-alert-icon': {
        '@apply mt-6': {},
      },
    },
    '&-md': {
      '@apply gap-12 pl-16 pr-12 py-12': {},
      '.sk-alert-icon': {
        '@apply mt-6': {},
      },
    },
    '&-lg': {
      '@apply gap-12 pl-16 pr-12 py-12': {},
      '.sk-alert-icon': {
        '@apply mt-6': {},
      },
    },
    '&-content': {
      '@apply flex flex-col w-full grow': {},
      '&-description': {
        '@apply text-small': {},
      },
      '&-sm': {
        '@apply py-6': {},
        '.sk-alert-content-title': {
          '@apply text-small m-0': {},
        },
      },
      '&-md': {
        '@apply py-4': {},
        '.sk-alert-content-title': {
          '@apply text-base': {},
        },
      },
      '&-lg': {
        '@apply py-4': {},
        '.sk-alert-content-title': {
          '@apply text-large': {},
        },
        '.sk-alert-content-description': {
          '@apply text-base text-secondary': {},
        },
      },
    },
    '&-icon': {
      '@apply flex-none': {},
    },
    '&-button': {
      '@apply flex-none justify-self-end': {},
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
