function badgeSolid(colors) {
  return {
    '&-solid': {
      //"@apply text-": {},
      '@apply border border-white': {},
      '@apply text-white': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            //[`@apply border-${color}`]: {},
            [`@apply text-white bg-${color}`]: {},
          },
        }),
        {}
      ),

      "&[data-color='primary']": {
        '@apply bg-primary': {},
      },
      "&[data-color='warning']": {
        '@apply bg-warning': {},
      },
      "&[data-color='error']": {
        '@apply bg-error': {},
      },
      "&[data-color='neutral']": {
        '@apply bg-neutral-400': {},
      },

    },
  };
}

function badgeOutline(colors) {
  return {
    '&-outline': {
      '@apply border border-gray-stroke': {},
      '@apply text-body bg-transparent': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply border-current`]: {},
            [`@apply text-${color}`]: {},

          },
        }),
        {}
      ),

      '&.badge': {
        '&-disabled': {
          '@apply disabled:border-gray-stroke hover:border-gray-stroke': {},
          '&.active': {
            '@apply border-gray-stroke': {},
          },
        },
      },

      "&[data-color='primary']": {
        '@apply border-primary': {},
        '@apply text-primary': {},
      },
      "&[data-color='warning']": {
        '@apply border-warning': {},
        '@apply text-warning': {},
      },
      "&[data-color='error']": {
        '@apply border-error': {},
        '@apply text-error': {},
      },
      "&[data-color='neutral']": {
        '@apply border-neutral-300': {},
        '@apply border-neutral-300': {},

      },
    },
  };
}


module.exports = badge = (colors) => ({
  '.badge': {
    '@apply relative': {},
    '@apply m-0': {},
    '@apply  inline-flex items-center justify-center flex-shrink-0 align-middle': {},
    '@apply font-medium leading-none': {},

    '&-fullrounded': {
      '@apply rounded-full': {},
    },

    //rounding
    '&-roundedcorners-md': {
      '@apply rounded-2xl px-sm': {},
    },

    '&-roundedcorners-lg': {
      '@apply rounded-3xl px-sm': {},
    },

    // sizing
    '&-sm': {
      '@apply text-opacity-0 text-[0rem] overflow-hidden rounded-full': {},
      minHeight: '7px',
      maxHeight: '7px',
      minWidth: '7px',
    },

    '&-md': {
      '@apply text-xs font-bold': {},
      minHeight: '21px',
      maxHeight: '21px',
      minWidth: '21px',

    },

    '&-lg': {
      '@apply text-sm font-bold': {},
      minHeight: '25px',
      maxHeight: '25px',
      minWidth: '25px',

    },

    '&-standard-sm': {
      '@apply right-[-4px] self-center' : {},
    },
    '&-standard-md': {
      '@apply right-[-4px] self-center': {},
    },
    '&-standard-lg': {
      '@apply right-[-4px] self-center': {},
    },

    '&-super-sm': {
      '@apply right-[-2px] top-[-5px]': {},
    },
    '&-super-md': {
      '@apply right-[-3px] top-[-8px]': {},
    },
    '&-super-lg': {
      '@apply right-[-4px] top-[-8px]': {},
    },

    '&-superoverlap-sm': {
      '@apply right-[3px] top-[-5px]': {},
    },
    '&-superoverlap-md': {
      '@apply right-[8px] top-[-6px]': {},
    },
    '&-superoverlap-lg': {
      '@apply right-[8px] top-[-8px]': {},
    },


    '&-fit-content': {
      '@apply p-0': {},
      fontSize: 'inherit',
    },


    // variants
    ...badgeSolid(colors),
    ...badgeOutline(colors),

  },
});
