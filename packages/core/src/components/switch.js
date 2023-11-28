module.exports = Switch = () => ({
  '.sk-form-switch-label': {
    '@apply inline-block align-middle': {},

    "&[type='hidden']": {
      '@apply hidden': {},

      '.sk-form-switch': {
        '@apply hidden': {},
      },
    },
  },
  '.sk-form-switch': {
    '@apply rounded-full p-0.5 cursor-pointer focus:outline-none': {},
    '@apply bg-primitives-overlay-darken-3 dark:bg-primitives-overlay-lighten-3': {},

    border: '0.1rem solid transparent',

    // Hover
    '@apply hover:bg-primitives-overlay-darken-5 hover:dark:bg-primitives-overlay-lighten-4 !important': {},

    // Focus
    'input[type=checkbox]:focus-visible + &': {
      '@apply ring ring-blue-500': {},
    },

    // Checked
    'input[type=checkbox]:checked + &, input[type=checkbox][aria-checked=mixed] + &': {
      [`&[data-color="gronsta"]`]: {
        '.sk-switch-icon': {
          '@apply bg-gronsta-surface-primary': {},
        },
      },

      '.sk-switch-icon': {
        '@apply flex': {},
      },

      '.sk-form-switch-box': {
        transform: 'translateX(1.78rem)',
      },

      '@apply bg-primitives-overlay-darken-4 dark:bg-primitives-overlay-lighten-5': {},

      // Disabled
      [`&[data-disabled="true"]`]: {
        '.sk-form-switch-box': {
          '@apply bg-transparent': {},

          '.sk-switch-icon': {
            '@apply bg-primitives-overlay-darken-6 dark:bg-primitives-overlay-lighten-6 !important': {},
          },
        },
      },
    },

    // Disabled not checked
    [`&[data-disabled="true"]`]: {
      '@apply cursor-not-allowed': {},
      '@apply bg-primitives-overlay-darken-2 dark:bg-primitives-overlay-lighten-2 !important': {},

      '.sk-form-switch-box': {
        '@apply bg-primitives-overlay-darken-6 dark:bg-primitives-overlay-lighten-6': {},
      },
    },

    width: '5.6rem',
  },

  // Knob
  '.sk-form-switch-box': {
    '@apply transition-transform ease-in-out duration-150 transform rounded-full shadow translate-x-0 m-6': {},
    '@apply bg-primitives-overlay-darken-7 dark:bg-primitives-overlay-lighten-7': {},
    
    '.sk-switch-icon': {
      '@apply hidden': {},
    },

    height: '2rem',
    width: '2rem',
  },
});
