export const Link = () => ({
  '.sk-link': {
    '@apply underline outline-none hover:underline': {},
    '@apply rounded-utility': {},

    // focus
    '@apply focus-visible:ring ring-offset-6': {},

    // sizes
    '&-sm': {
      '@apply text-small': {},
    },
    '&-md': {
      '@apply text-base': {},
    },
    '&-lg': {
      '@apply text-large': {},
    },
    '&-xl': {
      '@apply text-lead': {},
    },

    // variants
    '&-primary': {
      '@apply text-vattjom-surface-primary hover:text-vattjom-surface-primary-hover': {},
  
      '&[data-inverted="true"]':{
        '@apply text-inverted-vattjom-surface-primary  hover:text-inverted-vattjom-surface-primary-hover': {},
      },
    },
    '&-tertiary': {
      '@apply text-dark-secondary hover:text-dark-primary': {},
      '&[data-inverted="true"]':{
        '@apply text-inverted-dark-secondary hover:text-inverted-dark-primary': {},
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
      '&[data-inverted="true"]':{
        '@apply text-inverted-dark-disabled': {},
      },
    },
  },
});
