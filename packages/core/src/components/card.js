module.exports = Card = () => ({
  '.avatar': {
    '@apply bg-primary-light text-primary rounded-full p-4': {},
  },

  '.card-list': {
    '@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10': {},
    //"@apply text-center": {},
    //"@apply justify-center items-center": {},
  },

  '.card': {
    '@apply p-lg rounded shadow-lg bg-white relative': {},
    '@apply p-0': {},
    //padding: "2.4rem",

    // clickable
    '&-clickable': {
      // Hover
      '@apply hover:shadow-xl hover:cursor-pointer': {},
    },

    // "@apply bg-neutral-200 border border-neutral-100 text-body": {},
    // dark
    //"@apply dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300": {},
  },
  '.card-outlined': {
    '@apply border-2 border-gray-stroke': {},
  },
  '.card-border-top': {
    '@apply border-t-4 border-t-primary': {},
  },

  '.card-body': {
    '@apply text-body p-8': {},
  },

  '.card-image': {
    '@apply object-cover': {},
    width: '100%',
    height: '250px',
  },

  '.card-link': {
    '&::after': {
      content: "''",
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
    },
  },
});
