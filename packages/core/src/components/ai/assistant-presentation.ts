export const AssistantPresentation = () => ({
  '.sk-ai-assistant-presentation': {
    '@apply flex flex-col gap-16 items-center justify-center': {},

    '&[data-size="lg"]': {
      '.sk-avatar': {
        '@apply w-[8.9rem] h-[8.9rem]': {},
        '@apply max-w-[8.9rem] max-h-[8.9rem]': {},
      },
    },
    '&[data-size="md"]': {
      '.sk-avatar': {
        '@apply w-72 h-72': {},
        '@apply max-w-72 max-h-72': {},
      },
    },
  },
});
