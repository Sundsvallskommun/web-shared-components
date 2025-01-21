import svgToTinyDataUri from 'mini-svg-data-uri';

const MenuVerticalNav = () => ({
  '.sk-menu-vertical-nav': {
    '.sk-menu-vertical': {
      '@apply gap-12': {},

      '&.ul, & ul': {
        '@apply pt-12 pr-16 pb-16': {},
      },

      '&-item': {
        '.sk-menu-vertical-item-submenu': {
          '@apply font-bold': {},

          '&-medium': {
            'button, a': {
              '@apply py-6 px-14': {},
            },
          },
          '&-large': {
            'button, a': {
              '@apply text-large': {},
              '@apply py-10 px-14': {},
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
        '@apply min-h-52': {},
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
        '@apply py-8 pl-20 ml-20': {},
      },

      'li ul': {
        '@apply gap-8': {},

        ul: {
          li: {
            '@apply text-small leading-18': {},

            '.sk-menu-vertical-item-submenu-button, .sk-menu-vertical-item-submenu-button-expand': {
              '@apply py-6 px-14': {},
            },
          },
        },

        li: {
          '@apply relative -ml-4': {},

          // hook
          '&:before': {
            '@apply content-[""] absolute inline-flex w-20 h-44 -top-8 -left-16': {},

            backgroundImage: `url("${svgToTinyDataUri(
              `<svg width="16" height="52" viewBox="0 0 16 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 17V17C1 24.1797 6.8203 30 14 30H15" stroke="#B7B7BA" stroke-linecap="round" />
            </svg>`
            )}")`,
            backgroundRepeat: 'no-repeat',
          },

          // line
          '&:not(:last-child):after': {
            '@apply content-[""] absolute inline-flex w-20 -top-8 bottom-0 -left-16': {},

            backgroundImage: `url("${svgToTinyDataUri(
              `<svg width="16" viewBox="0 0 16 52" xmlns="http://www.w3.org/2000/svg"> 
              <line x1="1" y1="0" x2="1" y2="52" stroke="#B7B7BA" stroke-linecap="round" /> 
            </svg> `
            )}")`,
            backgroundRepeat: 'repeat-y',
          },

          // lastline
          '&:last-child:after': {
            '@apply content-[""] absolute inline-flex w-20 -top-8 bottom-0 -left-16': {},

            backgroundImage: `url("${svgToTinyDataUri(
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
    '@apply text-base': {},

    '&.hide': {
      '@apply hidden': {},
    },

    '&-backbutton': {
      '@apply flex items-center gap-16 text-lead mb-40': {},
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
        '@apply flex items-center min-h-44': {},

        '&:focus-visible': {
          '@apply outline outline-2 outline-ring': {},
        },

        '> *': {
          '@apply flex w-full py-6 px-14': {},
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
            '@apply py-6 px-14': {},
          },
        },
        '&-large': {
          'button, a': {
            '@apply py-10 px-14': {},
          },
        },

        '&-button, &-button-expand': {
          '@apply items-center': {},
          '@apply py-10 px-14': {},
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
        '@apply flex items-center gap-10 p-6 rounded-groups': {},

        '.sk-avatar': {
          '@apply border-2 border-background-content': {},
        },
      },
    },
  },

  ...MenuVerticalNav(),
  ...MenuVerticalSidebar(),
});
