export const Feedback = () => ({
  '.sk-ai-feedback': {
    '@apply ml-24 flex gap-24 justify-end': {},
    '&-button': {
      '&[data-current="true"]': {
        '@apply bg-tertiary-surface-hover': {},
      },
    },
    '&-more': {
      '@apply flex flex-col gap-8 pl-14 pr-8 pt-8 pb-14 bg-background-color-mixin-1 text-dark-primary rounded-button':
        {},
      '&-header': {
        '@apply flex flex-row items-center justify-between text-label-small': {},
      },
      '&-reason': {
        '@apply flex flex-row items-center gap-8 justify-start': {},
      },
    },
  },
});
