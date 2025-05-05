export const TextEditor = () => ({
  '.sk-texteditor': {
    '.ql-toolbar.ql-snow': {
      '@apply flex items-center bg-background-200 rounded-t-xl border-input-field-outline h-[4rem]': {},
      '.ql-stroke': {
        '@apply stroke-dark-primary': {},
      },
      '.ql-divider': {
        '@apply w-[0.1rem] h-[3.2rem] bg-divider mr-[1.5rem]': {},
      },
      '.tooltip-container': {
        '@apply absolute z-10 top-full mt-0 left-1/2 -translate-x-1/2 invisible opacity-0 transition-opacity duration-200 ease-in-out whitespace-nowrap':
          {},
      },
      '.ql-formats': {
        '@apply flex gap-4': {},
      },

      svg: {
        '@apply h-[2.0rem] w-[2.0rem]': {},
      },

      button: {
        '@apply h-[3.2rem] w-[3.2rem] rounded-10 text-dark-primary': {},
        '&:hover, &:focus-visible': {
          '@apply bg-tertiary-surface-hover': {},
        },
        '&:focus-visible': {
          '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0': {},
        },

        '&.ql-active': {
          '@apply bg-tertiary-surface-hover': {},
          '.ql-fill': {
            '@apply fill-dark-primary': {},
          },
          '.ql-stroke': {
            '@apply stroke-dark-primary': {},
          },
        },
        '&:hover .ql-fill, &:focus-visible .ql-fill': {
          '@apply fill-dark-primary': {},
        },
        '&:hover .ql-stroke, &:focus-visible .ql-stroke': {
          '@apply stroke-dark-primary': {},
        },
        '&:hover .tooltip-container, &:focus-visible .tooltip-container': {
          '@apply visible opacity-100': {},
        },
      },

      '&.ql-disabled': {
        '@apply border-input-field-outline-disabled': {},
        '.ql-fill': {
          '@apply fill-dark-disabled': {},
        },
        '.ql-stroke': {
          '@apply stroke-dark-disabled': {},
        },
        button: {
          '@apply bg-background-200 text-dark-disabled cursor-default': {},
          '&.ql-active': {
            '@apply bg-background-200 text-dark-disabled': {},
          },
          '&:hover': {
            '@apply bg-background-200 text-dark-disabled': {},
          },
          '&:hover .ql-fill': {
            '@apply fill-dark-disabled': {},
          },
          '&:hover .ql-stroke': {
            '@apply stroke-dark-disabled': {},
          },
          '&:hover .tooltip-container': {
            '@apply hidden opacity-0': {},
          },
        },
      },
    },

    '.ql-container.ql-snow': {
      '@apply border-input-field-outline rounded-b-xl': {},
      ':focus-visible': {
        '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0 rounded-b-xl': {},
      },
      '&.disable-toolbar': {
        '@apply rounded-t-xl': {},
        ':focus-visible': {
          '@apply rounded-t-xl': {},
        },
      },
      '&.ql-disabled': {
        '@apply bg-input-field-surface-disabled border-input-field-outline-disabled': {},
      },
    },

    // Tooltip-text
    '.ql-tooltip.ql-editing': {
      input: {
        '@apply rounded-0': {},
        '&:focus-visible': {
          '@apply rounded-0': {},
        },
      },
    },
    '.ql-snow .ql-tooltip.ql-editing a.ql-action::after': {
      content: '"Spara"',
    },
    '.ql-snow .ql-tooltip[data-mode=link]::before': {
      content: '"Ange länk:"',
    },
    '.ql-snow .ql-tooltip::before': {
      content: '"Besök URL:"',
    },
    '.ql-snow .ql-tooltip a.ql-action::after': {
      content: '"Ändra"',
    },
    '.ql-snow .ql-tooltip a.ql-remove::before': {
      content: '"Ta bort"',
    },
  },
});
