module.exports = DropdownFilter = () => ({
  '.DropdownFilter': {
    position: 'relative',
    height: 50,
    border: '1px solid #939393',
    display: 'flex',
    background: '#fff',
    borderRadius: 2,

    '.dropdown-button': {
      justifyContent: 'space-between',
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      padding: '0 1rem',
    },

    '.filter-container': {
      position: 'absolute',
      top: '100%',
      left: '-1px',
      zIndex: 10,
      width: 'calc(100% + 2px)',
      background: '#fff',
      border: '1px solid #939393',
      padding: '1rem',
      borderRadius: 2,

      '.filter-controls': {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1rem',
        paddingBottom: 12,

        button: {
          marginLeft: '1rem',
          textDecoration: 'underline',
        },
      },

      '.FilterItem': {
        height: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #939393',
        padding: '0 1rem',

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
