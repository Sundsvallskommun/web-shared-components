export const FileUpload = () => ({
  '.sk-form-file-upload': {
    '&-list': {
      '@apply flex flex-col py-4 gap-x-12 items-start': {},
      '@apply border-divider border-t-1 border-b-1': {},

      '&[data-border="true"]': {
        '@apply border-0 py-0 gap-y-12': {},

        '.sk-form-file-upload-list-item': {
          '@apply border-1 border-divider': {},
        },
      },

      'li[role="separator"]': {
        '@apply h-[1px] mt-3 mb-6 py-0 w-full': {},
      },

      '&-item': {
        '@apply self-stretch flex flex-row flex-wrap p-12 rounded-button': {},
        '@apply gap-y-12': {},

        '&-innerwrapper': {
          '@apply w-full': {},
          '@apply self-stretch list-none flex flex-row gap-y-24 gap-x-12': {},
        },

        '&[data-isedit="true"]': {
          '.sk-form-file-upload-list-item-innerwrapper': {
            '@apply flex-col': {},
            '@apply medium-device:flex-row medium-device:items-center': {},

            '.sk-form-file-upload-list-item-icon': {
              '@apply hidden': {},
              '@apply medium-device:flex': {},
            },
          },
        },

        '&:hover': {
          '@apply bg-background-200': {},
        },

        '&[data-border="true"]': {
          '@apply border-1 border-divider': {},
        },

        '&-icon': {
          '@apply flex justify-center shrink-0 rounded-utility overflow-hidden': {},
          '@apply bg-vattjom-surface-accent': {},

          '@apply w-32 h-32': {},
          '.sk-icon': {
            '@apply w-full h-full p-[.64rem]': {},
          },

          '&[data-size="sm"]': {
            '@apply w-32 h-32': {},
            '.sk-icon': {
              '@apply p-[.64rem]': {},
            },
          },
          '&[data-size="md"]': {
            '@apply medium-device:w-44 medium-device:h-44': {},
            '.sk-icon': {
              '@apply medium-device:p-[.88rem]': {},
            },
          },
        },

        '&-content': {
          '@apply grow flex flex-col justify-start gap-y-24': {},
          '@apply medium-device:grid medium-device:grid-flow-col medium-device:auto-cols-fr medium-device:items-center':
            {},

          '& > *': {
            '@apply grow shrink basis-auto': {},
          },

          '&-name': {
            '@apply flex flex-col items-start gap-2': {},
            '&[data-size="sm"]': {
              '.sk-form-file-upload-list-item-content-name-description': {
                '@apply hidden': {},
              },
            },

            '&-input-wrapper': {
              '@apply flex items-center': {},

              '.sk-form-input': {
                '@apply grow': {},
              },
            },

            '&-ending': {
              '@apply ml-8': {},
            },

            '&-heading': {
              '@apply text-base font-bold leading-24': {},
            },

            '&-description': {
              '@apply text-small': {},
            },
          },
        },

        '&-actions': {
          '@apply flex gap-12 items-center': {},
          '&-more': {
            '&-wrapper': {
              '@apply relative': {},
            },
          },
        },

        '.sk-form-error-message': {
          '@apply text-error': {},
        },

        '.sk-form-control': {
          '@apply w-full medium-device:w-fit': {},

          '.sk-form-select,.sk-form-input': {
            '@apply w-full medium-device:w-fit': {},
          },
        },

        '&-progress': {
          '@apply w-full flex gap-x-md items-center': {},

          '&-bar': {
            '@apply w-full h-[0.4rem] bg-background-color-mixin-2 rounded-circular overflow-hidden': {},

            '&-amount': {
              '@apply h-full bg-primary-surface w-0 transition-[width_.3s_ease]': {},
            },
          },
        },
      },
    },

    '&-area': {
      '&[data-relativity="viewport"]': {
        '.sk-form-file-upload-area-overlay': {
          '@apply fixed': {},
        },
      },

      '&[data-relativity="component"]': {
        '@apply relative inline-flex': {},
        '.sk-form-file-upload-area-overlay': {
          '@apply absolute': {},
        },
      },

      '&-overlay': {
        '@apply fixed z-overlay': {},
        '@apply top-0 bottom-0 left-0 right-0 p-32 rounded-groups': {},
        '@apply bg-primitives-overlay-darken-6': {},
        '@apply border-2 border-gronsta-text-primary': {},
        '@apply hidden': {},

        '&[data-isdragging]': {
          '@apply block': {},
        },

        '&-content': {
          '@apply w-full h-full': {},
          '@apply rounded-6 border-dashed border-2 border-gronsta-text-primary': {},
          '@apply flex items-center justify-center': {},
          '@apply text-gronsta-text-primary': {},

          '&-icon': {
            '&-wrapper': {
              '@apply rounded-full bg-gronsta-surface-accent p-16 h-40 w-40 md:h-[8rem] md:w-[8rem] xl:h-[12rem] xl:w-[12rem]':
                {},

              '.sk-icon': {
                '@apply w-full h-full': {},
              },
            },
          },
        },
      },
    },

    '&-modal': {
      '@apply medium-device:w-[78rem]': {},

      '&-labels': {
        '@apply hidden': {},
        '@apply medium-device:grid medium-device:grid-cols-2': {},
        '@apply text-small font-bold': {},
        '@apply mt-12 mb-8': {},
      },

      '&-button': {
        '&-wrapper': {
          '@apply flex items-center gap-8 mb-32': {},
        },
      },
    },
    '&-field &-area': {
      '@apply w-full h-full': {},

      '&-children': {
        '@apply w-full h-full': {},
      },
    },
    '&-field': {
      '@apply w-fit': {},

      '&[data-variant="horizontal"] &-button': {
        '@apply flex flex-row p-24 justify-center items-center gap-16': {},
      },

      '&[data-variant="vertical"] &-button': {
        '@apply flex flex-col p-24 justify-center items-center gap-18': {},

        '.sk-form-file-upload-field-button-content': {
          '@apply items-center': {},

          '&-restrictions': {
            '@apply items-center text-center': {},

            '&-mimetypes': {
              '@apply text-center': {},
            },
          },
        },
      },

      '&:hover &-button': {
        '@apply bg-vattjom-background-200 border-solid': {},
      },

      '&[data-invalid="true"] &-button': {
        '@apply bg-error-background-100 border-solid border-error': {},
      },

      '&-button': {
        '@apply w-full h-full grow shrink-0 basis-0 self-stretch': {},
        '@apply rounded-groups border-vattjom-surface-primary border-dashed border-1 bg-vattjom-background-100': {},

        '&-icon': {
          '.sk-icon': {
            '@apply w-32 h-32': {},
          },
        },
        '&-content': {
          '@apply flex flex-col items-start gap-y-4': {},
          '&-restrictions': {
            '@apply flex flex-col items-start': {},
            '@apply text-small text-dark-secondary': {},

            '&-mimetypes': {
              '@apply text-start line-clamp-1 max-w-[25rem]': {},
            },
          },
        },
      },
    },
  },
});
