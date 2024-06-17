export const Footer = () => ({
  '.sk-footer': {
    '@apply bg-background-content': {},
    '@apply flex justify-center': {},
    '@apply w-full': {},
    '@apply py-40 px-20 lg:px-80': {},
    '@apply text-dark-secondary': {},

    '&-logo-wrapper': {
      '@apply mr-80 mb-40': {},

      '.sk-logo': {
        '@apply max-h-72 h-72': {},
      },
    },
    '&-content': {
      '@apply flex flex-row w-fit grow flex-wrap': {},
      '@apply w-full max-w-content': {},
    },
    '&-list': {
      '@apply flex grow flex-col gap-16': {},

      '&-wrapper': {
        '@apply flex flex-wrap justify-start grow gap-36': {},
      },

      '&-item': {
        '@apply text-[1.4rem] w-[13.79em] flex flex-row justify-start items-center gap-8': {},

        label: {
          '@apply text-label-medium': {},
        },
      },
    },
  },
});
