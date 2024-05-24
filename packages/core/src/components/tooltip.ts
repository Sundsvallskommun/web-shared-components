export const Tooltip = () => ({
  '.sk-tooltip': {
    '@apply inline-flex justify-center items-center': {},
    '@apply w-fit h-fit': {},
    '@apply grow-0': {},

    '&-text': {
      '@apply inline-flex': {},
      '@apply bg-primary-surface shadow': {},
      '@apply px-16 py-8': {},
      '@apply rounded-utility': {},
      '@apply text-light-primary text-small': {},
      '@apply font-bold': {},
      '@apply w-fit h-fit': {},
      '@apply grow-0': {},
      '@apply min-h-34': {},
    },

    //Arrow
    '&::after, &::before': {
      '@apply h-0 w-0 overflow-hidden': {},
    },

    // Above
    '&[data-position="above"]': {
      '@apply flex-col': {},
      '@apply pb-2': {},
      '&::after': {
        '@apply content-[""] border-solid border-6 border-b-0': {},
        '@apply border-t-primary-surface border-r-transparent border-b-transparent border-l-transparent': {},
      },
    },

    // Below
    '&[data-position="below"]': {
      '@apply flex-col': {},
      '@apply pt-2': {},
      '&::before': {
        '@apply content-[""] border-solid border-6 border-t-0': {},
        '@apply border-t-transparent border-r-transparent border-b-primary-surface border-l-transparent': {},
      },
    },

    // Left
    '&[data-position="left"]': {
      '@apply flex-row': {},
      '@apply pr-2 py-3': {},
      '&::after': {
        '@apply content-[""] border-solid border-6 border-r-0': {},
        '@apply border-t-transparent border-r-transparent border-b-transparent border-l-primary-surface': {},
      },
    },

    // Right
    '&[data-position="right"]': {
      '@apply flex-row': {},
      '@apply pl-2 py-3': {},
      '&::before': {
        '@apply content-[""] border-solid border-6 border-l-0': {},
        '@apply border-t-transparent border-r-primary-surface border-b-transparent border-l-transparent': {},
      },
    },
  },
});
