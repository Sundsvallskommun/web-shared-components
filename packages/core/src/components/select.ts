function chevronDown(color: string) {
  //TODO: This wont work with CSS variables. The colors are set here and wont work with themes
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6' /></svg>`;
}

function tertiary() {
  return {
    '&-tertiary': {
      '@apply border-2': {},

      '@apply bg-tertiary-surface': {},
      '@apply hover:bg-tertiary-surface-hover': {},
      '@apply border-transparent': {},

      '&.sk-form-select-sm': {
        //Padding - border width
        '@apply pl-12': {},
        //Background position - border width
        '@apply bg-right-8': {},

        //Padding + icon width - border width
        '@apply pr-32': {},
      },
      '&.sk-form-select-md': {
        //Padding - border width
        '@apply pl-16': {},
        //Background position - border width
        '@apply bg-right-12': {},
        //Padding + icon width - border width
        '@apply pr-42': {},
      },
      '&.sk-form-select-lg': {
        //Padding - border width
        '@apply pl-18': {},
        //Background position - border width
        '@apply bg-right-16': {},
        //Padding + icon width - border width
        '@apply pr-48': {},
      },
      //Disabled
      '&[aria-disabled="true"]': {
        '@apply bg-tertiary-surface-disabled': {},
      },
    },
  };
}

function primary() {
  return {
    '&-primary': {
      '@apply border-1': {},
      '@apply border-input-field-outline': {},
      '@apply hover:border-input-field-outline-hover': {},
      '@apply bg-input-field-surface': {},
      '@apply hover:bg-input-field-surface': {},

      '&.sk-form-select-sm': {
        //Padding - border width
        '@apply pl-13': {},
        //Background position - border width
        '@apply bg-[center_right_0.643em]': {},
        //Padding + icon width - border width
        '@apply pr-34-1': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-12': {},
          //Background position - border width
          '@apply bg-right-8': {},
          //Padding + icon width - border width
          '@apply pr-32': {},
        },
      },
      '&.sk-form-select-md': {
        //Padding - border width
        '@apply pl-17': {},
        //Background position - border width
        '@apply bg-[center_right_0.8125em]': {},
        //Padding + icon width - border width
        '@apply pr-44-1': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-16': {},
          //Background position - border width
          '@apply bg-right-12': {},
          //Padding + icon width - border width
          '@apply pr-42': {},
        },
      },
      '&.sk-form-select-lg': {
        //Padding - border width
        '@apply pl-19': {},
        //Background position - border width
        '@apply bg-[center_right_0.944em]': {},
        //Padding + icon width - border width
        '@apply pr-50-1': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-18': {},
          //Background position - border width
          '@apply bg-right-16': {},
          //Padding + icon width - border width
          '@apply pr-48': {},
        },
      },
      //Disabled
      '&[aria-disabled="true"],&:disabled': {
        '@apply bg-input-field-surface-disabled': {},
        '@apply hover:bg-input-field-surface-disabled': {},
        '@apply border-input-field-outline-disabled': {},
        '@apply hover:border-input-field-outline-disabled': {},
      },
    },
  };
}

export const Select = () => ({
  '.sk-form-select': {
    '@apply h-fit': {},
    '@apply w-fit': {},
    '@apply box-border': {},
    '@apply focus:border-transparent': {},
    '@apply rounded-button': {},
    '@apply text-dark-secondary': {},
    '@apply placeholder:text-dark-secondary': {},
    '@apply hover:placeholder:text-dark-primary': {},
    '@apply focus:placeholder:text-dark-primary': {},
    '@apply hover:text-dark-primary': {},
    '@apply focus:text-dark-primary': {},
    '@apply py-6': {},
    '@apply focus:ring focus:ring-ring focus:ring-offset': {},
    '@apply focus:outline-0': {},

    backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(68,68,80)')}")`],
    '&:hover, &:focus': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(28,28,40)')}")`],
    },

    //Invalid
    '&[aria-invalid="true"]': {
      '@apply border-2 border-error-surface-primary': {},
    },

    //Disabled
    '&[aria-disabled="true"]': {
      '@apply opacity-100': {},
      '@apply text-dark-disabled': {},
      '@apply placeholder:text-dark-disabled': {},
      '@apply bg-tertiary-surface-disabled': {},
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgba(28,28,40, 0.5)')}")`],
    },

    ...tertiary(),
    ...primary(),

    //Droprown
    '*': {
      '@apply bg-background-content': {},
    },
    //readOnly
    '&[readonly], &[readonly="true"]': {
      '@apply border-primitives-overlay-darken-5': {},
      '@apply text-dark-secondary': {},
      '@apply pointer-events-none': {},
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgba(28,28,40, 0.64)')}")`],
    },

    '&-sm': {
      '@apply h-32': {},
      '@apply text-label-small': {},
      '@apply rounded-button-sm': {},
      '*': {
        '@apply text-input-small': {},
      },
    },
    '&-md': {
      '@apply h-40': {},
      '@apply text-label-medium': {},
      '@apply rounded-button-md': {},
      '*': {
        '@apply text-input-medium': {},
      },
    },
    '&-lg': {
      '@apply h-48': {},
      '@apply text-label-large': {},
      '@apply rounded-button-lg': {},
      '*': {
        '@apply text-input-large': {},
      },
    },
  },
  '.dark .sk-form-select': {
    backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(229,229,229)')}")`],
    '&:hover, &:focus': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(255,255,255)')}")`],
    },
    '&[aria-disabled="true"]': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgba(255,255,255, 0.64)')}")`],
    },
  },
});
