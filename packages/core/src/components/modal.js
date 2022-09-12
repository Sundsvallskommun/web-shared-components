module.exports = Modal = () => ({
  '.modal': {
    '@apply fixed inset-0 z-10 flex items-center justify-center overflow-y-auto': {},

    '&-backdrop': {
      '@apply bg-black bg-opacity-30': {},
    },

    '&-wrapper': {
      '@apply flex flex-col container py-8 px-4 text-center bg-white max-w-screen-sm relative': {},
    },

    '&-close-btn': {
      '@apply cursor-pointer hover:text-primary-active absolute right-8 top-6 border border-transparent focus-visible:border-black flex self-center':
        {},
    },

    '&-title': {
      '@apply text-3xl p-4': {},
    },

    '&-description': {
      '@apply text-base p-4': {},
    },

    '&-content-wrapper': {
      '@apply p-4 space-y-10': {},
    },
  },
});
