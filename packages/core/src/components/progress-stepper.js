module.exports = ProgressStepper = () => ({
  '.sk-progress-stepper': {
    '@apply flex justify-between': {},
    hr: {
      '@apply w-full mt-[1.9rem]': {},
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
          '@apply w-full grow shrink mt-[1.9rem]': {},
        },
      },
      '&-box': {
        '@apply box-border': {},
        '@apply shrink-0': {},
        '@apply h-[4rem] w-[4rem]': {},
        '@apply bg-secondary-surface': {},
        '@apply flex justify-center items-center': {},
        '@apply text-label-md leading-label-md font-bold': {},
        '@apply border-2 border-secondary-outline': {},
        '@apply text-dark-secondary': {},
        '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
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
