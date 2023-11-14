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
    '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
    '@apply bg-tertiary-surface': {},
    '@apply hover:bg-tertiary-surface-hover': {},
    '@apply text-dark-secondary': {},
    '@apply hover:text-dark-primary': {},
    '@apply focus:text-dark-primary': {},

    //Padding - border width
    '@apply pl-12 md:pl-16 xl:pl-18': {},
    '@apply py-6': {},
    '@apply focus:ring focus:ring-ring focus:ring-offset': {},
    '@apply focus:outline-0': {},

    backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(68,68,80)')}")`],
    '&:hover, &:focus': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgb(28,28,40)')}")`],
    },
    //Background position - border width
    '@apply bg-right-8 md:bg-right-12 xl:bg-right-16': {},

    //Droprown
    '*': {
      '@apply bg-background-content': {},
    },

    //Invalid
    '&:invalid, &[aria-invalid="true"]': {
      '@apply border-2 border-error-surface-primary': {},
    },

    //Disabled
    '&:disabled, &[aria-disabled="true"]': {
      '@apply text-dark-disabled': {},
      '@apply bg-tertiary-surface-disabled': {},
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgba(28,28,40, 0.5)')}")`],
    },

    '&-sm': {
      '@apply text-label-small leading-[2rem]': {},
      //Padding + icon width - border width
      '@apply pr-[3.2rem] md:pr-[3.6rem] xl:pr-[4rem]': {},
      '*': {
        '@apply text-input-small': {},
      },
    },
    '&-md': {
      '@apply text-label-medium': {},
      //Padding + icon width - border width
      '@apply pr-[3.8rem] md:pr-[4.2rem] xl:pr-[4.6rem]': {},
      '*': {
        '@apply text-input-medium': {},
      },
    },
    '&-lg': {
      '@apply text-label-large': {},
      //Padding + icon width - border width
      '@apply pr-[4rem] md:pr-[4.4rem] xl:pr-[4.8rem]': {},
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
    '&:disabled, &[aria-disabled="true"]': {
      backgroundImage: [`url("data:image/svg+xml;utf-8,${chevronDown('rgba(255,255,255, 0.64)')}")`],
    },
  },
});
