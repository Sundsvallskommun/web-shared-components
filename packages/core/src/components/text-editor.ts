export const TextEditor = () => ({
  '.sk-texteditor': {
    '.ql-toolbar.ql-snow': {
      '@apply flex items-center bg-background-200 rounded-t-xl border-input-field-outline': {},
      '.ql-fill': {
        '@apply fill-dark-primary': {},
      },
      '.ql-stroke': {
        '@apply stroke-dark-primary': {},
      },
      '.ql-divider': {
        '@apply w-[0.1rem] h-[3.2rem] bg-divider mr-[1.5rem]': {},
      },
      '.tooltip-container': {
        '@apply absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 invisible opacity-0 transition-opacity duration-200 ease-in-out whitespace-nowrap':
          {},
      },
      'button:hover .tooltip-container, select:hover .tooltip-container': {
        '@apply visible opacity-100': {},
      },
      '&.ql-disabled': {
        '@apply border-input-field-outline-disabled': {},
        '.ql-fill': {
          '@apply fill-dark-disabled': {},
        },
        '.ql-stroke': {
          '@apply stroke-dark-disabled': {},
        },
        'button': {
          '@apply cursor-default': {},
        },
        'button:hover .tooltip-container, select:hover .tooltip-container': {
          '@apply hidden opacity-0': {},
        },
      },
    },
    '.ql-container.ql-snow': {
      '@apply border-input-field-outline rounded-b-xl': {},
      '&.ql-disabled': {
        '@apply bg-input-field-surface-disabled border-input-field-outline-disabled': {},
      },
    },
  },
});
