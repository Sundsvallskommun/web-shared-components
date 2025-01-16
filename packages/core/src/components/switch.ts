export const Switch = () => ({
  '.sk-form-switch-label': {
    '@apply inline-flex align-middle items-center': {},
    '@apply flex-row gap-12': {},
    '@apply font-normal text-base': {},

    "&[type='hidden']": {
      '@apply hidden': {},

      '.sk-form-switch': {
        '@apply hidden': {},
      },
    },
  },
  '.sk-form-switch': {
    '@apply rounded-full cursor-pointer focus:outline-none': {},
    '@apply bg-switch-surface': {},

    // Hover
    '@apply hover:bg-switch-surface-hover': {},

    // Focus
    'input[type=checkbox]:focus-visible + &': {
      '@apply ring ring-blue-500': {},
    },

    '&-input': {
      '@apply sr-only': {},
    },

    // Checked
    'input[type=checkbox]:checked + &': {
      [`&[data-color="gronsta"]`]: {
        '.sk-form-switch-box': {
          '@apply bg-gronsta-surface-primary': {},
        },
      },

      '.sk-form-switch-icon': {
        '@apply flex': {},
      },

      '.sk-form-switch-box': {
        transform: 'translateX(var(--sk-spacing-24))',
        '@apply bg-switch-control-on': {},
      },

      '@apply bg-switch-surface-on': {},

      // Disabled
      [`&[data-disabled="true"]`]: {
        '.sk-form-switch-box': {
          '@apply bg-switch-control-disabled': {},

          '.sk-form-switch-icon': {
            '@apply opacity-0': {},
            '@apply text-light-primary': {},
          },
        },
      },
    },

    // Disabled not checked
    [`&[data-disabled="true"]`]: {
      '@apply cursor-default': {},
      '@apply bg-switch-surface-disabled': {},

      '.sk-form-switch-box': {
        '@apply bg-switch-control-disabled': {},
      },
    },

    '@apply w-56': {},
  },

  // Knob
  '.sk-form-switch-box': {
    '@apply transition-transform ease-in-out duration-150 transform rounded-full shadow translate-x-0 m-6': {},
    '@apply bg-switch-control': {},
    '@apply h-20 w-20': {},
    '@apply flex justify-center items-center object-center': {},

    '.sk-form-switch-icon': {
      '@apply bg-transparent': {},
      '@apply hidden': {},
      '@apply w-20 h-20': {},
      '@apply text-light-primary': {},
    },
  },
});
