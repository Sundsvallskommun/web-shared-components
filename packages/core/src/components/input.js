function calendar() {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='4' rx='2' ry='2' /><line x1='16' x2='16' y1='2' y2='6' /><line x1='8' x2='8' y1='2' y2='6' /><line x1='3' x2='21' y1='10' y2='10' /></svg>`;
}
function clock() {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10' /><polyline points='12 6 12 12 16 14' /></svg>`;
}

function inputStandards() {
  return {
    '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
    '@apply border-1': {},
    '@apply border-primitives-overlay-darken-6': {},
    '@apply dark:border-primitives-overlay-lighten-6': {},
    '@apply hover:border-primitives-overlay-darken-8': {},
    '@apply dark:hover:border-primitives-overlay-lighten-4': {},

    '@apply placeholder:text-dark-placeholder': {},

    '@apply bg-primitives-overlay-lighten-10': {},
    '@apply dark:bg-primitives-overlay-darken-6': {},

    //Invalid
    '&:invalid, &[aria-invalid="true"]': {
      '@apply border-2 border-error-surface-primary': {},
    },

    //Disabled
    '&:disabled, &[aria-disabled="true"]': {
      '@apply bg-primitives-overlay-darken-1': {},
      '@apply dark:bg-primitives-overlay-lighten-1': {},
      '@apply border-primitives-overlay-darken-3': {},
      '@apply dark:border-primitives-overlay-lighten-3': {},
      '@apply hover:border-primitives-overlay-darken-3': {},
      '@apply dark:hover:border-primitives-overlay-lighten-3': {},
      '@apply text-dark-disabled': {},
    },
    '&-lg': {
      '@apply text-input-large': {},
    },
    '&-md': {
      '@apply text-input-medium': {},
    },
    '&-sm': {
      '@apply text-input-small': {},
    },
  };
}

function addin() {
  return {
    '&-addin': {
      '@apply bg-transparent': {},
      '@apply flex': {},
      '@apply justify-start items-center': {},
      '@apply px-6 gap-6': {},
      '@apply md:px-8 md:gap-8': {},

      '&-left': {
        '@apply -mr-12 md:-mr-16 xl:-mr-20': {},
        '@apply pl-10 md:pl-12 xl:pl-16': {},
      },
      '&-right': {
        '@apply -ml-12 md:-ml-16 xl:-ml-20': {},
        '@apply pr-10 md:pr-12 xl:pr-16': {},
      },
      '&-sm': {
        svg: {
          '@apply w-[1.6rem] h-[1.6rem]': {},
        },
      },
      '&-md': {
        svg: {
          '@apply w-[2rem] h-[2rem]': {},
        },
      },
      '&-lg': {
        svg: {
          '@apply w-[2.2rem] h-[2.2rem]': {},
        },
      },
    },
  };
}

function inputGroup() {
  return {
    '&-group': {
      '@apply flex relative': {},
      '@apply focus-within:ring': {},
      '@apply focus-within:ring-ring': {},
      '@apply text-dark-secondary': {},
      //Focus
      '@apply focus-within:border-primitives-overlay-lighten-10': {},
      '@apply dark:focus-within:border-primitives-overlay-darken-6': {},

      '&:not(:invalid):not([aria-invalid="true"])': {
        '@apply focus-within:hover:border-primitives-overlay-lighten-10': {},
        '@apply dark:focus-within:hover:border-primitives-overlay-darken-6': {},
      },

      '&:disabled, &[aria-disabled="true"]': {
        '&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator': {
          '@apply color-black-disabled': {},
        },
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
      '@apply -mr-2 md:-mr-4 xl:-mr-4': {},
      '@apply bg-none': {},
      '@apply bg-dark-secondary': {},
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
        '@apply -mr-6 md:-mr-8 xl:-mr-8': {},
      },
    '&[type="time"]::-webkit-inner-spin-button, &[type="time"]::-webkit-calendar-picker-indicator': {
      mask: [`url("data:image/svg+xml;utf-8,${clock()}") no-repeat 100% 100%`],
      '-webkit-mask': [`url("data:image/svg+xml;utf-8,${clock()}") no-repeat 100% 100%`],
      maskSize: 'contain',
      '-webkit-mask-size': 'contain',
    },

    '&-sm': {
      '&[type="date"]::-webkit-inner-spin-button, &[type="date"]::-webkit-calendar-picker-indicator': {
        '@apply w-[1.6rem] h-[1.6rem]': {},
        maskSize: '16px 16px',
        '-webkit-mask-size': '16px 16px',
      },
    },
    '&-md': {
      '&[type="date"]::-webkit-inner-spin-button, &[type="date"]::-webkit-calendar-picker-indicator': {
        '@apply w-[2.0rem] h-[2.0rem]': {},
      },
    },
    '&-lg': {
      '&[type="date"]::-webkit-inner-spin-button, &[type="date"]::-webkit-calendar-picker-indicator': {
        '@apply w-[2.2rem] h-[2.2rem]': {},
      },
    },
    '&:disabled, &[aria-disabled="true"]': {
      '&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator': {
        '@apply color-black-disabled': {},
      },
    },
  };
}

module.exports = Input = () => ({
  '.sk-form-input': {
    '@apply grow-0': {},
    '@apply px-12 md:px-16 xl:px-20': {},
    '@apply py-6 md:py-8 xl:py-12': {},
    '@apply gap-6 md:gap-8 xl:gap-8': {},
    '@apply text-dark-primary': {},

    '&[data-hideextra="true"]': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        display: 'none',
        margin: 0,
      },
      '-moz-appearance': 'textfield',
    },

    //Focus
    '@apply focus:ring': {},
    '@apply focus:ring-ring': {},
    '@apply focus:ring-offset': {},
    '@apply focus:border-primitives-overlay-lighten-10': {},
    '@apply dark:focus:border-primitives-overlay-darken-6': {},
    '&:not(:invalid):not([aria-invalid="true"])': {
      '@apply focus:hover:border-primitives-overlay-lighten-10': {},
      '@apply dark:focus:hover:border-primitives-overlay-darken-6': {},
    },
    ...timeAndDatePicker(),
    ...inputStandards(),
    ...inputGroup(),
    ...addin(),
  },
});
