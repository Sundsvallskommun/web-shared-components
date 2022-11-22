const svgToDataUri = require('mini-svg-data-uri');

module.exports = Checkbox = (colors, theme) => ({
  '.form-checkbox': {
    //"@apply rounded shadow-sm": {},
    backgroundColor: 'inherit',
    '@apply border-gray-stroke focus:bg-white': {},

    '&[aria-invalid=true]': {
      '--tw-border-opacity': '1',
      borderColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
    },
    '&[aria-invalid=true]:hover': {
      '--tw-border-opacity': '1',
      'border-color': 'rgba(220, 38, 38, var(--tw-border-opacity))',
    },
    // dark colors
    '@apply dark:border-neutral-400': {},
    '.dark &[aria-invalid=true]': {
      '--tw-border-opacity': '1',
      borderColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
    },
    '.dark &[aria-invalid=true]:hover': {
      '--tw-border-opacity': '1',
      borderColor: 'rgba(248, 113, 113, var(--tw-border-opacity))',
    },

    '@media (prefers-color-scheme: dark)': {
      '&[aria-invalid=true]': {
        '--tw-border-opacity': '1',
        borderColor: 'rgba(220, 38, 38, var(--tw-border-opacity))',
      },
      '&[aria-invalid=true]:hover': {
        '--tw-border-opacity': '1',
        'border-color': 'rgba(220, 38, 38, var(--tw-border-opacity))',
      },
    },

    '&:checked': {
      '@apply text-white bg-white border-primary': {},
      [`@apply focus-visible:border-primary focus-visible:ring-primary`]: {},

      backgroundImage: `url("${svgToDataUri(
        `<svg viewBox="0 0 16 16" fill="#005595" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
      )}")`,
      //borderColor: "transparent",
    },

    [`&[data-color="primary"]`]: {
      //[`@apply text-primary`]: {},
      // dark
      //[`@apply dark:text-primary`]: {},
      //[`@apply dark:focus-visible:border-primary-400 dark:focus-visible:ring-primary-400`]: {},
    },

    // Fix focus stylign
    '&:checked:hover, &:checked:focus': {
      '@apply bg-white border-primary': {},
    },

    // colors
    /*...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply text-${color}`]: {},
          [`@apply focus-visible:border-${color} focus-visible:ring-${color}`]: {},
          backgroundImage: `url("${svgToDataUri(
            `<svg viewBox="0 0 16 16" fill="${theme(`colors.primary_raw.DEFAULT`)}" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
          )}")`,
          // dark
          [`@apply dark:text-${color}`]: {},
          [`@apply dark:focus-visible:border-${color}-400 dark:focus-visible:ring-${color}-400`]: {},
        },
      }),
      {}
    ),*/

    '@apply dark:focus-visible:ring-offset-neutral-900': {},

    // sizing
    '&-sm': {
      width: '1.4rem',
      height: '1.4rem',
    },

    '&-md': {
      width: '1.6rem',
      height: '1.6rem',
      //"@apply w-4 h-4": {},
    },

    '&-lg': {
      width: '1.8rem',
      height: '1.8rem',
    },

    // disabled
    '&-disabled, &-disabled:checked': {
      '@apply grayscale cursor-not-allowed bg-gray-middle hover:bg-gray-middle': {},
      //"@apply disabled:bg-gray-stroke": {},
      //"@apply disabled:shadow-none disabled:border-neutral-300 disabled:bg-neutral-300 disabled:hover:text-neutral-300": {},
      //"@apply dark:disabled:border-transparent dark:disabled:bg-white/20 dark:disabled:hover:text-white/20": {},
    },

    // label
    '&-label': {
      '@apply text-body select-none text-sm': {},
      marginLeft: '0.8rem',
      //"@apply text-black": {},
      // dark colors
      '@apply dark:text-neutral-100': {},

      '&-sm': {
        '@apply text-xs': {},
      },

      '&-md': {
        '@apply text-sm': {},
      },

      '&-lg': {
        '@apply text-base': {},
      },
    },
  },
});
