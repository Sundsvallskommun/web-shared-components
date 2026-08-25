export const ProgressStepper = () => ({
  '.sk-progress-stepper': {
    '@apply flex justify-between': {},
    '&.horizontal': { '@apply flex-row': {} },
    '&.vertical': { '@apply flex-col gap-4 h-full items-start': {} },
    '&-step': {
      '@apply flex': {},
      '&-wrapper': {
        '@apply flex gap-8': {},
        '@apply focus-visible:outline-none': {},
        '@apply focus-visible:ring rounded': {},
        '&&-top': {
          '@apply flex-col-reverse items-center': {},
          '.sk-progress-stepper-step-text-wrapper': {
            '@apply mt-0 text-center': {},
          },
        },
        '&&-right': {
          '@apply flex-row': {},
        },
        '&&-bottom': {
          '@apply flex-col items-center': {},
          '.sk-progress-stepper-step-text-wrapper': {
            '@apply mt-0 text-center': {},
          },
        },
        '&&-left': {
          '@apply flex-row-reverse': {},
        },
      },
      '&-box': {
        '@apply shrink-0 rounded-xl h-32 w-32 bg-tertiary-surface': {},
        '@apply text-small font-bold': {},
        '@apply flex justify-center items-center': {},
        '&[data-rounded="true"]': {
          '@apply rounded-full': {},
        },
        '@apply h-24 w-24': {},
        '.sk-icon svg': {
          '@apply w-16 h-16': {},
        },
      },
      '&-text-wrapper': {
        '@apply flex-auto items-center': {},
      },
      '&-label': {
        '@apply text-base mt-2 mb-0': {},
      },
      '&-description': {
        '@apply text-small text-secondary': {},
      },
      '&&-vertical': {
        '@apply flex-col': {},
      },
      '&&-horizontal': {
        '@apply flex-row': {},
      },
      '&&-grow': {
        '@apply grow': {},
      },
      '&&-grow-0': {
        '@apply grow-0': {},
      },
      '&-divider': {
        '&.horizontal': {
          '@apply flex flex-auto mt-10 mx-8': {},
        },
        '&.vertical': {
          '@apply flex grow w-auto h-full ml-6': {},
          '&.left': {
            '@apply self-center ml-0': {},
          },
          '&.top': {
            '@apply self-center ml-0': {},
          },
          '&.bottom': {
            '@apply self-center ml-0': {},
          },
        },
      },
      '&[data-progress="current"]': {
        '.sk-progress-stepper-step-label': {
          '@apply font-bold': {},
        },
        '.sk-progress-stepper-step-box': {
          '@apply bg-primary-surface text-light-primary': {},
        },
      },
      '&[data-progress="done"]': {
        '.sk-progress-stepper-step-box': {
          '@apply bg-gronsta-surface-accent text-gronsta-text-primary': {},
        },
      },
      '.sk-progress-stepper-step-wrapper': {
        '@apply whitespace-normal': {},
      },
    },
  },
});
