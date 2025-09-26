export const ProgressStepper = () => ({
  '.sk-progress-stepper': {
    '@apply flex justify-between items-center': {},
    '&-step': {
      '@apply flex items-center': {},
      '@apply text-base leading-base text-dark-primary font-normal': {},
      '&-wrapper': {
        '@apply flex items-center gap-8': {},
      },
      '&-box': {
        '@apply shrink-0 rounded-lg h-32 w-32 bg-tertiary-surface': {},
        '@apply flex justify-center items-center': {},
        '&[data-rounded="true"]': {
          '@apply rounded-full': {},
        },
        '&&-sm': {
          '@apply h-24 w-24': {},
          '@apply text-label-small': {},
        },
        '&&-md': {
          '@apply h-32 w-32': {},
        },
        '&-icon': {
          '&&-sm svg': {
            '@apply w-16 h-16': {},
          },
          '&&-md svg': {
            '@apply w-20 h-20': {},
          },
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
