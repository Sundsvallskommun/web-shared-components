module.exports = Profile = () => ({
  '.profile-container': {
    '@apply flex items-center': {},

    '.profile-title': {
      '@apply font-bold text-base m-0': {},
    },
    '.profile-subtitle': {
      '@apply text-sm leading-[20px] m-0': {},
    },

    '&.minimal': {
      '.profile-title': {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': '1' /* number of lines to show */,
        'line-clamp': '1',
        '-webkit-box-orient': 'vertical',
      },
      '.profile-subtitle': {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': '1' /* number of lines to show */,
        'line-clamp': '1',
        '-webkit-box-orient': 'vertical',
      },
    },

    // '&.truncate': { '@apply truncate pr-md': {} },
  },
});
