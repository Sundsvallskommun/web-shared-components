const MenuVerticalNav = () => ({
  '.sk-menu-vertical-nav': {
    '.sk-menu-vertical': {
      '@apply flex flex-col gap-12': {},

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
        'a, button': {
          '@apply rounded-button': {},
          '@apply inline-flex py-[0.6rem] px-[1.4rem]': {},
          '@apply justify-between w-full': {},
          color: 'unset',
        },

        '&-submenu-button': {
          '&[aria-expanded="false"]': {
            '@apply bg-transparent': {},

            '&:hover': {
              '&.sk-btn': {
                '@apply bg-primitives-overlay-darken-3': {},
              },
            },
            '&.sk-btn': {
              '@apply bg-transparent': {},
            },

            '+ ul': {
              '@apply hidden': {},
            },
          },

          '&[aria-expanded="true"]': {
            '&:hover': {
              '&.sk-btn': {
                '@apply bg-primitives-overlay-darken-3': {},
              },
            },
            '&.sk-btn': {
              '@apply bg-primitives-blue-200': {},
            },
            '& + ul': {
              '@apply flex': {},
            },
          },
        },

        '> *:first-child': {
          '@apply cursor-pointer': {},
          '@apply bg-transparent text-dark-secondary': {},

          '&:hover': {
            '@apply bg-primitives-overlay-darken-3': {},
          },

          '&[aria-current="page"]:not(:hover)': {
            '@apply bg-primary-surface text-light-primary': {},
            '@apply focus-visible:ring': {},
          },
        },
      },
    },
  },
});

module.exports = MenuVertical = () => ({
  ...MenuVerticalNav(),
});
