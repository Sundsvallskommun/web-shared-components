export const Logo = () => ({
  '.sk-logo': {
    '@apply flex w-auto h-auto': {},
    '@apply items-center': {},
    '@apply text-dark-primary': {},
    '&[data-inverted="true"]': {
      '@apply text-light-primary': {},
      '.sk-logo-divider': {
        '@apply border-inverted-divider': {},
      },
    },

    '&-figure': {
      '@apply w-full h-full': {},
    },
    '&[data-variant="service"]': {
      '@apply flex-row gap-6': {},
      '@apply w-max': {},
      '@apply h-60': {},
      '@apply pb-4': {},
      '.sk-logo-figure': {
        '@apply w-34 h-56': {},
      },
    },
    'a:focus-within &': {
      '@apply outline outline-2 outline-ring': {},
    },
    'a &': {
      '@apply no-underline': {},
    },
    'a:hover &': {
      '@apply underline': {},
    },
    '&-service-content': {
      '@apply h-full w-max': {},
      '@apply flex flex-col justify-center': {},
      '@apply pl-2 pt-2 pr-8 pb-0': {},
    },
    '&-title': {
      '@apply font-header text-logo-header': {},
    },
    '&-subtitle': {
      '@apply text-small font-normal block': {},
    },
    '&-divider': {
      '@apply pt-8 pb-4': {},
    },
  },
});
