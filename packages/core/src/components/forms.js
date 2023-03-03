function fieldOutline(colors) {
  return {
    '&-outline': {
      '@apply border shadow-sm border-gray-stroke': {},
      '@apply text-gray bg-white': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply focus-visible:border-${color} focus-visible:ring-${color}`]: {},
            [`@apply dark:focus-visible:border-${color} dark:focus-visible:ring-${color}`]: {},
          },
        }),
        {}
      ),

      '&[aria-invalid=true]': {
        '@apply border-error ring-error': {},

        '&:focus-visible': {
          '@apply border-error ring-error': {},
        },
      },
    },
  };
}

function fieldSolid(colors) {
  return {
    '&-solid': {
      '@apply border border-transparent': {},
      '@apply text-black bg-gray-light': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply focus-visible:border-${color} focus-visible:ring-${color}`]: {},
            [`@apply dark:focus-visible:border-${color} dark:focus-visible:ring-${color}`]: {},
          },
        }),
        {}
      ),

      '&[aria-invalid=true]': {
        '@apply border-error ring-error': {},

        '&:focus-visible': {
          '@apply border-error ring-error': {},
        },
      },
    },
  };
}

function formControl() {
  return {
    '.form-control': {
      '@apply w-full relative': {},
    },
    '.form-helper-text': {
      '@apply mt-1.5 leading-none text-gray dark:text-white/60': {},
    },
    '.form-error-message': {
      '@apply mt-1.5 leading-none flex items-center text-sm text-error': {},
    },
    '.form-label': {
      '@apply text-sm font-medium text-left align-middle block mb-1.5': {},
    },
    '.form-required-indicator': {
      '@apply ml-1 text-sm': {},
      '--tw-text-opacity': '1',
      color: 'rgba(239, 68, 68, var(--tw-text-opacity))',
      '.dark &': {
        '--tw-text-opacity': '1',
        color: 'rgba(252, 165, 165, var(--tw-text-opacity))',
      },
    },
  };
}

function formInputGroup() {
  return {
    '.form-input-group': {
      '@apply flex relative h-fit w-full rounded-[0.2rem] border border-gray-stroke': {},

      '&:focus-within': {
        '@apply border border-primary ring-primary ring-1': {},
      },

      '> *': {
        '@apply border-0 ring-0': {},

        '&:focus': {
          '@apply ring-0': {},
        },
      },

      '&-sm': {
        '@apply min-h-[4rem] max-h-[4rem]': {},

        '.form-field': {
          '@apply min-h-[3.8rem] max-h-[3.8rem]': {},
        },
      },

      '&-md': {
        '@apply min-h-[4.4rem] max-h-[4.4rem]': {},

        '.form-field': {
          '@apply min-h-[4.2rem] max-h-[4.2rem]': {},
        },
      },

      '&-lg': {
        '@apply min-h-[4.8rem] max-h-[4.8rem]': {},

        '.form-field': {
          '@apply min-h-[4.6rem] max-h-[4.6rem]': {},
        },
      },

      "&[data-rounded='true']": {
        '@apply rounded-[3.2rem]': {},

        '> *:first-child': {
          '@apply rounded-[3.2rem]': {},
        },

        '> *:last-child': {
          '@apply rounded-[3.2rem]': {},
        },
      },

      '&[aria-invalid=true]': {
        '@apply border-error ring-error': {},
      },
    },

    '.form-input-element': {
      '@apply flex items-center justify-center absolute z-base top-0': {},

      '&-sm': {
        '@apply text-xs h-7 w-7': {},
      },

      '&-md': {
        '@apply text-sm h-8 w-8': {},
      },

      '&-lg': {
        '@apply text-base h-10 w-10': {},
      },
    },

    '.form-input-addon': {
      '@apply flex items-center w-auto shadow-sm whitespace-nowrap': {},
      '@apply text-neutral-600 bg-neutral-50': {},
      // dark colors
      '@apply dark:border-neutral-700': {},
      '@apply dark:text-neutral-100 dark:bg-white/30': {},

      '&-sm': {
        '@apply px-3 text-xs': {},
      },

      '&-md': {
        '@apply px-4 text-sm': {},
      },

      '&-lg': {
        '@apply px-4 text-base': {},
      },

      '&-left': {
        '@apply rounded-r-none': {},
      },

      '&-right': {
        '@apply rounded-l-none': {},
      },
    },
    '.form-input-addin': {
      '@apply flex items-center w-auto whitespace-nowrap': {},
      '@apply text-body': {},

      '&-sm': {
        '@apply px-[1.44rem] text-xs': {},
      },

      '&-md': {
        '@apply px-[1.6rem] text-sm': {},
      },

      '&-lg': {
        '@apply px-[1.76rem] text-base': {},
      },

      '&-left': {
        '@apply pr-0 rounded-r-none': {},
      },

      '&-right': {
        '@apply pl-0 rounded-l-none': {},
      },
    },
  };
}

module.exports = Forms = (colors) => ({
  '.form-field': {
    '@apply rounded-[0.2rem] placeholder-gray-stroke': {},
    '@apply relative w-full min-w-0 inline-flex items-center appearance-none focus-visible:outline-none': {},
    '@apply transition-colors	duration-75 ease-out': {},

    '&-sm': {
      '@apply text-sm leading-sm': {},
      '@apply py-0 px-[1.44rem] min-h-[4rem] max-h-[4rem]': {},
    },

    '&-md': {
      '@apply text-base leading-base': {},
      '@apply py-0 px-[1.6rem] min-h-[4.4rem] max-h-[4.4rem]': {},
    },

    '&-lg': {
      '@apply text-base leading-lg': {},
      '@apply py-0 px-[1.76rem] min-h-[4.8rem] max-h-[4.8rem]': {},
    },

    '&-disabled, &&-disabled': {
      '@apply disabled:cursor-not-allowed cursor-not-allowed': {},
      '@apply disabled:bg-gray-lighter bg-gray-lighter': {},
    },

    "&[data-rounded='true']": {
      '@apply rounded-[3.2rem]': {},
    },

    // variants
    ...fieldOutline(colors),
    ...fieldSolid(colors),
  },

  '.form-button': {
    '@apply text-[1.1433em] border-0 ml-auto text-primary hover:text-white': {},

    '&[data-icon=true]': {
      '@apply p-[0.2em]': {},
    },

    '&-icon': {
      '@apply inline-flex': {},
    },

    '&-wrapper': {
      '@apply flex items-center absolute inset-y-0 right-sm': {},
    },
  },

  '.form-textarea': {
    //"@apply leading-tight": {},
    minHeight: '5rem',

    '&-counter': {
      '@apply mt-xs text-right': {},
    },
  },

  '.form-select': {
    '@apply justify-between items-center grow text-body bg-white caret-transparent select-none cursor-pointer border-gray-stroke':
      {},
    'background-image': 'none',
    '&-wrapper': {
      '@apply block w-full relative': {},
    },
    '&-icon': {
      '@apply grow-0': {},
    },
    '&-list': {
      '@apply z-10 absolute overflow-y-auto w-full bg-white mt-0 border border-gray-stroke border-t-0': {},
    },
    '&-has-multiple-choices': {
      '@apply flex w-full h-full justify-between items-center pr-md': {},
    },
    '&-multiple-chioces': {
      '@apply truncate pr-md': {},
    },
    '&-option': {
      '@apply text-body rounded-none cursor-default hover:text-white focus-visible:text-white hover:bg-primary focus-visible:bg-primary flex items-center':
        {},

      '&.multiple.selected': {
        '@apply bg-background-one': {},
      },
      '&.active': {
        '@apply bg-primary text-white': {},
      },
      '&.active.selected': {
        '@apply bg-primary text-white': {},
      },
      '&.disabled': {
        '@apply opacity-75 cursor-not-allowed hover:bg-white hover:text-black': {},
      },
    },
  },

  ...formInputGroup(),
  ...formControl(),
});
