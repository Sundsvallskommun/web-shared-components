export const Footer = () => ({
  '.sk-footer': {
    '@apply bg-background-content': {},
    '@apply flex justify-center': {},
    '@apply w-full': {},
    '@apply py-24 lg:py-40 px-20 lg:px-80': {},
    '@apply text-dark-secondary': {},

    '&-logo-wrapper': {
      '@apply mr-80 mb-40 self-start flex-none w-max': {},

      '.sk-logo': {
        '@apply max-h-56 h-56 lg:max-h-72 lg:h-72': {},
      },
    },
    '&-content': {
      '@apply w-fit grow flex flex-col desktop:flex-row desktop:flex-wrap': {},
      '@apply w-full max-w-content': {},
    },
    '&-list': {
      '@apply flex grow flex-col gap-16': {},

      '&-wrapper': {
        '@apply flex flex-col desktop:flex-row flex-wrap justify-start grow gap-y-36 gap-x-80 desktop:ml-80': {},
      },

      '&-item': {
        '@apply text-[1.4rem] flex flex-row justify-start items-center gap-8': {},

        label: {
          '@apply text-label-medium': {},
        },
      },
    },
  },
});
