module.exports = Avatar = (colors) => ({
  '.sk-avatar': {
    '@apply inline-flex': {},
    '@apply justify-center items-center': {},
    '@apply rounded-button': {},
    '@apply font-bold': {},
    '@apply overflow-hidden': {},
    '&[data-rounded="true"]': {
      '@apply rounded-circular': {},
    },
    '&&-sm': {
      '@apply h-[3.2rem] w-[3.2rem] min-h-[2.4rem] max-h-[3.2rem] min-w-[2.4rem] max-w-[3.2rem]': {},
      '@apply text-label-sm leading-label-sm': {},
    },
    '&&-md': {
      '@apply h-[4rem] w-[4rem] min-h-[3.2rem] max-h-[4rem] min-w-[3.2rem] max-w-[4rem]': {},
      '@apply text-label-md leading-label-md': {},
    },
    '&&-lg': {
      '@apply h-[6.4rem] w-[6.4rem] min-h-[4rem] max-h-[6.4rem] min-w-[4rem] max-w-[6.4rem]': {},
      '@apply text-label-lg leading-label-lg': {},
    },
    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply bg-${color}-surface-primary  text-${color}-text-secondary`]: {},

          '&[data-accent="true"]': {
            [`@apply bg-${color}-surface-accent  text-${color}-text-primary`]: {},
          },
        },
      }),
      {}
    ),
    '&-img': {
      '@apply min-w-full min-h-full object-cover': {},
    },
  },
});
