export const AssistantSwitch = () => ({
  '.sk-ai-assistant-switch': {
    '@apply flex gap-12': {},
    '@apply rounded-button': {},
    '@apply focus-visible:ring ring-ring': {},
    '@apply justify-start items-center': {},
    '@apply pr-8': {},
    '&-icon': {
      '@apply leading-0': {},
      '& > *, .sk-avatar, .sk-icon, svg': {
        '@apply h-32 w-32': {},
      },
      '&-switch': {
        '.sk-avatar-img': {
          '@apply min-w-18 max-w-18 w-18 min-h-18 max-h-18 h-18': {},
        },
      },
    },

    '&-text': {
      '@apply text-label-medium': {},
      '@apply text-dark-primary': {},
    },
    '&-hover-icon': {
      '@apply text-dark-secondary': {},
      '@apply opacity-0': {},
      '@apply leading-0': {},

      '.sk-icon, svg': {
        '@apply h-16 w-16': {},
      },
    },
    '&:hover > &-hover-icon, &:focus-visible > &-hover-icon': {
      '@apply opacity-100': {},
    },

    '&[data-inverted="true"]': {
      '.sk-ai-assistant-switch': {
        '&-text': {
          '@apply text-inverted-dark-primary': {},
        },
        '&-hover-icon': {
          '@apply text-inverted-dark-secondary': {},
        },
      },
    },
  },
});
