const svgToDataUri = require('mini-svg-data-uri');

const MenuVerticalNav = () => ({
  '.sk-menu-vertical-nav': {
    '.sk-menu-vertical': {
      '@apply gap-12': {},

      '&.ul, & ul': {
        '@apply pt-12 pr-[1.6rem] pb-16': {},
      },

      '&-item': {
        '.sk-menu-vertical-item-submenu': {
          '@apply font-bold': {},

          '&-medium': {
            'button, a': {
              '@apply py-[0.6rem] px-[1.4rem]': {},
            },
          },
          '&-large': {
            'button, a': {
              '@apply text-large': {},
              '@apply py-[1rem] px-[1.4rem]': {},
            },
          },
        },
      },
    },
  },
});

const MenuVerticalSidebar = () => ({
  '.sk-menu-vertical-sidebar': {
    '@apply rounded-button': {},

    '> ul > li > .sk-menu-vertical-item-submenu': {
      '> .sk-menu-vertical-item-submenu-button': {
        '@apply min-h-[5.2rem]': {},
      },
    },

    '> ul': {
      '@apply py-16 px-24': {},
    },

    '.sk-menu-vertical': {
      '@apply gap-12': {},

      '&-header': {
        '@apply bg-primary-surface': {},

        '@apply rounded-t-button': {},
        '@apply py-20 px-32': {},

        '&, a': {
          '@apply text-light-primary': {},
        },

        '.sk-divider': {
          '@apply border-inverted-divider': {},
        },

        '.sk-logo': {
          '@apply text-light-secondary': {},
        },
      },

      '&.ul, & ul': {
        '@apply py-8 pl-[2rem] ml-[2rem]': {},
      },

      'li ul': {
        '@apply gap-8': {},

        ul: {
          li: {
            '@apply text-small leading-[1.8rem]': {},

            '.sk-menu-vertical-item-submenu-button, .sk-menu-vertical-item-submenu-button-expand': {
              '@apply py-[0.6rem] px-[1.4rem]': {},
            },
          },
        },

        li: {
          '@apply relative -ml-[.4rem]': {},

          // hook
          '&:before': {
            content: `""`,
            position: 'absolute',
            display: 'inline-flex',
            width: '2rem',
            height: '4.4rem',
            top: '-.8rem',
            left: '-1.6rem',
            backgroundImage: `url("${svgToDataUri(
              `<svg width="16" height="52" viewBox="0 0 16 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 17V17C1 24.1797 6.8203 30 14 30H15" stroke="#B7B7BA" stroke-linecap="round" />
            </svg>`
            )}")`,
            backgroundRepeat: 'no-repeat',
          },

          // line
          '&:not(:last-child):after': {
            content: `""`,
            position: 'absolute',
            display: 'inline-flex',
            width: '2rem',
            top: '-.8rem',
            bottom: '0px',
            left: '-1.6rem',
            backgroundImage: `url("${svgToDataUri(
              `<svg width="16" viewBox="0 0 16 52" xmlns="http://www.w3.org/2000/svg"> 
              <line x1="1" y1="0" x2="1" y2="52" stroke="#B7B7BA" stroke-linecap="round" /> 
            </svg> `
            )}")`,
            backgroundRepeat: 'repeat-y',
          },

          // lastline
          '&:last-child:after': {
            content: `""`,
            position: 'absolute',
            display: 'inline-flex',
            width: '2rem',
            top: '-.8rem',
            bottom: '0px',
            left: '-1.6rem',
            backgroundImage: `url("${svgToDataUri(
              `<svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"> 
              <line x1="1" y1="0" x2="1" y2="17" stroke="#B7B7BA" stroke-linecap="round" /> 
            </svg> `
            )}")`,
            backgroundRepeat: 'no-repeat',
          },
        },
      },
      '&-item': {
        '.sk-menu-vertical-item-submenu': {
          '&-button': {
            '@apply gap-8': {},

            '&[aria-current="page"], &[aria-current="page"] ~ button': {
              '@apply font-bold': {},
            },
          },
        },

        '> a, > button': {
          '&[aria-current="page"]': {
            '@apply font-bold': {},
          },
        },
      },
    },
  },
});

export const MenuVertical = () => ({
  '.sk-menu-vertical': {
    '@apply flex flex-col': {},

    '&.hide': {
      '@apply hidden': {},
    },

    '&-backbutton': {
      '@apply flex items-center gap-[1.6rem] text-lead mb-40': {},
    },

    '&-label': {
      '@apply mb-24': {},
    },

    '&-item': {
      '@apply flex flex-col': {},

      '&.hide': {
        '@apply hidden': {},
      },

      '[aria-disabled="true"]': {
        '@apply cursor-default bg-transparent text-primitives-overlay-darken-6 dark:text-primitives-overlay-lighten-7':
          {},
      },

      'a, button': {
        '@apply flex': {},
        color: 'unset',
      },

      '& > a, > button': {
        '@apply flex items-center min-h-[4.4rem]': {},

        '&:focus-visible': {
          '@apply outline outline-2 outline-ring': {},
        },

        '> *': {
          '@apply flex w-full py-[.6rem] px-[1.4rem]': {},
          '@apply rounded-button cursor-pointer': {},
        },

        '&:not([aria-disabled="true"]) > *': {
          '@apply bg-transparent text-dark-secondary': {},
        },

        '&:hover:not([aria-disabled="true"]) > *': {
          '@apply bg-primitives-overlay-darken-3': {},
        },

        '&[aria-current="page"]:not(:hover) > *': {
          '@apply bg-primary-surface text-light-primary': {},
          '@apply focus-visible:ring': {},
        },
      },

      '.sk-menu-vertical-item-submenu': {
        '@apply flex justify-between w-full': {},
        '@apply rounded-button': {},

        '&:hover': {
          '> a:not([aria-disabled="true"]), > button:not([aria-disabled="true"]), > a[aria-expanded="true"]:not([aria-disabled="true"]), > button[aria-expanded="true"]:not([aria-disabled="true"])':
            {
              '@apply text-dark-primary bg-primitives-overlay-darken-3': {},
            },
        },

        '&:focus-within': {
          '@apply outline outline-2 outline-ring': {},

          '.sk-menu-vertical-item-submenu-button, .sk-menu-vertical-item-submenu-button-expand': {
            '&:focus-visible': {
              '@apply ring-0 ring-offset-0 outline-0': {},
            },
          },
        },

        '&-medium': {
          'button, a': {
            '@apply py-[0.6rem] px-[1.4rem]': {},
          },
        },
        '&-large': {
          'button, a': {
            '@apply py-[1rem] px-[1.4rem]': {},
          },
        },

        '&-button, &-button-expand': {
          '@apply items-center': {},
          '@apply py-[1rem] px-[1.4rem]': {},
        },

        '&-button-expand': {
          '@apply rounded-r-button rounded-l-0': {},
        },

        '&-button': {
          '@apply text-left grow rounded-l-button rounded-r-0': {},

          '&[aria-current="page"]:not(:hover), &[aria-current="page"]:not(:hover) ~ button:not(:hover)': {
            '@apply bg-primary-surface text-light-primary': {},
          },

          '&[aria-expanded="true"]': {
            '&:not(:hover,[aria-current="page"],[aria-disabled="true"]), &:not(:hover,[aria-current="page"],[aria-disabled="true"]) ~ button:not(:hover)':
              {
                '@apply bg-vattjom-surface-accent': {},
              },
          },
        },
      },

      '.sk-menu-vertical-item-tool-item': {
        '@apply flex items-center gap-10 p-[.6rem] rounded-groups': {},

        '.sk-avatar': {
          '@apply border-2 border-background-content': {},
        },
      },
    },
  },

  ...MenuVerticalNav(),
  ...MenuVerticalSidebar(),
});
