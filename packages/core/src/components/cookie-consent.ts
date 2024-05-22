export const CookieConsent = () => ({
  '.sk-cookie-consent': {
    '@apply min-w-full fixed flex justify-center z-10 bottom-0 left-0 right-0': {},
    '@apply bg-background-content': {},
    '@apply p-40': {},
    '@apply pt-24': {},

    '&-wrapper': {
      '@apply fixed inset-0 z-20 overflow-y-auto': {},
      '@apply bg-primitives-overlay-darken-6': {},
      '@apply dark:bg-primitives-overlay-darken-8': {},
    },
    '&-close-btn': {
      // '@apply cursor-pointer hover:text-dark-secondary absolute right-8 top-6 border border-transparent focus-visible:border-black flex self-center':
      // {},

      '&-icon': {
        // '@apply !text-2xl': {},
      },
    },

    '&-content-wrapper': {
      '@apply flex flex-col gap-24 container max-w-[64em] relative': {},
    },

    '&-body': {
      '@apply flex flex-col gap-8': {},
      '@apply max-w-[50em]': {},
    },
    '&-title': {
      '@apply text-h2-sm md:text-h2-md xl:text-h2-lg': {},
    },
    '&-custom-wrapper': {
      '@apply flex flex-col gap-24': {},
    },

    '&-description': {
      '@apply text-base flex flex-col gap-8': {},
    },

    '&-btn-wrapper': {
      '@apply flex flex-col md:flex-row gap-12 flex-wrap': {},
    },
  },
});
