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
        '@apply flex-grow select-none': {},
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
          '@apply flex-grow flex items-center text-base text-left justify-start py-sm pr-sm h-full': {},
        },

        '.expand': {
          '@apply w-[50px] h-full flex justify-center items-center ml-auto p-0': {},

          span: {
            '@apply flex justify-center items-center border-l border-gray-stroke h-[24px] w-[45px]': {},
          },
        },
      },

      '&.open': {
        '&:not(.moved-away) + .menu-item:not(.new-item) > .wrapper': {
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
          '@apply -translate-x-full text-gray-stroke absolute py-sm inset-y-0 my-auto': {},

          svg: {
            '@apply h-full': {},
          },
          '&-label': {
            '@apply text-[#B65A06]': {},
          },
        },

        '.menu-item-error': {
          '@apply text-error -ml-[5px] absolute -translate-x-full': {},
        },

        '&.moved-away': {
          '@apply text-gray pointer-events-none': {},

          '.menu-item-link': {
            '@apply opacity-[78%] relative': {},

            '&::before': {
              '@apply absolute -translate-x-full -ml-sm block w-[10px] h-[10px] rounded-full bg-warning': {},
              content: '""',
            },
          },

          '.menu-item-error, .menu-item-changes, .items': {
            '@apply hidden': {},
          },

          '.menu-item-changes': {
            '@apply bg-gray': {},
          },

          '.menu-item-move-button': {
            '@apply hidden': {},
          },

          '.expand': {
            '@apply opacity-[78%]': {},
            path: {
              '@apply fill-gray-stroke': {},
            },
          },
        },

        '&.movedHere': {
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

        '&.new-item': {
          '.wrapper': {
            '@apply border-[3px] border-dashed border-[rgba(0,0,0,0.3)]': {},
            boxSizing: 'border-box',

            '.menu-item-move-button': {
              '@apply -ml-[3px]': {},
            },
          },
        },

        '& .menu-item-changes': {
          '@apply bg-warning rounded-full w-[24px] h-[24px] text-center text-sm font-bold text-white': {},
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

        '&:last-child.open > .items': {
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

        '&.new-item': {
          '> .wrapper .menu-item-link': {
            '@apply h-[50px] max-h-[50px]': {},
          },
        },

        '&.open:not(.new-item) > .wrapper': {
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

        '&.new-item, .new-item': {
          '> .wrapper .menu-item-link': {
            '@apply h-[42px] max-h-[42px]': {},
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

  // Sparkle icon scss
  '.sparkle-icon': {
    '@apply inline-flex w-[25px] h-[18px] ml-md  gap-[6px]': {},
  },
  '.sparkle-vert-lg': {
    '@apply relative w-0 h-0 border-b-[10px] border-b-primary border-x-[4px] border-x-transparent border-t-[4px] border-t-transparent top-[-4px]':
      {},
    '&::after': {
      '@apply content-[""] absolute left-[-4px] top-[12px] w-0 h-0 border-x-[4px] border-b-[4px] border-x-transparent border-b-transparent border-t-[10px] border-t-primary':
        {},
    },
  },
  '.sparkle-horizontal-lg': {
    '@apply relative w-0 h-0 border-b-[10px] border-b-primary border-x-[4px] border-x-transparent border-t-[4px] border-t-transparent right-[-7px] top-[-10px] rotate-[90deg]':
      {},
    '&::after': {
      '@apply content-[""] absolute left-[-4px] top-[10px] w-0 h-0 border-x-[4px] border-b-[4px] border-x-transparent border-b-transparent border-t-[10px] border-t-primary':
        {},
    },
  },
  '.sparkle-vert-sm': {
    '@apply relative w-0 h-0 border-b-[6px] border-b-primary border-x-[2px] border-x-transparent border-t-[2px] border-t-transparent top-[-2px]':
      {},
    '&::after': {
      '@apply content-[""] absolute left-[-1.8px] top-[6px] w-0 h-0 border-x-[2px] border-b-[2px] border-x-transparent border-b-transparent border-t-[6px] border-t-primary':
        {},
    },
  },
  '.sparkle-horizontal-sm': {
    '@apply relative w-0 h-0 border-b-[6px] border-b-primary border-x-[2px] border-x-transparent border-t-[6px] border-t-transparent right-[-5.5px] top-[-8px] rotate-[90deg]':
      {},
    '&::after': {
      '@apply content-[""] absolute left-[-2.2px] top-[5px] w-0 h-0 border-x-[2px] border-b-[6px] border-x-transparent border-b-transparent border-t-[6px] border-t-primary':
        {},
    },
  },
  '.twinkling-1': {
    '@apply animate-pulse delay-75': {},
  },
  '.twinkling-2': {
    '@apply animate-fast-pulse delay-75': {},
  },
  '.twinkling-3': {
    '@apply animate-slow-pulse delay-1000': {},
  },

  '@keyframes slow-pulse': {
    '75%': {
      opacity: 0,
    },
  },
  '@keyframes fast-pulse': {
    '65%': {
      opacity: 0,
    },
  },

  '.animate-slow-pulse': {
    animation: 'slow-pulse 2s cubic-bezier(0.1, 0.8, 0.2, 0.8) infinite',
  },

  '.animate-fast-pulse': {
    animation: 'fast-pulse 1.5s cubic-bezier(0.4, 0.8, 0.8, 1) infinite',
  },
});
