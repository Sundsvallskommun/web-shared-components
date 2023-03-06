function badgeSolid(colors) {
  return {
    '&-solid': {
      //"@apply text-": {},
      '@apply border-none': {},
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
      minHeight: '6px',
      maxHeight: '6px',
      minWidth: '6px',
    },

    '&-md': {
      '@apply text-xs font-bold': {},
      minHeight: '20px',
      maxHeight: '20px',
      minWidth: '20px',

    },

    '&-lg': {
      '@apply text-sm font-bold': {},
      minHeight: '24px',
      maxHeight: '24px',
      minWidth: '24px',

    },

    '&-standard-sm': {
      '@apply absolute right-[-14px]': {},
    },
    '&-standard-md': {
      '@apply absolute right-[-28px]': {},
    },
    '&-standard-lg': {
      '@apply absolute right-[-32px]': {},
    },

    '&-super-sm': {
      '@apply absolute right-[-14px] top-[-3px]': {},
    },
    '&-super-md': {
      '@apply absolute right-[-28px] top-[-8px]': {},
    },
    '&-super-lg': {
      '@apply absolute right-[-32px] top-[-8px]': {},
    },

    '&-superoverlap-sm': {
      '@apply absolute right-[-4px] top-[-3px]': {},
    },
    '&-superoverlap-md': {
      '@apply absolute right-[-12px] top-[-8px]': {},
    },
    '&-superoverlap-lg': {
      '@apply absolute right-[-13px] top-[-8px]': {},
    },

    '&-overlap-sm': {
      '@apply absolute right-[8px]': {},
    },
    '&-overlap-md': {
      '@apply absolute right-[6px]': {},
    },
    '&-overlap-lg': {
      '@apply absolute right-[4px]': {},
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
