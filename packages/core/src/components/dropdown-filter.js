module.exports = DropdownFilter = () => ({
  '.dropdown-filter': {
    position: 'relative',
    height: 50,
    border: '1px solid #939393',
    display: 'flex',
    background: '#fff',
    borderRadius: 2,

    '.dropdown-button': {
      '@apply flex justify-between items-center  grow': {},
      '.dropdown-button-icon': {
        '@apply justify-self-end grow-0': {},
      },
    },

    '.filter-container': {
      position: 'absolute',
      top: '100%',
      left: '-1px',
      zIndex: 10,
      width: 'calc(100% + 2px)',
      background: '#fff',
      border: '1px solid #939393',
      borderRadius: 2,

      '.filter-controls': {
        display: 'flex',
        justifyContent: 'flex-end',
        button: {
          marginLeft: '1rem',
          textDecoration: 'underline',
        },
      },

      '.filter-item': {
        '@apply px-md': {},
        height: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #939393',

        '> label:first-child': {
          '@apply flex-grow': {},
        },

        '&.disabled': {
          color: '#939393',
        },

        '&:first-of-type': {
          borderTop: '1px solid #939393',
        },

        '&:last-child': {
          borderBottom: 'none',
        },
      },
    },
  },
});
