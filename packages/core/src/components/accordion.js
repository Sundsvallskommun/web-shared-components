module.exports = Accordion = () => ({
  '.sk-disclosure': {
    '&-header': {
      '@apply mt-6': {},
      '@apply flex flex-col text-left': {},
      '@apply cursor-pointer': {},
      '*': {
        '@apply cursor-pointer': {},
      },
      '&:focus-visible': {
        '@apply outline-0': {},
      },

      '&-icon': {
        '@apply ml-auto !text-2xl': {},
        svg: {
          '@apply !text-2xl': {},
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

    '&-toggle': {
      '@apply flex items-center justify-between': {},
      '@apply py-8 gap-16': {},

      '.sk-disclosure-title': {
        '@apply text-h4-sm md:text-h4-md xl:text-h4-lg font-bold': {},
        '@apply leading-h4-sm md:leading-h4-md xl:leading-h4-lg': {},
      },
    },

    '&-body': {
      '@apply mb-6': {},
      '@apply py-6': {},
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

    '&-is-open &-body': {
      '@apply overflow-visible animate-reset-overflow': {},
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
