function chevronDown(color) {
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
        '@apply pr-[3.2rem]': {},
      },
      '&.sk-form-select-md': {
        //Padding - border width
        '@apply pl-16': {},
        //Background position - border width
        '@apply bg-right-12': {},
        //Padding + icon width - border width
        '@apply pr-[4.2rem]': {},
      },
      '&.sk-form-select-lg': {
        //Padding - border width
        '@apply pl-18': {},
        //Background position - border width
        '@apply bg-right-16': {},
        //Padding + icon width - border width
        '@apply pr-[4.8rem]': {},
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
      '@apply border-primitives-overlay-darken-6': {},
      '@apply dark:border-primitives-overlay-lighten-6': {},
      '@apply hover:border-primitives-overlay-darken-8': {},
      '@apply dark:hover:border-primitives-overlay-lighten-4': {},
      '@apply bg-primitives-overlay-lighten-10': {},
      '@apply dark:bg-primitives-overlay-darken-6': {},
      '@apply hover:bg-primitives-overlay-lighten-10': {},
      '@apply dark:hover:bg-primitives-overlay-darken-6': {},

      '&.sk-form-select-sm': {
        //Padding - border width
        '@apply pl-[1.3rem]': {},
        //Background position - border width
        '@apply bg-[center_right_0.9rem]': {},
        //Padding + icon width - border width
        '@apply pr-[3.3rem]': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-12': {},
          //Background position - border width
          '@apply bg-right-8': {},
          //Padding + icon width - border width
          '@apply pr-[3.2rem]': {},
        },
      },
      '&.sk-form-select-md': {
        //Padding - border width
        '@apply pl-[1.7rem]': {},
        //Background position - border width
        '@apply bg-[center_right_1.3rem]': {},
        //Padding + icon width - border width
        '@apply pr-[4.3rem]': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-16': {},
          //Background position - border width
          '@apply bg-right-12': {},
          //Padding + icon width - border width
          '@apply pr-[4.2rem]': {},
        },
      },
      '&.sk-form-select-lg': {
        //Padding - border width
        '@apply pl-[1.9rem]': {},
        //Background position - border width
        '@apply bg-[center_right_1.7rem]': {},
        //Padding + icon width - border width
        '@apply pr-[4.9rem]': {},

        '&[aria-invalid="true"]': {
          //Padding - border width
          '@apply pl-18': {},
          //Background position - border width
          '@apply bg-right-16': {},
          //Padding + icon width - border width
          '@apply pr-[4.8rem]': {},
        },
      },
      //Disabled
      '&[aria-disabled="true"]': {
        '@apply bg-primitives-overlay-darken-1': {},
        '@apply dark:bg-primitives-overlay-lighten-1': {},
        '@apply border-primitives-overlay-darken-3': {},
        '@apply dark:border-primitives-overlay-lighten-3': {},
        '@apply hover:border-primitives-overlay-darken-3': {},
        '@apply dark:hover:border-primitives-overlay-lighten-3': {},
      },
    },
  };
}

module.exports = Select = () => ({
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

    ...tertiary(),
    ...primary(),

    //Droprown
    '*': {
      '@apply bg-background-content': {},
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

    '&-sm': {
      '@apply h-[3.2rem]': {},
      '@apply text-label-small': {},
      '@apply rounded-button-sm': {},
      '*': {
        '@apply text-input-small': {},
      },
    },
    '&-md': {
      '@apply h-[4rem]': {},
      '@apply text-label-medium': {},
      '@apply rounded-button-md': {},
      '*': {
        '@apply text-input-medium': {},
      },
    },
    '&-lg': {
      '@apply h-[4.8rem]': {},
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
