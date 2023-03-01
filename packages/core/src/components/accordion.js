module.exports = Accordion = (colors) => ({
  '.accordion': {
    '&-header': {
      '@apply flex flex-col text-left': {},

      '[aria-expanded="true"] &': {
        '@apply bg-hover': {},
      },

      '&-icon': {
        '@apply ml-auto !text-2xl': {},
      },
    },

    '&-is-open &-header': {
      '@apply bg-hover': {},
    },

    '&-toggle': {
      '@apply flex items-center inline-block text-lg leading-lg text-left text-lg mx-md sm:mx-lg my-md': {},
      fontWeight: 'bold',
      //"@apply focus-visible:shadow shadow-lg": {},
      '&:focus-visible': {
        boxShadow: '0 0 0 0.4rem #fff!important',
        outline: '0',
        //"@apply border-4": {},
      },
      '.accordion-title': {
        '@apply mr-md text-base leading-base md:text-lg md:leading-lg': {},
      },
      '.accordion-subtitle': {
        '@apply m-0 mr-md text-sm font-normal': {},
      },
    },

    '&-body': {
      '@apply h-0 overflow-hidden m-lg': {},
      transitionProperty: 'visibility, height, padding, margin',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '180ms',

      '&[aria-hidden="true"], &[data-hidden="true"]': {
        '@apply my-0 invisible': {},
      },

      '&[aria-hidden="false"], &[data-hidden="false"]': {
        '@apply block h-auto visible': {},
      },
    },

    '&-solid': {
      '@apply border border-primary': {},
      '.accordion-header': {
        '@apply bg-primary text-white': {},

        '[aria-expanded="true"] &': {
          '@apply bg-hover': {},
        },
      },
    },

    '&-alert': {
      '@apply border border-warning': {},
      '.accordion-header': {
        '@apply bg-warning-light text-warning': {},

        '[aria-expanded="true"] &': {
          '@apply bg-warning-light': {},
        },
      },
    },

    '&-is-open': {
      '@apply border border-gray-stroke': {},
      '& .accordion-header': {
        '@apply bg-hover text-white': {},
      },
    },

    '&-is-open-alert': {
      '@apply border border-warning': {},
      '& .accordion-header': {
        '@apply border-b border-warning': {},
      },
    },

    '&-is-open &-body &-is-open-alert': {
      '@apply overflow-visible animate-reset-overflow': {},
    },

    '&-outline': {
      '@apply border border-gray-stroke': {},
      '.accordion-body': {
        '@apply mt-0': {},
      },
      '.accordion-toggle': {
        '&:focus-visible': {
          boxShadow: '0 0 0 0.4rem #4b4b4b!important',
          outline: '0',
        },
      },
      '.accordion-header': {
        '@apply bg-transparent text-body': {},

        '[aria-expanded="true"] &': {
          '@apply bg-hover': {},
        },
      },
    },
  },
});
