module.exports = Tabs = () => ({
  '.sk-tabs': {
    '&-stretch': {
      '@apply w-full': {},
    },
    '&-list': {
      '@apply  mb-lg block relative w-full': {},
      '&-stretch': {
        '@apply flex justify-between': {},
      },
      '&-right': {
        '@apply text-right': {},
      },
      '&-center': {
        '@apply text-center': {},
      },

      '&-line::after': {
        content: '""',
        '@apply bg-gray-middle w-full h-[2px] absolute left-0 right-0 top-[100%]': {},
      },
    },
    '&-tab': {
      '@apply relative mr-lg text-base font-bold  p-0 relative h-[3.2rem] inline-block': {},
      '@apply text-gray': {},
      '@apply cursor-pointer': {},
      '&.disabled': {
        '@apply cursor-not-allowed': {},
        '@apply text-gray-stroke': {},
      },
      '&.active': {
        '@apply text-body': {},
        '&::after': {
          content: '""',
          '@apply bg-primary w-full h-[2px] absolute left-0 right-0 top-[100%] z-[1]': {},
        },
      },
      '&-stretch': {
        '@apply mr-0': {},
      },
      '&-right': {
        '@apply mr-0 ml-lg': {},
      },
      '&:last-of-type': {
        '@apply mr-0': {},
      },
      '&-icon': {
        '&-with-label': {
          '@apply mr-sm': {},
        },
      },
    },
    '&-panel': {
      '&:not(.active)': {
        display: 'none',
        hidden: true,
      },
    },
  },
});
