const plugin = require('tailwindcss/plugin');

module.exports = function (
  options = { customScrollbar: true, tailwindForms: true, plugin: { colors: [], cssBase: true } }
) {
  return {
    theme: {
      ...(options.customScrollbar
        ? {
            '.custom-scrollbar': {
              '@apply scrollbar scrollbar-h-5 scrollbar-w-4 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full':
                {},
            },
          }
        : {}),
    },
    plugins: [
      ...(options.tailwindForms ? [require('@tailwindcss/forms')] : []),
      ...(options.customScrollbar ? [require('tailwind-scrollbar')({ nocompatible: true })] : []),
      ...(options.customScrollbar
        ? [
            plugin(function ({ addBase }) {
              addBase({
                '.custom-scrollbar': {
                  '@apply scrollbar scrollbar-h-5 scrollbar-w-4 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full':
                    {},
                },
              });
            }),
          ]
        : []),
      require('./plugin')(options.plugin),
    ],
    variants: {
      ...(options.customScrollbar ? { scrollbar: ['rounded'] } : {}),
    },
  };
};
