export const SegmentedControl = () => ({
  '.sk-segmentedcontrol': {
    '@apply flex flex-row items-center': {},
    '@apply rounded-groups': {},
    '@apply bg-tertiary-surface': {},
    '@apply max-w-fit': {},

    // sizes
    '&[data-size="md"]': {
      '@apply p-6 gap-8': {},
    },
    '&[data-size="lg"]': {
      '@apply p-6 gap-16': {},
    },

    '&-item': {
      '@apply inline-block relative': {},

      // sizes
      '&[data-size="md"]': {
        '@apply h-34': {},
        '> *': {
          '@apply text-small leading-[1.8rem]': {},
        },
      },
      '&[data-size="lg"]': {
        '@apply h-40': {},
      },

      '> *:first-child': {
        '@apply rounded-button-sm md:rounded-button-md xl:rounded-button-lg': {},
        '@apply bg-transparent text-dark-primary font-bold cursor-pointer': {},
        '@apply gap-2 px-14 py-8 h-full min-h-full': {},
        '@apply inline-flex shrink-0 flex-nowrap border-0': {},
        '@apply hover:bg-tertiary-surface': {},
        '@apply focus-visible:outline-none focus-visible:bg-background-content focus-visible:ring focus-visible:ring-offset-0 focus-visible:shadow-none': {},

        '&[aria-pressed="true"]:not(:hover):not([aria-disabled="true"])': {
          '@apply bg-background-content text-dark-primary focus-visible:ring': {},
        },
        '&[aria-disabled="true"]': {
          '@apply text-dark-disabled cursor-default hover:bg-transparent': {},
        },
        '&.sk-btn[aria-disabled="true"], &.sk-btn-disabled': {
          '@apply bg-transparent border-transparent !important': {},
        },
      },
    },
  },
});
