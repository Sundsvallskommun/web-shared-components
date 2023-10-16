function buttonSolid(colors) {
  return {
    '&-solid': {
      //"@apply text-": {},
      '@apply font-semibold border border-gray-stroke': {},
      '@apply text-body bg-white': {},
      /* hover */
      '@apply hover:text-white hover:bg-hover hover:border-primary-active': {},
      /* keyboard active */
      '&.active': {
        '@apply text-white bg-hover border-primary-active': {},
        /* dark */
        '@apply dark:border-hover dark:bg-neutral-600': {},
      },
      /* focus */
      '@apply focus-visible:z-base': {},
      '@apply focus-visible:border-primary': {},
      '@apply focus-visible:ring-4 focus-visible:ring-black': {},
      /* active */
      '@apply active:bg-hover active:text-white': {},

      /* dark mode */
      '@apply dark:border-neutral-600': {},
      '@apply dark:text-neutral-100 dark:bg-neutral-700': {},
      /* dark hover */
      '@apply dark:hover:border-hover dark:hover:bg-neutral-600': {},
      /* dark focus */
      '@apply dark:focus-visible:border-primary-500': {},
      /* dark active */
      '@apply dark:active:bg-neutral-900 dark:active:border-neutral-600': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            //[`@apply border-${color}`]: {},
            [`@apply text-white bg-${color}`]: {},
            // hover
            [`@apply hover:text-white hover:bg-${color}-active`]: {},
            // keyboard active
            '&.active': {
              [`@apply text-white bg-${color}-active`]: {},
            },

            [`@apply active:text-white active:bg-${color}-active`]: {},
            [`@apply focus-visible:ring-4 focus-visible:ring-black`]: {},

            // focus
            //[`@apply focus-visible:bg-${color}-700`]: {},
            //[`@apply focus-visible:border-${color}-500`]: {},
            //[`@apply focus-visible:ring-${color}-500`]: {},
            // active
            //[`@apply active:bg-${color}-600`]: {},
            // dark mode
            //[`@apply dark:border-${color}-500`]: {},
            //[`@apply dark:bg-${color}-600`]: {},
            // dark hover
            //[`@apply dark:hover:border-${color}-400 dark:hover:bg-${color}-500`]: {},
            // dark focus
            //[`@apply dark:focus-visible:border-${color}-500`]: {},
            //[`@apply dark:focus-visible:ring-${color}-500`]: {},
            // dark active
            //[`@apply dark:active:bg-${color}-800 dark:active:border-${color}-600`]: {},
          },
        }),
        {}
      ),

      "&[data-color='primary']": {
        '@apply border-primary hover:border-primary-active': {},
        '&.active': {
          '@apply border-primary-active': {},
        },
      },

      '&.btn': {
        '&-disabled, &[aria-disabled="true"]': {
          '@apply disabled:border-gray-stroke border-gray-stroke hover:border-gray-stroke': {},
          '&.active': {
            '@apply border-gray-stroke': {},
          },
        },
      },
    },
  };
}

function buttonOutline(colors) {
  return {
    '&-outline': {
      '@apply font-semibold border border-gray-stroke': {},
      '@apply text-body bg-transparent': {},
      /* hover */
      '@apply hover:text-white hover:bg-primary-active hover:border-primary-active': {},
      /* keyboard active */
      '&.active': {
        '@apply text-white bg-primary-active border-primary-active': {},
        /* dark keyboard active */
        '@apply dark:border-neutral-300 dark:bg-neutral-700': {},
      },
      /* focus */
      '@apply focus-visible:z-base': {},
      '@apply focus-visible:border-primary-500': {},
      '@apply focus-visible:ring-4 focus-visible:ring-primary-500': {},
      /* active */
      '@apply active:bg-neutral-200': {},
      /* dark mode */
      '@apply dark:border-neutral-600': {},
      '@apply dark:text-neutral-100 dark:bg-transparent': {},
      /* dark hover */
      '@apply dark:hover:border-neutral-300 dark:hover:bg-neutral-700': {},
      /* dark focus */
      '@apply dark:focus-visible:border-primary-500': {},
      /* dark active */
      '@apply dark:active:bg-neutral-600 dark:active:border-neutral-600': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply border-current`]: {},
            [`@apply text-${color}-600 bg-transparent`]: {},
            /* hover */
            [`@apply hover:text-white hover:bg-${color}-active hover:border-${color}-active`]: {},
            /* keyboard active */
            '&.active': {
              [`@apply text-white bg-${color}-active border-${color}-active`]: {},

              /* dark keyboard active */
              [`@apply dark:bg-${color}-200`]: {},
              [`@apply dark:bg-opacity-15`]: {},
            },
            /* focus */
            [`@apply focus-visible:border-${color}-500`]: {},
            [`@apply focus-visible:ring-${color}-500`]: {},
            /* active */
            [`@apply active:bg-${color}-100`]: {},
            /* dark mode */
            [`@apply dark:border-${color}-200`]: {},
            [`@apply dark:text-${color}-200 dark:bg-transparent`]: {},
            [`@apply dark:border-${color}-300`]: {},
            /* dark hover */
            [`@apply dark:hover:bg-${color}-200`]: {},
            [`@apply dark:hover:bg-opacity-15`]: {},
            /* dark focus */
            [`@apply dark:focus-visible:border-${color}-500`]: {},
            [`@apply dark:focus-visible:ring-${color}-500`]: {},
            /* dark active */
            [`@apply dark:active:bg-${color}-200`]: {},
            [`@apply dark:active:bg-opacity-25`]: {},
          },
        }),
        {}
      ),

      '&.btn': {
        '&-disabled, &[aria-disabled="true"]': {
          '@apply disabled:border-gray-stroke border-gray-stroke hover:border-gray-stroke': {},
          '&.active': {
            '@apply border-gray-stroke': {},
          },
        },
      },
    },
  };
}

function buttonGhost(colors) {
  return {
    '&-ghost': {
      /* focus */
      '@apply focus-visible:z-base': {},
      '@apply focus-visible:ring-4 focus-visible:ring-primary-500': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            /* focus */
            [`@apply focus-visible:ring-${color}-500`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function buttonLink(colors) {
  return {
    '&-link': {
      '@apply h-auto p-0 leading-normal text-neutral-600 hover:underline active:text-neutral-700': {},
      '&.active': {
        '@apply underline': {},
      },
      '@apply focus-visible:z-base focus-visible:ring-4 focus-visible:ring-primary-500': {},
      // dark colors
      '@apply dark:text-neutral-200': {},
      '@apply dark:active:text-neutral-500': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-600 active:text-${color}-700`]: {},
            [`@apply focus-visible:ring-${color}-500`]: {},
            // dark colors
            [`@apply dark:text-${color}-200`]: {},
            [`@apply dark:active:text-${color}-500`]: {},
          },
        }),
        {}
      ),
    },
  };
}

module.exports = Button = (colors) => ({
  '.btn': {
    '@apply relative': {},
    '@apply m-0': {},
    '@apply px-[3.2rem]': {},
    '@apply py-0': {},
    '@apply rounded-[0.4rem] inline-flex items-center justify-center flex-shrink-0 align-middle': {},
    '@apply font-medium leading-tight': {},
    transitionProperty: 'background-color, border-color, color, fill, stroke, box-shadow',
    '@apply	duration-75 ease-out': {},
    '@apply outline-none appearance-none cursor-base select-none whitespace-nowrap': {},
    '@apply focus-visible:outline-none': {},

    "&[data-rounded='true']": {
      borderRadius: '3.2rem',
    },

    // sizing
    '&-sm': {
      '@apply text-xs': {},
      minHeight: '4rem',
      maxHeight: '4rem',
    },

    '&-md': {
      '@apply text-sm': {},
      minHeight: '4.4rem',
      maxHeight: '4.4rem',
    },

    '&-lg': {
      '@apply text-base': {},
      minHeight: '4.8rem',
      maxHeight: '4.8rem',
    },
    '&-fit-content': {
      '@apply p-0': {},
      fontSize: 'inherit',
    },

    // State

    '&-disabled, &[aria-disabled="true"]': {
      '@apply shadow-none disabled:shadow-none disabled:cursor-not-allowed cursor-not-allowed': {},
      '@apply disabled:text-gray text-gray disabled:bg-gray-light bg-gray-light !important': {},
    },
    '.MuiSvgIcon-root': {
      fontSize: '1.5em',
      width: '1em',
      height: '1em',
    },

    // variants
    ...buttonSolid(colors),
    ...buttonOutline(colors),
    ...buttonGhost(colors),
    ...buttonLink(colors),
  },
  '.btn-has-icon': {
    '&-left .MuiSvgIcon-root': {
      '@apply mr-sm': {},
    },
    '&-right .MuiSvgIcon-root': {
      '@apply ml-sm': {},
    },
  },
  '[data-icon=true]': {
    '@apply p-0': {},
    "&[data-rounded='true']": {
      '@apply rounded-full': {},
    },
    '&.btn-sm': {
      minWidth: '4rem',
      maxWidth: '4rem',
    },

    '&.btn-md': {
      minWidth: '4.4rem',
      maxWidth: '4.4rem',
    },

    '&.btn-lg': {
      minWidth: '4.8rem',
      maxWidth: '4.8rem',
    },
    '.btn-has-icon': {
      '&-left .MuiSvgIcon-root': {
        '@apply mr-0': {},
      },
      '&-right .MuiSvgIcon-root': {
        '@apply ml-0': {},
      },
    },
  },
});
