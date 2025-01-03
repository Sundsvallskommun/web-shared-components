function calendar() {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='4' rx='2' ry='2' /><line x1='16' x2='16' y1='2' y2='6' /><line x1='8' x2='8' y1='2' y2='6' /><line x1='3' x2='21' y1='10' y2='10' /></svg>`;
}
function clock() {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10' /><polyline points='12 6 12 12 16 14' /></svg>`;
}

function inputStandards() {
  return {
    '@apply border-1': {},
    '@apply border-input-field-outline': {},
    '@apply hover:border-input-field-outline-hover': {},

    '@apply placeholder:text-dark-placeholder': {},

    '@apply bg-input-field-surface': {},

    //Invalid
    '&:invalid, &[aria-invalid="true"]': {
      '@apply border-2 border-error-surface-primary': {},
    },

    //Disabled
    '&:disabled, &[aria-disabled="true"]': {
      '@apply bg-input-field-surface-disabled': {},
      '@apply border-input-field-outline-disabled': {},
      '@apply hover:border-input-field-outline-disabled': {},
      '@apply text-dark-disabled': {},
    },

    //readOnly
    '&[readonly], &[readonly="true"]': {
      '@apply border-primitives-overlay-darken-5': {},
      '@apply text-dark-secondary': {},
      '@apply placeholder:text-dark-secondary': {},
      '&:hover': {
        '@apply border-primitives-overlay-darken-8': {},
        '@apply placeholder:text-dark-placeholder': {},
      },
    },
  };
}

function addin() {
  return {
    '&-addin': {
      '@apply bg-transparent': {},
      '@apply flex': {},
      '@apply justify-start items-center': {},
      '&-sm': {
        '@apply px-6 gap-6': {},
        '&.sk-form-input-addin-left': {
          '@apply -mr-12': {},
          '@apply pl-10': {},
        },
        '&.sk-form-input-addin-right': {
          '@apply -ml-12': {},
          '@apply pr-10': {},
        },
        svg: {
          '@apply w-16 h-16': {},
        },
      },
      '&-md': {
        '@apply md:px-8 md:gap-8': {},
        '&.sk-form-input-addin-left': {
          '@apply -mr-16': {},
          '@apply pl-12': {},
        },
        '&.sk-form-input-addin-right': {
          '@apply -ml-16': {},
          '@apply pr-12': {},
        },
        svg: {
          '@apply w-20 h-20': {},
        },
      },
      '&-lg': {
        '@apply md:px-8 md:gap-8': {},
        '&.sk-form-input-addin-left': {
          '@apply -mr-20': {},
          '@apply pl-16': {},
        },
        '&.sk-form-input-addin-right': {
          '@apply -ml-20': {},
          '@apply pr-16': {},
        },
        svg: {
          '@apply w-22 h-22': {},
        },
      },
    },
  };
}

function inputGroup() {
  return {
    '&-group': {
      '@apply flex relative': {},
      '@apply items-center': {},
      '@apply focus-within:ring': {},
      '@apply focus-within:ring-ring': {},
      '@apply text-dark-secondary': {},
      //Focus
      '@apply focus-within:border-input-field-surface': {},

      '&:not(:invalid):not([aria-invalid="true"])': {
        '@apply focus-within:border-input-field-surface': {},
      },

      '&&-lg': {
        '@apply text-input-large': {},
        '@apply rounded-button-lg': {},
      },
      '&&-md': {
        '@apply text-input-medium': {},
        '@apply rounded-button-md': {},
      },
      '&&-sm': {
        '@apply text-input-small': {},
        '@apply rounded-button-sm': {},
      },
      ...inputStandards(),
      '.sk-form-input': {
        '@apply rounded-0': {},
        '@apply border-0': {},
        '@apply focus:ring-0': {},
        '@apply focus:ring-offset-0': {},
        '@apply bg-transparent': {},
        '@apply dark:bg-transparent': {},
        '@apply grow': {},
      },
    },
  };
}

function timeAndDatePicker() {
  return {
    '&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator': {
      '@apply block': {},
      '@apply p-0': {},
      '@apply pl-6 md:pl-8': {},
      '@apply m-0': {},
      '@apply bg-none': {},
      '@apply bg-dark-secondary': {},
      '&.sk-form-input-sm': {
        '@apply w-16 h-16': {},
        '@apply -mr-2': {},
      },
      '&.sk-form-input-md': {
        '@apply -mr-4': {},
        '@apply w-18 h-18': {},
      },
      '&.sk-form-input-lg': {
        '@apply -mr-6': {},
        '@apply w-20 h-20': {},
      },
    },

    '&[type="date"]::-webkit-inner-spin-button, &[type="date"]::-webkit-calendar-picker-indicator': {
      mask: [`url("data:image/svg+xml;utf-8,${calendar()}") no-repeat 100% 100%`],
      '-webkit-mask': [`url("data:image/svg+xml;utf-8,${calendar()}") no-repeat 100% 100%`],
      maskSize: 'contain',
      '-webkit-mask-size': 'contain',
    },
    '&[type="datetime-local"]::-webkit-inner-spin-button, &[type="datetime-local"]::-webkit-calendar-picker-indicator':
      {
        mask: [`url("data:image/svg+xml;utf-8,${calendar()}") no-repeat 100% 100%`],
        '-webkit-mask': [`url("data:image/svg+xml;utf-8,${calendar()}") no-repeat 100% 100%`],
        maskSize: 'contain',
        '-webkit-mask-size': 'contain',
      },
    '&[type="time"]::-webkit-inner-spin-button, &[type="time"]::-webkit-calendar-picker-indicator': {
      mask: [`url("data:image/svg+xml;utf-8,${clock()}") no-repeat 100% 100%`],
      '-webkit-mask': [`url("data:image/svg+xml;utf-8,${clock()}") no-repeat 100% 100%`],
      maskSize: 'contain',
      '-webkit-mask-size': 'contain',
    },

    '&:disabled, &[aria-disabled="true"]': {
      '&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator': {
        '@apply color-black-disabled': {},
      },
    },
  };
}

export const Input = () => ({
  '.sk-form-input': {
    '@apply grow-0': {},
    '@apply text-dark-primary': {},

    '&[data-hideextra="true"]': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        display: 'none',
        margin: '0px',
      },
      '-moz-appearance': 'textfield',
    },

    '&&-lg': {
      '@apply rounded-button-lg': {},
      '@apply px-20': {},
      '@apply py-11': {},
      '@apply gap-8': {},
      '@apply text-input-large': {},
      '@apply h-48': {},
    },
    '&&-md': {
      '@apply rounded-button-md': {},
      '@apply px-16': {},
      '@apply py-7': {},
      '@apply gap-8': {},
      '@apply text-input-medium': {},
      '@apply h-40': {},
    },
    '&&-sm': {
      '@apply rounded-button-sm': {},
      '@apply px-12': {},
      '@apply py-5': {},
      '@apply gap-6': {},
      '@apply text-input-small': {},
      '@apply h-32': {},
    },
    '&&-textarea': {
      '@apply h-auto': {},
      '&-warning': {
        '@apply sr-only': {},
      },
    },

    //Focus
    '@apply focus:ring': {},
    '@apply focus:ring-ring': {},
    '@apply focus:ring-offset': {},
    '@apply focus:border-input-field-surface': {},
    '@apply focus-within:ring': {},
    '@apply focus-within:ring-ring': {},
    '@apply focus-within:ring-offset': {},
    '@apply focus-within:border-input-field-surface': {},
    '&:not(:invalid):not([aria-invalid="true"])': {
      '@apply focus:hover:border-input-field-surface': {},
    },
    ...timeAndDatePicker(),
    ...inputStandards(),
    ...inputGroup(),
    ...addin(),
  },
});
