export const Feedback = () => ({
  '.sk-ai-feedback': {
    '@apply ml-24 flex gap-24 justify-start mb-16': {},
    '@apply max-w-full': {},
    '&-button': {
      '&[data-current="true"]': {
        '@apply bg-tertiary-surface-hover': {},
        '&[data-inverted="true"]':{
          '@apply bg-inverted-tertiary-surface-hover': {},
        }
      },
    },
    '&-more': {
      '@apply flex flex-col gap-8 px-14 pt-8 pb-12 rounded-button': {},
      '@apply bg-background-color-mixin-1 text-dark-primary': {},
      '&[data-inverted="true"]':{
        '@apply bg-inverted-background-color-mixin-1 text-inverted-dark-primary': {},
      },
      '&-header': {
        '@apply flex flex-row items-center justify-between text-label-small': {},
      },
      '&-reason': {
        '@apply flex flex-row items-center gap-8 justify-start flex-wrap': {},
      },
    },

  
    },
});
