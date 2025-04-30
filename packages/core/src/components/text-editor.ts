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
      '&.ql-disabled': {
        '@apply border-input-field-outline-disabled': {},
        '.ql-fill': {
          '@apply fill-dark-disabled': {},
        },
        '.ql-stroke': {
          '@apply stroke-dark-disabled': {},
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
