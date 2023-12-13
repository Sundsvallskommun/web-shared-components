module.exports = Tooltip = () => ({
  '.sk-tooltip': {
    '@apply bg-primary-surface shadow absolute': {},
    '@apply px-[1.6rem] py-[0.8rem]': {},
    '@apply rounded-utility': {},

    '&-text': {
      '@apply text-light-primary text-small': {},
      '@apply font-bold leading-[18px] not-italic': {},
    },

    // Arrow
    '&-text::after': {
      '@apply content-[""] border-solid border-8': {},
      '@apply absolute': {},
    },

    // Above
    '&[data-position="above"]': {
      '@apply mb-8': {},
      '.sk-tooltip-text::after': {
        '@apply top-[100%] left-[50%] ml-[-7px]': {},
        '@apply border-t-primary-surface border-r-transparent border-b-transparent border-l-transparent': {},
      },
    },

    // Below
    '&[data-position="below"]': {
      '@apply mt-8': {},
      '.sk-tooltip-text::after': {
        '@apply bottom-[100%] left-[50%] ml-[-7px]': {},
        '@apply border-t-transparent border-r-transparent border-b-primary-surface border-l-transparent': {},
      },
    },

    // Left
    '&[data-position="left"]': {
      '@apply mr-8': {},
      '.sk-tooltip-text::after': {
        '@apply top-[50%] left-[100%]': {},
        '@apply ml-[0px] mt-[-7px]': {},
        '@apply border-t-transparent border-r-transparent border-b-transparent border-l-primary-surface': {},
      },
    },

    // Right
    '&[data-position="right"]': {
      '@apply ml-8': {},
      '.sk-tooltip-text::after': {
        '@apply top-[50%] right-[100%]': {},
        '@apply ml-[0px] mt-[-7px]': {},
        '@apply border-t-transparent border-r-primary-surface border-b-transparent border-l-transparent': {},
      },
    },
  },
});
