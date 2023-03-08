module.exports = Menu = () => ({
  '.side-menu': {
    '@apply w-[440px]': {},

    '.menu-header': {
      '@apply py-[2rem] px-[1.6rem] rounded-t-[.2rem] bg-primary text-white': {},

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

        'label, .label': {
          '@apply text-xl font-bold': {},
        },

        span: {
          '@apply ml-auto': {},
        },
      },
    },

    '.menu-item': {
      '@apply bg-white h-full': {},

      '.items': {
        '@apply block': {},
      },

      '&-label': {
        '@apply flex-grow select-none flex items-center': {},
      },

      '&.active': {
        '> .wrapper': {
          boxShadow: 'inset 6px 0 0 0 #005595',
          '.menu-item-label': {
            '@apply underline': {},
          },
        },
      },

      '.expand path': {
        '@apply fill-primary': {},
      },

      '& .wrapper': {
        '@apply min-h-[48px] max-h-[48px] relative flex flex-wrap items-center': {},

        '.menu-item-link': {
          '@apply flex-grow relative flex items-center text-base text-left justify-start py-sm pr-sm h-full': {},
        },

        '.expand': {
          '@apply w-[50px] h-full flex justify-center items-center ml-auto p-0': {},

          '&-button': {
            '@apply flex justify-center items-center border-l border-gray-stroke h-[24px] w-[45px]': {},
          },
        },
      },

      '&.open': {
        '& + .menu-item > .wrapper': {
          '@apply border-t': {},
        },
      },

      '&.draggable': {
        '&.dragenter': {
          '> .wrapper': {
            '@apply h-full max-h-full': {},
          },
          "> .wrapper > *:not([draggable='true'])": {
            '@apply pointer-events-none': {},
          },

          '& > .wrapper::after': {
            '@apply bg-info-light block relative w-full h-[44px]': {},
            content: "''",
          },
        },

        '&.moving': {
          '@apply hidden': {},
        },

        '& .menu-item-move-button': {
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

          '> div.wrapper, > .menu-item-link': {
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
        '&:first-child > .wrapper': {
          '@apply border-t-0': {},
        },
        '> .wrapper': {
          '@apply h-[64px] max-h-[64px] border border-svartvik-200': {},

          '> .menu-item-link': {
            '@apply  py-md': {},
            paddingLeft: '3.2rem',
          },
        },

        '.menu-item-link': {
          '@apply h-[64px] max-h-[64px]': {},
        },

        '& + .menu-item > .wrapper': {
          '@apply border-t-0': {},
        },

        '> .items': {
          '@apply border-l border-r border-svartvik-200': {},
        },

        '&.open > .items': {
          '@apply border-b border-svartvik-200': {},
        },

        '&.separator > .wrapper': {
          '@apply border-l-0 border-r-0': {},
        },
      },

      '&.lvl-1': {
        '@apply bg-gray-lighter': {},

        '> .wrapper, .menu-item-link': {
          '@apply h-[56px] max-h-[56px]': {},
        },

        '&.open > .wrapper': {
          '@apply border-b border-svartvik-200': {},
        },

        '> .wrapper > .menu-item-link': {
          paddingLeft: '4.8rem',
        },
      },

      '&.lvl-2': {
        '.wrapper': {
          '@apply bg-gray-middle h-[48px] max-h-[48px]': {},

          '> .menu-item-link': {
            '@apply h-[48px] max-h-[48px]': {},
          },
        },

        '> .wrapper > .menu-item-link': {
          paddingLeft: '6.4rem',
        },
      },

      '&.lvl-3': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '8rem',
        },
      },

      '&.lvl-4': {
        '.wrapper': {
          '@apply bg-[#d4d4d4]': {},
        },
        '> .wrapper > .menu-item-link': {
          paddingLeft: '9.6rem',
        },
      },

      '&.lvl-5': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '11.2rem',
        },
      },

      '&.lvl-6': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '12.8rem',
        },
      },

      '&.lvl-7': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '14.4rem',
        },
      },

      '&.lvl-8': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '16rem',
        },
      },

      '&.lvl-9': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '17.6rem',
        },
      },

      '&.lvl-10': {
        '> .wrapper > .menu-item-link': {
          paddingLeft: '19.2rem',
        },
      },
    },
  },
});
