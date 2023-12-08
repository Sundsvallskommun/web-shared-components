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

        'a, button': {
          '@apply flex': {},
          color: 'unset',
        },

        '> a, > button': {
          '@apply py-[.6rem] px-[1.4rem]': {},
          '@apply rounded-button cursor-pointer': {},
          '@apply bg-transparent text-dark-secondary': {},

          '&:hover': {
            '@apply bg-primitives-overlay-darken-3': {},
          },

          '&[aria-current="page"]:not(:hover)': {
            '@apply bg-primary-surface text-light-primary': {},
            '@apply focus-visible:ring': {},
          },
        },

        '.sk-menu-vertical-item-submenu': {
          '@apply flex items-center justify-between w-full': {},
          '@apply rounded-button': {},

          '&:focus-within': {
            '@apply outline outline-2 outline-ring': {},

            '*:focus-visible': {
              '@apply ring-0 outline-0': {},
            },
          },

          '&-button, &-button-expand': {
            '@apply py-[1rem] px-[1.4rem]': {},
          },

          '&-button-expand': {
            '@apply rounded-r-button rounded-l-0': {},
          },

          '&-button': {
            '@apply grow rounded-l-button rounded-r-0': {},

            '&:hover, & ~ button:hover, &:hover ~ button': {
              '@apply bg-primitives-overlay-darken-3': {},
            },

            '&[aria-current="page"]:not(:hover), &[aria-current="page"]:not(:hover) ~ button:not(:hover)': {
              '@apply bg-primary-surface text-light-primary': {},
              '@apply focus-visible:ring': {},
            },

            '&[aria-expanded="true"]': {
              '&:not(:hover,[aria-current="page"]), &:not(:hover,[aria-current="page"]) ~ button:not(:hover)': {
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
