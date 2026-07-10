export const TextEditor = () => ({
  '.sk-texteditor': {
    '@apply relative': {},

    '.sk-texteditor-toolbar': {
      '@apply relative flex flex-wrap items-center bg-background-200 rounded-t-xl border-1 border-input-field-outline min-h-[4rem] pl-4 pr-8':
        {},
    },
    '.sk-texteditor-toolbar-group': {
      '@apply flex items-center gap-4': {},
    },
    '.sk-texteditor-toolbar-divider': {
      '@apply block w-[0.1rem] h-[3.2rem] bg-divider mx-[1.2rem]': {},
    },
    '.sk-texteditor-toolbar-button': {
      '@apply relative h-[3.2rem] w-[3.2rem] rounded-10 text-dark-primary flex items-center justify-center': {},
      svg: {
        '@apply h-[2rem] w-[2rem]': {},
      },
      '&:hover, &:hover:focus-visible, &-active': {
        '@apply bg-tertiary-surface-hover': {},
      },
      '&:focus-visible': {
        '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0 bg-background-content': {},
      },
      '.tooltip-container': {
        '@apply absolute z-20 top-full mt-0 left-1/2 -translate-x-1/2 invisible opacity-0 transition-opacity duration-200 ease-in-out whitespace-nowrap':
          {},
      },
      '&:hover .tooltip-container, &:focus-visible .tooltip-container': {
        '@apply visible opacity-100': {},
      },
    },
    '.sk-texteditor-toolbar-select': {
      '@apply h-[3.2rem] min-w-[8rem] rounded-8 border-1 border-input-field-outline bg-background-content px-8 text-small text-dark-primary':
        {},
      '&:focus-visible': {
        '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0': {},
      },
    },
    '.sk-texteditor-toolbar-disabled': {
      '@apply border-input-field-outline-disabled': {},
      '.sk-texteditor-toolbar-button, .sk-texteditor-toolbar-select': {
        '@apply bg-background-200 text-dark-disabled cursor-default border-input-field-outline-disabled': {},
        '&:hover': {
          '@apply bg-background-200 text-dark-disabled': {},
        },
        '&:hover .tooltip-container': {
          '@apply hidden opacity-0': {},
        },
      },
    },

    '.sk-texteditor-link-editor': {
      '@apply absolute z-30 top-full left-4 mt-4 flex flex-wrap items-end gap-8 bg-background-content border-1 border-input-field-outline rounded-8 p-12':
        {},
      label: {
        '@apply w-full text-label-small font-bold text-dark-primary': {},
      },
      input: {
        '@apply min-w-[24rem] h-[3.6rem] border-1 border-input-field-outline rounded-8 bg-background-content px-8 text-base':
          {},
        '&:focus-visible': {
          '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0': {},
        },
      },
      '.sk-texteditor-link-error': {
        '@apply w-full text-small text-error': {},
      },
      '.sk-texteditor-link-actions': {
        '@apply flex gap-8': {},
        button: {
          '@apply min-h-[3.6rem] rounded-button px-12 font-bold text-dark-primary bg-tertiary-surface': {},
          '&:hover': {
            '@apply bg-tertiary-surface-hover': {},
          },
          '&:focus-visible': {
            '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0': {},
          },
        },
      },
    },

    '.sk-texteditor-container': {
      '@apply border-1 border-t-0 border-input-field-outline rounded-b-xl bg-background-content': {},
      '&-without-toolbar': {
        '@apply border-t-1 rounded-t-xl': {},
      },
      '&-disabled': {
        '@apply bg-input-field-surface-disabled border-input-field-outline-disabled': {},
      },
    },
    '.sk-texteditor-input': {
      '@apply min-h-[12rem] px-16 py-12 text-dark-primary outline-0 overflow-auto': {},
      '&:focus-visible': {
        '@apply ring-[.2rem] ring-ring ring-offset-0 rounded-b-xl': {},
      },
      p: {
        '@apply my-0': {},
      },
    },
    '.sk-texteditor-container-without-toolbar .sk-texteditor-input:focus-visible': {
      '@apply rounded-t-xl': {},
    },
    '.sk-texteditor-bold': {
      '@apply font-bold': {},
    },
    '.sk-texteditor-italic': {
      '@apply italic': {},
    },
    '.sk-texteditor-underline': {
      '@apply underline': {},
    },
    '.sk-texteditor-strikethrough': {
      '@apply line-through': {},
    },
    '.sk-texteditor-link': {
      '@apply underline text-vattjom-text-primary': {},
    },
    '.sk-texteditor-bullet-list': {
      '@apply list-disc pl-24 my-8': {},
    },
    '.sk-texteditor-ordered-list': {
      '@apply list-decimal pl-24 my-8': {},
    },
    '.sk-texteditor-list-item': {
      '@apply my-4': {},
    },
    '.sk-texteditor-check-list': {
      '@apply list-none pl-4 my-8': {},
    },
    '.sk-texteditor-list-item-checked, .sk-texteditor-list-item-unchecked': {
      '@apply relative pl-24': {},
      '&::before': {
        '@apply absolute left-0 top-[.3rem] h-[1.6rem] w-[1.6rem] border-1 border-input-field-outline rounded-4 bg-background-content':
          {},
        content: '""',
      },
    },
    '.sk-texteditor-list-item-checked': {
      '@apply line-through': {},
      '&::after': {
        '@apply absolute left-[.4rem] top-[.55rem] h-[.6rem] w-[.9rem] border-l-2 border-b-2 border-dark-primary -rotate-45':
          {},
        content: '""',
      },
    },
    '.sk-texteditor-list-item-nested': {
      '@apply my-0': {},
    },
    '.sk-texteditor-quote': {
      '@apply border-l-4 border-divider pl-16 my-8 text-dark-secondary': {},
    },
    '.sk-texteditor-code': {
      '@apply bg-background-100 border-1 border-divider rounded-8 p-12 my-8 font-mono whitespace-pre-wrap': {},
    },
    '.sk-texteditor-inline-code': {
      '@apply bg-background-100 rounded-4 px-4 font-mono': {},
    },

    '.sk-texteditor-scale': {
      '@apply absolute right-2 top-0 h-[4rem] flex items-center gap-2 z-10': {},
    },
    '.sk-texteditor-scale-button': {
      '@apply h-[3.2rem] w-[3.2rem] rounded-10 text-dark-primary flex items-center justify-center': {},
      '&:hover': {
        '@apply bg-tertiary-surface-hover': {},
      },
      '&:focus-visible': {
        '@apply ring-[.2rem] ring-ring ring-offset-0 outline-0 bg-background-content': {},
      },
      '&:disabled': {
        '@apply text-dark-disabled cursor-default': {},
        '&:hover': {
          '@apply bg-transparent': {},
        },
        '&:hover .tooltip-container': {
          '@apply hidden opacity-0': {},
        },
      },
      '.tooltip-container': {
        '@apply absolute z-20 top-full mt-0 left-1/2 -translate-x-1/2 invisible opacity-0 transition-opacity duration-200 ease-in-out whitespace-nowrap':
          {},
      },
      '&:hover .tooltip-container, &:focus-visible .tooltip-container': {
        '@apply visible opacity-100': {},
      },
    },
    '.sk-texteditor-scale-label': {
      '@apply text-label-small font-thin text-dark-secondary select-none min-w-[3.6rem] text-center': {},
    },
  },
});
