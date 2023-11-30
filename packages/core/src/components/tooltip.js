module.exports = Tooltip = () => ({
  '.sk-tooltip': {
    '@apply bg-primary-surface shadow relative inline-block': {},
    '@apply px-[1.6rem] py-[0.8rem]': {},
    '@apply rounded-[0.8rem]': {},

    '&-text': {
      '@apply text-light-primary text-small': {},
      '@apply font-bold leading-[18px] not-italic': {},
    },

    // Arrow
    '&-text::after': {
      '@apply content-[""] border-solid border-8': {},
      '@apply absolute': {},
    },

    // Down
    '&[data-position="down"]': {
      '.sk-tooltip-text::after': {
        '@apply top-[100%] left-[50%] ml-[-7px]': {},
        '@apply border-t-primary-surface border-r-transparent border-b-transparent border-l-transparent': {},
      },
    },

    // Up
    '&[data-position="up"]': {
      '.sk-tooltip-text::after': {
        '@apply bottom-[100%] left-[50%] ml-[-7px]': {},
        '@apply border-t-transparent border-r-transparent border-b-primary-surface border-l-transparent': {},
      },
    },

    // Right
    '&[data-position="right"]': {
      '.sk-tooltip-text::after': {
        '@apply top-[50%] left-[100%]': {},
        '@apply ml-[0px] mt-[-7px]': {},
        '@apply border-t-transparent border-r-transparent border-b-transparent border-l-primary-surface': {},
      },
    },

    // Left
    '&[data-position="left"]': {
      '.sk-tooltip-text::after': {
        '@apply top-[50%] right-[100%]': {},
        '@apply ml-[0px] mt-[-7px]': {},
        '@apply border-t-transparent border-r-primary-surface border-b-transparent border-l-transparent': {},
      },
    },
  },
});
