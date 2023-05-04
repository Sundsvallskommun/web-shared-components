module.exports = TabMenu = () => ({
  '.sk-tab-menu': {
    '&-wrapper': {
      display: 'flex',
      flexDirection: 'row',
      margin: 'auto',
    },
    '&-right': {
      '@apply justify-end': {},
    },
    '&-center': {
      '@apply justify-center': {},
    },
    '&-list': {
      all: 'unset',
      display: 'flex',
      '&-stretch': {
        '@apply w-full justify-between': {},
      },
    },

    '&-underline': {
      width: '100%',
      height: 6,
      '@apply bg-gray-light': {},
    },
    '&-item': {
      all: 'unset',
      height: 65,
      display: 'flex',
      padding: '0 1rem',
      marginRight: '5rem',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      '&-stretch': {
        '@apply mr-0': {},
      },
      '&-right': {
        '@apply mr-0 ml-[5rem]': {},
      },
      '&-center:last-of-type': {
        '@apply mr-0': {},
      },

      '&.active::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: 6,
        top: '100%',
        left: 0,
        '@apply bg-primary': {},
      },
    },
  },
});
