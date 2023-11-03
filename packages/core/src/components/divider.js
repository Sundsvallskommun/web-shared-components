module.exports = Divider = () => ({
  '.divider': {
    '@apply border-0 border-divider': {},
    '&-vertical': {
      '@apply border-l-1 border-solid h-auto mx-2': {},
      '&[data-strong="true"]': {
        '@apply border-l border-solid h-auto mx-2': {},
      },
    },
    '&-horizontal': {
      '@apply border-b-1 border-solid w-auto my-2': {},
      '&[data-strong="true"]': {
        '@apply border-b border-solid w-auto my-2': {},
      },
    },
  },
});
