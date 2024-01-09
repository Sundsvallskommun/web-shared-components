export const Accordion = () => ({
  '.sk-disclosure': {
    '&-header': {
      '@apply mt-6 mb-8': {},
      '@apply flex flex-col text-left': {},
      '@apply cursor-pointer': {},
      '*': {
        '@apply cursor-pointer': {},
      },
      '&:focus-visible': {
        '@apply outline-0': {},
      },

      '&-icon': {
        '@apply ml-auto': {},
        svg: {
          '@apply w-20 h-20': {},
        },
      },
      '&[data-disabled="true"]': {
        '@apply text-dark-disabled': {},
        '@apply cursor-default': {},
        '*': {
          '@apply cursor-default': {},
        },
      },
    },

    '&-sm': {
      '.sk-disclosure-title': {
        '@apply text-h4-sm font-bold': {},
      },
      '.sk-disclosure-toggle': {
        '@apply py-4': {},
        '@apply h-40': {},
      },
      '.sk-disclosure-header-icon': {
        '@apply w-32 h-32': {},
      },
    },
    '&-md': {
      '.sk-disclosure-title': {
        '@apply text-h4-md font-bold': {},
      },
      '.sk-disclosure-toggle': {
        '@apply py-8': {},
        '@apply h-56': {},
      },
      '.sk-disclosure-header-icon': {
        '@apply w-40 h-40': {},
      },
    },
    '&-toggle': {
      '@apply flex items-center justify-between': {},
      '@apply gap-16': {},
    },
    '&-title': {
      '@apply text-dark-secondary': {},
    },

    '&-body': {
      '@apply flex flex-col': {},
      '@apply mb-32': {},
      '@apply mr-32': {},
      '@apply gap-8': {},
      '@apply py-0': {},
      '@apply h-0 overflow-hidden': {},
      transitionProperty: 'visibility, height, padding, margin',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '180ms',

      '&[aria-hidden="true"], &[data-hidden="true"]': {
        '@apply my-0 invisible h-0': {},
      },

      '&[aria-hidden="false"], &[data-hidden="false"]': {
        '@apply block h-max visible': {},
      },
    },

    '&-is-open': {
      '.sk-disclosure-body': {
        '@apply overflow-visible animate-reset-overflow': {},
      },
      '.sk-disclosure-title': {
        '@apply text-vattjom-text-primary': {},
      },
    },
  },
  '.sk-accordion': {
    '&-item': {
      '.sk-disclosure': {
        transitionProperty: 'margin',
        transitionDuration: '180ms',
        '@apply border-b-1 border-divider': {},
      },

      '&:last-child .sk-disclosure': {
        '@apply border-b-transparent': {},
      },
    },
  },
});
