module.exports = Modal = () => ({
  '.alert-banner': {
    '@apply p-md': {},

    '&-content': {
      '@apply w-full m-auto flex': {},

      '&-wrapper': {
        '@apply flex-grow flex': {},
      },
    },

    '&-icon': {
      '@apply mr-[10px]': {},
    },

    '&-children': {
      '@apply w-full underline inline-block max-w-[800px] text-body text-base': {},
    },

    '&-close': {
      '@apply p-4 -m-4 flex flex-col': {},
    },
  },

  '.tab': {
    '@apply mr-[10px] bg-white pt-4 pb-3 px-4 rounded-b-button shadow-[rgba(0,_0,_0,_0.24)_0px_1.5px_4px]': {},
  },
});
