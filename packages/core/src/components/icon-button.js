module.exports = IconButton = () => ({
  '.btn-icon, [data-icon="true"]': {
    '@apply p-0': {},
    "&[data-rounded='true']": {
      '@apply rounded-full': {},
    },
    '&.btn-sm': {
      minWidth: '4rem',
      maxWidth: '4rem',
    },

    '&.btn-md': {
      minWidth: '4.4rem',
      maxWidth: '4.4rem',
    },

    '&.btn-lg': {
      minWidth: '4.8rem',
      maxWidth: '4.8rem',
    },
    '.btn-has-icon': {
      '&-left .MuiSvgIcon-root': {
        '@apply mr-0': {},
      },
      '&-right .MuiSvgIcon-root': {
        '@apply ml-0': {},
      },
    },
  },
});
