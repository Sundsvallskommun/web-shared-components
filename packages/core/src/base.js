module.exports = {
  html: {
    '@apply text-base antialiased': {},
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
  '*': {
    '@apply focus-visible:ring-ring': {},
  },
  small: {
    fontSize: '@apply font-small',
  },
  h1: {
    '@apply text-h1-sm md:text-h1-md xl:text-h1-lg leading-h1-sm md:leading-h1-md xl:leading-h1-lg': {},
    '@apply font-bold': {},
    '@apply mb-md': {},

    '+ p': {
      '@apply mb-[40px] mt-0': {},
    },
  },
  h2: {
    '@apply text-h2-sm md:text-h2-md xl:text-h2-lg leading-h2-sm md:leading-h2-md xl:leading-h2-lg': {},
    '@apply mt-lg': {},
    '@apply font-bold': {},
  },
  h3: {
    '@apply text-h3-sm md:text-h3-md xl:text-h3-lg leading-h3-sm md:leading-h3-md xl:leading-h3-lg': {},
    '@apply font-bold': {},
    '@apply mt-lg': {},
  },
  'h4,h5,h6': {
    '@apply text-h4-sm md:text-h4-md xl:text-h4-lg leading-h4-sm md:leading-h4-md xl:leading-h4-lg': {},
    '@apply font-bold': {},
    '@apply mt-lg': {},
  },
  p: { '@apply my-4': {} },

  '.text-content': {
    '@apply max-w-[80rem]': {},

    p: { '@apply mt-sm leading-[1.5]': {} },
  },
};
