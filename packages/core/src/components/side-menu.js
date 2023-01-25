module.exports = Menu = () => ({
  '.SideMenu': {
    '@apply w-[440px]': {},

    '.menu-header': {
      '@apply py-[2rem] px-[1.6rem] bg-primary rounded-t-sm': {},

      'label, .label': {
        '@apply text-xl font-bold text-white': {},
      },

      '.label-small': {
        '@apply text-[1.6rem]': {},
      },

      '.label-button': {
        '@apply w-full justify-between p-0': {},

        '&-icon': {
          '@apply !text-xl': {},
        },
      },

      '.label-header': {
        '@apply flex items-center': {},

        span: {
          '@apply ml-auto': {},
        },
      },
    },
    

    '.menu-body': {
      '@apply border border-gray-stroke': {},
      '>.MenuItem:first-child': {
        '@apply border-t-0': {},
      },
    },

    '.MenuItem': {
      '@apply bg-white h-full border-t border-gray-stroke': {},

      '.items': {
        '@apply block': {},
      },

      '&.active': {
        '> .wrapper': {
          boxShadow: 'inset 6px 0 0 0 #005595',

          '> .MenuItem-link': {
            '@apply underline': {},
          },
        },
      },

      '.wrapper': {
        '@apply flex items-center': {},

        '.MenuItem-link': {
          '@apply flex-grow text-left justify-start py-sm pr-[15px] h-full': {},
        },

        '.expand': {
          '@apply w-[50px] h-full flex justify-center items-center ml-auto p-0': {},

          span: {
            '@apply flex justify-center items-center border-l border-gray-stroke h-[24px] w-[45px]': {},
          },
        },
      },

      /*'&.lvl-1, &.lvl-2, &.lvl-3, &.lvl-4, &.lvl-5, &.lvl-6, &.lvl-7, &.lvl-8, &.lvl-9, &.lvl-10': {
        '.MenuItem-link ': {
          '@apply py-sm': {},
        },
        '@apply py-sm': {},
      },
      */

      '&.isSubNode': {
        '@apply bg-gray-lighter': {},
        '> .wrapper ': {
          '@apply min-h-[56px]': {},
        },
      },

      '&.isLeafNode': {
        '@apply bg-gray-middle': {},
        '> .wrapper ': {
          '@apply min-h-[48px]': {},
        },
      },

      '&.lvl-0': {
        '> .wrapper ': {
          '@apply min-h-[64px]': {},

          '> .MenuItem-link': {
            '@apply py-md': {},
            paddingLeft: '3.2rem',
          },
        },
      },

      '&.lvl-1': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '4.8rem',
        },
      },

      '&.lvl-2': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '6.4rem',
        },
      },

      '&.lvl-3': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '8rem',
        },
      },

      '&.lvl-4': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '9.6rem',
        },
      },

      '&.lvl-5': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '11.2rem',
        },
      },

      '&.lvl-6': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '12.8rem',
        },
      },

      '&.lvl-7': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '14.4rem',
        },
      },

      '&.lvl-8': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '16rem',
        },
      },

      '&.lvl-9': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '17.6rem',
        },
      },

      '&.lvl-10': {
        '> .wrapper > .MenuItem-link': {
          paddingLeft: '19.2rem',
        },
      },
    },
  },
});
