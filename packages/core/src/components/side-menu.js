module.exports = Menu = () => ({
  '.sk-sidemenu': {
    '@apply w-[440px]': {},

    '&-header': {
      '@apply relative py-[2rem] px-[1.6rem] rounded-t-[.2rem] bg-primary text-white': {},

      '.label-small': {
        '@apply text-[1.6rem]': {},
      },

      '.label-button': {
        '@apply w-full justify-between p-0 leading-[inherit]': {},

        '&-icon': {
          '@apply !text-xl': {},
        },
      },

      '&-label': {
        '@apply flex items-center': {},

        'label, .label': {
          '@apply text-xl font-bold flex items-center w-full': {},
        },

        span: {
          '@apply ml-auto': {},
        },
      },
    },

    '&-item': {
      '@apply bg-white h-full': {},

      '> ul.items': {
        '@apply hidden': {},
      },

      '&.open > ul.items': {
        '@apply block': {},
      },

      '&-label': {
        '@apply flex-grow select-none flex items-center': {},
      },

      '&.active': {
        '> .sk-sidemenu-wrapper': {
          boxShadow: 'inset 6px 0 0 0 #005595',
          '.sk-sidemenu-item-label': {
            '@apply underline': {},
          },
        },
      },

      '.expand path': {
        '@apply fill-primary': {},
      },

      '& .sk-sidemenu-wrapper': {
        '@apply min-h-[48px] max-h-[48px] relative flex flex-wrap items-center': {},

        '.sk-sidemenu-item-link': {
          '@apply flex-grow relative flex items-center text-base text-left justify-start pr-sm h-full': {},
          '@apply focus-visible:z-base': {},
        },

        '.expand': {
          '@apply w-[50px] h-full flex justify-center items-center ml-auto p-0': {},

          '&-button': {
            '@apply flex justify-center items-center border-l border-gray-stroke h-[24px] w-[45px]': {},
          },
        },
      },

      '&.open': {
        '& + .menu-item > .sk-sidemenu-wrapper': {
          '@apply border-t': {},
        },
      },

      '&.draggable': {
        '&.dragenter': {
          '> .sk-sidemenu-wrapper': {
            '@apply h-full max-h-full': {},
          },
          "> .sk-sidemenu-wrapper > *:not([draggable='true'])": {
            '@apply pointer-events-none': {},
          },

          '& > .sk-sidemenu-wrapper::after': {
            '@apply bg-info-light block relative w-full h-[44px]': {},
            content: "''",
          },
        },

        '&.moving': {
          '@apply hidden': {},
        },

        '& .sk-sidemenu-menuitem-movebutton': {
          '@apply -translate-x-full no-underline text-gray-stroke absolute py-sm inset-y-0 my-auto': {},

          svg: {
            '@apply h-full': {},
          },
          '&-label': {
            '@apply text-[#B65A06]': {},
          },
        },

        '&.moved-here': {
          "[draggable='true']": {
            '@apply text-warning': {},
          },
        },

        '&.separator': {
          '@apply bg-transparent relative': {},

          '> div.sk-sidemenu-wrapper, > .sk-sidemenu-item-link': {
            '@apply h-[44px]': {},
          },
        },
      },

      '&-separator': {
        '@apply text-svartvik-200': {},
        height: '1px',
        width: '100%',
        backgroundImage: `repeating-linear-gradient(0deg, currentColor, currentColor 19px, transparent 19px, transparent 38px, currentColor 38px), repeating-linear-gradient(90deg, currentColor, currentColor 19px, transparent 19px, transparent 38px, currentColor 38px), repeating-linear-gradient(180deg, currentColor, currentColor 19px, transparent 19px, transparent 38px, currentColor 38px), repeating-linear-gradient(270deg, currentColor, currentColor 19px, transparent 19px, transparent 38px, currentColor 38px)`,
        backgroundSize: '2px 100%, 100% 2px, 2px 100% , 100% 2px',
        backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
        backgroundRepeat: 'no-repeat',
      },

      '&.lvl-0': {
        '&:first-child > .sk-sidemenu-wrapper': {
          '@apply border-t-0': {},
        },
        '> .sk-sidemenu-wrapper': {
          '@apply h-[64px] max-h-[64px] border border-svartvik-200': {},

          '> .sk-sidemenu-item-link': {
            '@apply  py-md': {},
            paddingLeft: '3.2rem',
          },
        },

        '.sk-sidemenu-item-link': {
          '@apply h-[64px] max-h-[64px]': {},
        },

        '& + .menu-item > .sk-sidemenu-wrapper': {
          '@apply border-t-0': {},
        },

        '> .items': {
          '@apply border-l border-r border-svartvik-200': {},
        },

        '&.open > .items': {
          '@apply border-b border-svartvik-200': {},
        },

        '&.separator > .sk-sidemenu-wrapper': {
          '@apply border-0': {},
        },
      },

      '&.lvl-1': {
        '@apply bg-gray-lighter': {},

        '> .sk-sidemenu-wrapper, .sk-sidemenu-item-link': {
          '@apply h-[56px] max-h-[56px]': {},
        },

        '&.open > .sk-sidemenu-wrapper': {
          '@apply border-b border-svartvik-200': {},
        },

        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '4.8rem',
        },
      },

      '&.lvl-2': {
        '.sk-sidemenu-wrapper': {
          '@apply bg-gray-middle h-[48px] max-h-[48px]': {},

          '> .sk-sidemenu-item-link': {
            '@apply h-[48px] max-h-[48px]': {},
          },
        },

        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '6.4rem',
        },
      },

      '&.lvl-3': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '8rem',
        },
      },

      '&.lvl-4': {
        '.sk-sidemenu-wrapper': {
          '@apply bg-[#d4d4d4]': {},
        },
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '9.6rem',
        },
      },

      '&.lvl-5': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '11.2rem',
        },
      },

      '&.lvl-6': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '12.8rem',
        },
      },

      '&.lvl-7': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '14.4rem',
        },
      },

      '&.lvl-8': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '16rem',
        },
      },

      '&.lvl-9': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '17.6rem',
        },
      },

      '&.lvl-10': {
        '> .sk-sidemenu-wrapper > .sk-sidemenu-item-link': {
          paddingLeft: '19.2rem',
        },
      },
    },
  },
});
