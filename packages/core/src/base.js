module.exports = {
  html: {
    '@apply text-foreground antialiased bg-base': {},
    fontSize: '62.5%',
    lineHeight: '1.5',
    textRendering: 'optimizeLegibility',
    textSizeAdjust: '100%',
    touchAction: 'manipulation',
  },
  body: {
    '@apply text-base leading-base': {},
    position: 'relative',
    minHeight: '100%',
    fontFeatureSettings: "'kern'",
  },
  'h1,h2,h3,h4,h5,h6': {
    '@apply font-bold': {},
  },
  small: {
    fontSize: '1.4rem',
  },
  h1: { '@apply text-3xl leading-3xl': {} },
  h2: { '@apply text-2xl leading-2xl': {} },
  h3: { '@apply text-xl leading-xl': {} },
  h4: { '@apply text-lg leading-lg': {} },
  h5: { '@apply text-base leading-base': {} },
  h6: { '@apply text-sm leading-sm': {} },
  p: { '@apply my-4': {} },

  '.text-content': {
    '@apply max-w-[80rem]': {},

    h1: {
      '@apply mb-md': {},

      '+ p': {
        '@apply mb-[40px] mt-0': {},
      },
    },
    h2: { '@apply mt-lg': {} },
    h3: { '@apply mt-lg': {} },
    h4: { '@apply mt-lg': {} },
    h5: { '@apply mt-lg': {} },
    h6: { '@apply mt-lg': {} },
    p: { '@apply mt-sm leading-[1.5]': {} },
  },

  '.custom-scrollbar': {
    '@apply scrollbar scrollbar-h-5 scrollbar-w-4 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full': {},
  },
};
