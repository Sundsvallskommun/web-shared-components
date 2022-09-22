module.exports = CookieConsent = () => ({
  '.cookie-consent': {
    '@apply min-w-full fixed flex justify-center z-10 bottom-0 left-0 right-0 bg-white': {},

    '&-close-btn': {
      '@apply cursor-pointer hover:text-primary-active absolute right-8 top-6 border border-transparent focus-visible:border-black flex self-center':
        {},

      '&-icon': {
        '@apply !text-2xl': {},
      },
    },

    '&-content-wrapper': {
      '@apply flex flex-col container py-12 px-4 bg-white relative': {},
    },

    '&-title': {
      '@apply text-2xl leading-2xl mb-1 mt-4 break-words': {},
    },

    '&-description': {
      '@apply text-base leading-base mb-8': {},
    },

    '&-btn-wrapper': {
      '@apply flex flex-col space-y-4 lg:block lg:space-y-0 lg:space-x-4': {},
    },
  },
});
