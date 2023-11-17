module.exports = Link = () => ({
  '.sk-link': {
    '@apply underline outline-none hover:underline': {},
    '@apply rounded-utility': {},

    // focus
    '@apply focus-visible:ring ring-offset-[.6rem]': {},

    // sizes
    '&-sm': {
      '@apply text-small leading-[2rem]': {},
    },
    '&-md': {
      '@apply text-base': {},
    },
    '&-lg': {
      '@apply text-large': {},
    },
    '&-xl': {
      '@apply text-lead leading-[3.2rem]': {},
    },

    // variants
    '&-primary': {
      '@apply text-vattjom-surface-primary': {},
      '&:hover': {
        '@apply text-vattjom-surface-primary-hover': {},
      },
    },
    '&-tertiary': {
      '@apply text-dark-secondary': {},
      '&:hover': {
        '@apply text-dark-primary': {},
      },
    },

    '&.active': {
      '@apply underline': {},
    },

    '& &-external-icon': {
      '@apply w-[1em] h-[1em] leading-none ml-[.25em] align-text-top': {},
    },

    '&[type="button"]': {
      '@apply inline-flex items-center align-bottom': {},
    },

    '&-disabled': {
      '@apply text-dark-disabled cursor-default': {},
    },
  },
});
