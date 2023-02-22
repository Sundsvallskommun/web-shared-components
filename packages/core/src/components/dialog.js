module.exports = Dialog = () => ({
  '.dialog': {
    '@apply w-fit max-w-prose': {},
    '&-buttons': {
      '@apply grid grid-flow-col gap-lg place-content-stretch': {},
      gridAutoColumns: 'minmax(0, 1fr)',
    },
    '&-content': {
      '@apply text-center mb-lg': {},
    },
  },
});
