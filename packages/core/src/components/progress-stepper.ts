export const ProgressStepper = () => ({
  '.sk-progress-stepper': {
    '@apply flex justify-between items-center': {},
    '&.horizontal': { '@apply flex-row gap-16': {} },
    '&.vertical': { '@apply flex-col gap-4 h-full': {} },
    '&-step': {
      '@apply flex items-center': {},
      '@apply text-base leading-base text-dark-primary font-normal': {},
      '&-wrapper': {
        '@apply flex items-center gap-8': {},
        '&&-top': {
          '@apply flex-col-reverse': {},
        },
        '&&-right': {
          '@apply flex-row': {},
        },
        '&&-bottom': {
          '@apply flex-col': {},
        },
        '&&-left': {
          '@apply flex-row-reverse': {},
        },
      },
      '&-box': {
        '@apply shrink-0 rounded-lg h-32 w-32 bg-tertiary-surface': {},
        '@apply flex justify-center items-center': {},
        '&[data-rounded="true"]': {
          '@apply rounded-full': {},
        },
        '&.sm': {
          '@apply h-24 w-24 text-label-small': {},
        },
        '&.md': {
          '@apply h-32 w-32': {},
        },
        '&-icon': {
          '&.sm svg': {
            '@apply w-16 h-16': {},
          },
          '&.md svg': {
            '@apply w-20 h-20': {},
          },
        },
      },
      '&&-vertical': {
        '@apply flex-col': {},
      },
      '&&-horizontal': {
        '@apply flex-row gap-16': {},
      },
      '&&-grow': {
        '@apply grow': {},
      },
      '&&-grow-0': {
        '@apply grow-0': {},
      },
      '&-divider': {
        '&.horizontal': {
          '@apply flex w-full': {},
        },
        '&.vertical': {
          '@apply flex w-auto h-full': {},
        },
      },
      '&[data-progress="current"]': {
        '@apply font-bold': {},
        '.sk-progress-stepper-step-box': {
          '@apply bg-primary-surface text-light-primary': {},
        },
      },
      '&[data-progress="done"]': {
        '.sk-progress-stepper-step-box': {
          '@apply bg-gronsta-surface-accent text-gronsta-text-primary': {},
        },
      },
      '&[data-white-space="no-wrap"]': {
        '.sk-progress-stepper-step-wrapper p': {
          '@apply whitespace-nowrap': {},
        },
      },
      '&[data-white-space="normal"]': {
        '.sk-progress-stepper-step-wrapper p': {
          '@apply whitespace-normal': {},
        },
      },
    },
  },
});
