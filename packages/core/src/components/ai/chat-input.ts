export const ChatInput = () => ({
  '.sk-chat-input': {
    '&-textarea': {
      '@apply flex': {},
      '@apply grow shrink': {},
      '@apply self-start': {},
      '&[data-wrap="true"]': {
        '@apply w-full': {},
      },
      '&[data-wrap="false"]': {
        '@apply w-auto': {},
      },
      '&-sm': {
        '@apply min-h-34+1': {},
        '@apply max-h-[11rem]': {},
        '@apply mt-5': {},
      },
      '&-md': {
        '@apply min-h-42': {},
        '@apply max-h-[13.4rem]': {},
        '@apply mt-4': {},
      },
      '&-lg': {
        '@apply min-h-56': {},
        '@apply max-h-[14.2rem]': {},
        '@apply mt-6': {},
      },
    },

    '&-wrapper': {
      '@apply flex flex-row flex-wrap': {},
      '@apply justify-end': {},
    },

    '&-submitbutton': {
      '@apply shrink-0 flex justify-self-end': {},
      '@apply relative': {},
      '&-sm': {
        '@apply py-5 px-7': {},
      },
      '&-md': {
        '@apply py-7 px-9': {},
      },
      '&-lg': {
        '@apply py-11 px-13': {},
      },
      '&-inner-wrapper': {
        '@apply relative inline-flex items-center': {},
      },
      '&-tooltip': {
        '@apply absolute right-full': {},
      },
    },

    '&-toolbar': {
      '@apply flex': {},
      '@apply relative': {},
      '@apply gap-6': {},
      '@apply bg-transparent': {},
      '@apply justify-start': {},
      '@apply w-auto': {},
      '@apply shrink grow': {},
      '&-sm': {
        '@apply py-5 px-7': {},
      },
      '&-md': {
        '@apply py-7 px-9': {},
      },
      '&-lg': {
        '@apply py-11 px-13': {},
      },
      '&-button': {
        '&-wrapper': {
          '@apply relative inline-flex justify-center overflow-visible': {},
        },
        '&-tooltip': {
          '@apply absolute shrink-0 bottom-full w-max': {},
        },
      },
    },
  },
});
