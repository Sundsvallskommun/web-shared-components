function tagOutline(colors) {
  return {
    '.tag-outline': {
      '@apply border bg-transparent border-gray-stroke text-body': {},

      '&[href]': {
        [`@apply hover:border-hover hover:text-white hover:bg-hover`]: {},
        [`@apply active:text-white active:bg-hover`]: {},
        [`@apply focus-visible:text-white focus-visible:ring-4 focus-visible:ring-black focus-visible:bg-hover`]: {},
      },
    },
  };
}

function tagSolid(colors) {
  return {
    '.tag-solid': {
      '@apply border bg-gray-stroke border-transparent text-white': {},

      '&[href]': {
        [`@apply hover:text-white hover:bg-hover`]: {},
        [`@apply active:text-white active:bg-hover`]: {},
        [`@apply focus-visible:text-white focus-visible:ring-4 focus-visible:ring-black focus-visible:bg-hover`]: {},
      },

      '.tag-close-button': {
        '@apply text-white hover:text-body': {},
      },
    },
  };
}

function tagLight(colors) {
  return {
    '.tag-light': {
      '@apply border border-transparent text-body': {},

      '&[href]': {
        [`@apply hover:border-hover`]: {},
        [`@apply active:border-hover`]: {},
        [`@apply focus-visible:border-hover focus-visible:ring-4 focus-visible:ring-black`]: {},
      },
    },
  };
}

module.exports = Tag = (colors) => ({
  '.tag': {
    '@apply leading-none inline-flex items-center content-center max-h-full rounded-full font-normal outline-none whitespace-nowrap':
      {},
    width: 'fit-content',
    height: 'fit-content',
    padding: '0 1.145em 0 1.145em',
    borderRadius: '3.2rem',

    '&-text': {
      padding: '0.5em 0',
    },

    '&-sm': {
      '@apply text-xs': {},
      minWidth: '1.25rem',
    },

    '&-md': {
      '@apply text-sm': {},
      minWidth: '1.5rem',
    },

    '&-lg': {
      '@apply text-base': {},
      minWidth: '1.75rem',
    },
  },

  // variants
  ...tagOutline(colors),
  ...tagSolid(colors),
  ...tagLight(colors),

  '.tag-close-button': {
    '@apply text-body border-transparent flex items-center justify-center transition-all duration-150 rounded-full outline-none cursor-base':
      {},
    fontSize: '1em',
    padding: '0.36em',
    marginLeft: '0.25em',
    marginRight: '-0.55em',

    '&-icon': {
      fontSize: '1em !important',
    },

    '&-disabled': {
      '@apply disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none': {},
    },
  },
});
