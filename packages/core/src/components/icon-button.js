module.exports = IconButton = () => ({
  '.btn-icon, [data-icon="true"]': {
    '@apply justify-center items-center': {},
    minWidth: '3.0em',
    maxWidth: '3.0em',
    minHeight: '3.0em',
    maxHeight: '3.0em',
    padding: '0',
    boxSizing: 'content-box',
    "&[data-rounded='true']": {
      '@apply rounded-full': {},
    },
  },
});
