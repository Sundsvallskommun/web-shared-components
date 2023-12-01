function chevronDown(color) {
  //TODO: This wont work with CSS variables. The colors are set here and wont work with themes
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6' /></svg>`;
}

module.exports = Select = () => ({
  '.sk-form-select': {
    '@apply h-fit': {},
    '@apply w-fit': {},
    '@apply box-border': {},
    '@apply border-2': {},
    '@apply border-transparent': {},
    '@apply focus:border-transparent': {},
    '@apply rounded-button': {},
    '@apply bg-tertiary-surface': {},
    '@apply hover:bg-tertiary-surface-hover': {},
    '@apply text-dark-secondary': {},
    '@apply placeholder:text-dark-secondary': {},
    '@apply hover:text-dark-primary': {},
    '@apply focus:text-dark-primary': {},

    '@apply py-6': {},
    '@apply focus:ring focus:ring-ring focus:ring-offset': {},
    '@apply focus:outline-0': {},

    backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(68,68,80)')}")`],
    '&:hover, &:focus': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(28,28,40)')}")`],
    },

    //Droprown
    '*': {
      '@apply bg-background-content': {},
    },

    //Invalid
    '&:invalid, &[aria-invalid="true"]': {
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
      //Padding - border width
      '@apply pl-12': {},
      //Background position - border width
      '@apply bg-right-8': {},

      '@apply h-[3.2rem]': {},
      '@apply text-label-small': {},
      '@apply rounded-button-sm': {},
      //Padding + icon width - border width
      '@apply pr-[3.2rem]': {},
      '*': {
        '@apply text-input-small': {},
      },
    },
    '&-md': {
      //Padding - border width
      '@apply pl-16': {},
      //Background position - border width
      '@apply bg-right-12': {},

      '@apply h-[4rem]': {},
      '@apply text-label-medium': {},
      '@apply rounded-button-md': {},
      //Padding + icon width - border width
      '@apply pr-[4.2rem]': {},
      '*': {
        '@apply text-input-medium': {},
      },
    },
    '&-lg': {
      //Padding - border width
      '@apply pl-18': {},
      //Background position - border width
      '@apply bg-right-16': {},

      '@apply h-[4.8rem]': {},
      '@apply text-label-large': {},
      '@apply rounded-button-lg': {},
      //Padding + icon width - border width
      '@apply pr-[4.8rem]': {},
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
