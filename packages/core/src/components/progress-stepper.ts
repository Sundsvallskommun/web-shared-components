export const ProgressStepper = () => ({
  '.sk-progress-stepper': {
    '@apply flex justify-between': {},
    hr: {
      '@apply w-full mt-19': {},
    },
    '&-step': {
      '@apply flex flex-col items-center': {},
      '@apply gap-4': {},
      '@apply w-auto': {},
      '@apply shrink-0': {},
      '@apply text-base leading-base text-dark-primary font-normal': {},
      svg: {
        '@apply w-20 h-20': {},
      },
      '&-wrapper': {
        '@apply flex flex-row shrink w-full gap-4': {},
        hr: {
          '@apply w-full grow shrink mt-19': {},
        },
      },
      '&-box': {
        '@apply box-border': {},
        '@apply shrink-0': {},
        '@apply h-40 w-40': {},
        '@apply bg-secondary-surface': {},
        '@apply flex justify-center items-center': {},
        '@apply text-label-medium': {},
        '@apply border-2 border-secondary-outline': {},
        '@apply text-dark-secondary': {},
        '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
        '&[data-rounded="true"]': {
          '@apply rounded-full': {},
        },

        '&&-sm': {
          '@apply h-32 w-32 min-h-24 max-h-32 min-w-24 max-w-32': {},
          '@apply text-label-small': {},
        },
        '&&-md': {
          '@apply h-40 w-40 min-h-32 max-h-40 min-w-32 max-w-40': {},
        },
      },
      '&[data-progress="current"]': {
        '@apply font-bold': {},
        '.sk-progress-stepper-step-box': {
          '@apply border-vattjom-surface-primary': {},
          '@apply bg-vattjom-surface-primary': {},
          '@apply text-vattjom-text-secondary': {},
        },
      },
      '&[data-progress="done"]': {
        '.sk-progress-stepper-step-box': {
          '@apply border-success-surface-primary': {},
          '@apply bg-success-surface-primary': {},
          '@apply text-success-text-secondary': {},
        },
      },
    },
  },
});
