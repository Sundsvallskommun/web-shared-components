module.exports = Footer = () => ({
  '.sk-footer': {
    '@apply bg-background-content': {},
    '@apply flex justify-center': {},
    '@apply w-full': {},
    '@apply p-20 sm:p-32 md:p-40 lg:p-48 xl:p-80': {},
    '@apply text-dark-secondary': {},

    '&-innerwrapper': {
      '@apply w-full max-w-content': {},
      '@apply pb-20 sm:pb-32 md:pb-40 lg:pb-48 xl:pb-80': {},
      '@apply flex flex-row flex-wrap gap-[10rem]': {},
      '@apply justify-between': {},
    },

    '&-logo': {
      '@apply max-h-[7.2rem] h-[7.2rem]': {},
    },
    '&-content': {
      '@apply flex flex-row gap-36 w-fit grow flex-wrap': {},
    },
    '&-list': {
      '@apply flex flex-col gap-16': {},
      '&-item': {
        '@apply flex flex-row justify-start items-center gap-8': {},
      },
    },
  },
});
