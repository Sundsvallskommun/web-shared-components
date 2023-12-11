const MenuVerticalNav = () => ({
  '.sk-menu-vertical-nav': {
    '.sk-menu-vertical': {
      '@apply flex flex-col gap-12': {},

      '&.hide': {
        '@apply hidden': {},
      },

      '&-backbutton': {
        '@apply flex items-center gap-[1.6rem] text-lead mb-40': {},
      },

      '&-label': {
        '@apply mb-24': {},
      },

      '&.ul, & ul': {
        '@apply pt-12 pr-[1.6rem] pb-16': {},
      },

      '&-item': {
        '@apply flex flex-col': {},

        '&.hide': {
          '@apply hidden': {},
        },

        '[aria-disabled="true"]': {
          '@apply cursor-default bg-transparent text-primitives-overlay-darken-6': {},
        },

        'a, button': {
          '@apply flex': {},
          color: 'unset',
        },

        '> a, > button': {
          '@apply py-[.6rem] px-[1.4rem]': {},
          '@apply rounded-button cursor-pointer': {},
          '@apply bg-transparent text-dark-secondary': {},

          '&:hover:not([aria-disabled="true"])': {
            '@apply bg-primitives-overlay-darken-3': {},
          },

          '&[aria-current="page"]:not(:hover)': {
            '@apply bg-primary-surface text-light-primary': {},
            '@apply focus-visible:ring': {},
          },
        },

        '.sk-menu-vertical-item-submenu': {
          '@apply flex justify-between w-full': {},
          '@apply rounded-button': {},

          '&:focus-within': {
            '@apply outline outline-2 outline-ring': {},

            '*:focus-visible': {
              '@apply ring-0 outline-0': {},
            },
          },

          '&-medium': {
            'button, a': {
              '@apply font-bold': {},
              '@apply py-[0.6rem] px-[1.4rem]': {},
            },
          },
          '&-large': {
            'button, a': {
              '@apply font-bold text-large': {},
              '@apply py-[1rem] px-[1.4rem]': {},
            },
          },

          '&-button, &-button-expand': {
            '@apply py-[1rem] px-[1.4rem]': {},
          },

          '&-button-expand': {
            '@apply items-center rounded-r-button rounded-l-0': {},
          },

          '&-button': {
            '@apply text-left grow rounded-l-button rounded-r-0': {},

            '&:hover:not([aria-disabled="true"]), & ~ button:hover:not([aria-disabled="true"]), &:hover:not([aria-disabled="true"]) ~ button':
              {
                '@apply bg-primitives-overlay-darken-3': {},
              },

            '&[aria-current="page"]:not(:hover), &[aria-current="page"]:not(:hover) ~ button:not(:hover)': {
              '@apply bg-primary-surface text-light-primary': {},
              '@apply focus-visible:ring': {},
            },

            '&[aria-expanded="true"]': {
              '&:not(:hover,[aria-current="page"],[aria-disabled="true"]), &:not(:hover,[aria-current="page"],[aria-disabled="true"]) ~ button:not(:hover)':
                {
                  '@apply bg-primitives-blue-200': {},
                },
            },
          },
        },
      },
    },
  },
});

module.exports = MenuVertical = () => ({
  ...MenuVerticalNav(),
});
