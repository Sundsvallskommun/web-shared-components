module.exports = ProfilePicture = () => ({
  '.profile-picture': {
    '@apply relative overflow-hidden flex-shrink-0 text-xs leading-none flex items-center justify-center text-center w-[48px] h-[48px] mr-sm rounded-full border-2 border-primary':
      {},

    '.profile-picture-img': {
      '@apply bg-cover absolute inset-0 bg-center text-xs leading-none': {},
    },
    '.icon': {
      width: '3.8rem!important',
      height: '3.8rem!important',
    },
  },
});
