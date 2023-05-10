module.exports = Divider = () => ({
  '.divider': {
    '@apply border-0 border-gray-stroke': {},
    //borderColor: "inherit",
    '&-vertical': {
      '@apply border-l border-solid h-auto mx-2': {},
    },
    '&-horizontal': {
      '@apply border-b border-solid w-auto my-2': {},
    },
  },
});
