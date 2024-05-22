export const Chip = () => ({
  '.sk-chip': {
    '@apply inline-flex': {},
    '@apply items-center justify-center': {},
    '@apply bg-secondary-surface': {},
    '@apply hover:bg-secondary-surface-hover': {},
    '@apply focus-visible:bg-secondary-surface-hover': {},
    '@apply focus-visible:ring': {},
    '@apply px-9 gap-4': {},
    '@apply h-34': {},
    '@apply text-small': {},
    '@apply text-dark-secondary': {},
    '@apply border-1': {},
    '@apply border-secondary-outline': {},
    '@apply hover:border-secondary-outline-hover': {},
    '@apply focus-visible:border-transparent': {},
    '@apply rounded-button': {},
    '&[data-strong="true"]': {
      '@apply border-2': {},
      '@apply px-8': {},
    },
    '&[data-rounded="true"]': {
      '@apply rounded-full': {},
    },
    '&[data-inverted="true"]': {
      '@apply text-inverted-dark-secondary': {},
      '@apply border-inverted-secondary-outline': {},
      '@apply hover:border-inverted-secondary-outline-hover': {},
      '@apply bg-inverted-secondary-surface': {},
      '@apply hover:bg-inverted-secondary-surface-hover': {},
      '@apply focus-visible:bg-inverted-secondary-surface-hover': {},
    },
    '.sk-icon': {
      '@apply h-16 w-16': {},
    },
  },
});
