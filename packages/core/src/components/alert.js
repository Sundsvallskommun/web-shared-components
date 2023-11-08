function alertSubtle(colors) {
  return {
    '.alert-subtle': {
      '@apply border rounded-base': {},
      '@apply text-body': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-background-100 border-${color}-surface-primary`]: {},

            '@apply dark:bg-opacity-15': {},
            '@apply dark:border-opacity-40': {},
          },
        }),
        {}
      ),
    },
  };
}

function alertSolid(colors) {
  return {
    '.alert-solid': {
      '@apply border rounded-base': {},
      '@apply text-white': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-${color}-surface-primary border-${color}-surface-primary border-opacity-20`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function alertLeftAccent(colors) {
  return {
    '.alert-left-accent': {
      '@apply border-l-2 rounded-none': {},
      '@apply text-body': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply bg-transparent border-${color}-surface-primary`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function alertCloseButton(colors) {
  return {
    '.alert-close-button': {
      '@apply absolute right-4 cursor-base focus-visible:outline-none': {},
      '@apply text-neutral-600 hover:text-neutral-700': {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {},
        }),
        {}
      ),
    },
  };
}

module.exports = Alert = (colors) => ({
  '.alert': {
    '@apply w-full flex items-center px-4 py-3 relative overflow-hidden text-small': {},
  },

  // variants
  ...alertSubtle(colors),
  ...alertSolid(colors),
  ...alertLeftAccent(colors),

  // close button
  ...alertCloseButton(colors),
});
