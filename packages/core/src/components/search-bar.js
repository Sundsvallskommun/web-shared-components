module.exports = SearchBar = () => ({
  '.SearchBar': {
    width: '100%',
    position: 'relative',

    '.search-button': {
      '@apply flex items-center absolute inset-y-0 right-md text-primary': {},
      '&-icon': {
        '@apply !text-2xl': {},

        '&.small': {
          '@apply h-[13px] w-[13px]': {},
        },
      },
    },
  },
});
