function badgeSolid(colors) {
  return {
    '&-solid': {
      '@apply border-2 border-white box-border': {},
      '@apply text-white': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            //[`@apply border-${color}`]: {},
            [`@apply text-white bg-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),

      "&[data-color='primary']": {
        '@apply bg-primary': {},
      },
      "&[data-color='warning']": {
        '@apply bg-[#B05F03]': {},
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
            [`@apply text-${color}-text`]: {},
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
        '@apply border-[#B05F03]': {},
        '@apply text-[#B05F03]': {},
      },
      "&[data-color='error']": {
        '@apply border-error': {},
        '@apply text-error': {},
      },
      "&[data-color='neutral']": {
        '@apply border-neutral-300': {},
      },
    },
  };
}

module.exports = badge = (colors) => ({
  '.badge': {
    '@apply relative': {},
    '@apply m-0': {},
    '@apply inline-flex items-center justify-center content-center align-middle': {},
    '@apply font-sans leading-none': {},

    '&-fullrounded': {
      '@apply rounded-full': {},
    },

    //rounding
    '&-roundedcorners-md': {
      '@apply rounded-full px-sm': {},
    },

    '&-roundedcorners-lg': {
      '@apply rounded-full px-sm': {},
    },

    // sizing
    '&-sm': {
      '@apply text-opacity-0 text-[0rem] overflow-hidden rounded-full': {},
      minHeight: '10px',
      maxHeight: '10px',
      minWidth: '10px',

      '&.noborder': {
        '@apply border-none': {},
        minHeight: '6px',
        maxHeight: '6px',
        minWidth: '6px',
      },
    },

    '&-md': {
      '@apply text-xs font-bold': {},
      minHeight: '24px',
      maxHeight: '24px',
      minWidth: '24px',

      '&.noborder': {
        '@apply border-none': {},
        minHeight: '20px',
        maxHeight: '20px',
        minWidth: '20px',
      },
    },

    '&-lg': {
      '@apply text-sm font-bold': {},
      minHeight: '28px',
      maxHeight: '28px',
      minWidth: '28px',

      '&.noborder': {
        '@apply border-none': {},
        minHeight: '24px',
        maxHeight: '24px',
        minWidth: '24px',
      },
    },

    '&-standard-sm': {
      '@apply right-[-4px] self-center': {},
      '&.noborder': {
        '@apply right-[-5px]': {},
      },
    },
    '&-standard-md': {
      '@apply right-[-4px] self-center': {},
      '&.noborder': {
        '@apply right-[-5px]': {},
      },
    },
    '&-standard-lg': {
      '@apply right-[-4px] self-center': {},
      '&.noborder': {
        '@apply right-[-5px]': {},
      },
    },

    '&-super-sm': {
      '@apply right-[-2px] top-[-5px]': {},
      '&.noborder': {
        '@apply right-[-3px]': {},
      },
    },
    '&-super-md': {
      '@apply right-[-3px] top-[-8px]': {},
      '&.noborder': {
        '@apply right-[-4px]': {},
      },
    },
    '&-super-lg': {
      '@apply right-[-4px] top-[-8px]': {},
      '&.noborder': {
        '@apply right-[-5px]': {},
      },
    },

    '&-superoverlap-sm': {
      '@apply right-[3px] top-[-5px]': {},
      '&.noborder': {
        '@apply right-[2px]': {},
      },
    },
    '&-superoverlap-md': {
      '@apply right-[8px] top-[-6px]': {},
      '&.noborder': {
        '@apply right-[7px]': {},
      },
    },
    '&-superoverlap-lg': {
      '@apply right-[8px] top-[-8px]': {},
      '&.noborder': {
        '@apply right-[7px]': {},
      },
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
