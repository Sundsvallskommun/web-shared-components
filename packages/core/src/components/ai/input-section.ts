export const InputSection = () => ({
  '.sk-ai-inputsection': {
    '@apply w-full': {},
    '&-input, &-group': {
      '@apply w-full': {},
    },
    '&-wrapper': {
      '@apply bg-background-content': {},
      '@apply flex items-center justify-center w-full': {},
      '@apply px-16 py-12 gap-12': {},
      '&[data-shadow="true"]': {
        '@apply shadow-100': {},
      },
    },
    '&-group': {
      '.sk-form-input-addin-right': {
        '@apply pr-4': {},
      },
    },
  },
});
