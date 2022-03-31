module.exports = UserMenu = (colors) => ({
  ".usermenu": {
    // "@apply mx-sm mt-sm mb-0 px-md py-0 divide-y divide-y-2 divide-gray-300 bg-white border-2 border-white border-solid rounded":
    "@apply drop-shadow-none shadow-none filter-none": {},
    // "@apply ": {},
    "&-is-open": {
      // "@apply border-2 border-gray-300 border-solid rounded": {},
      // "box-shadow": "0px 4px 12px rgba(27, 29, 31, 0.12)",
    },

    "&-header": {
      // "@apply flex flex-col text-left m-0 px-0 py-sm": {},
      '[aria-expanded="true"] &': {
        "@apply bg-hover": {},
      },
    },
    "&-body": {
      // "@apply p-0 m-0 py-sm bg-white": {},
    },
    "&-item": {
      "&.link": {
        "@apply text-white no-underline": {},
      },
      "@apply text-white cursor-pointer bg-hover": {
        a: {
          "@apply text-white px-md py-sm w-full": {},
        },
        "a.link": {
          "@apply text-white px-md py-sm w-full": {},
        },
      },
    },
    ".inactive > &-item": {
      "@apply bg-white text-black no-underline": {},
      "a.link": {
        "@apply text-black no-underline": {},
      },
    },
  },
});
