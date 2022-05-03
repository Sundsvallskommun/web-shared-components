module.exports = Pagination = () => ({
  ".pagination": {
    "@apply select-none": {},

    "&-sm": {
      "@apply text-xs": {},

      ".pagination-pageLabel": {
        "@apply px-xs py-xs": {},
      },
    },

    "&-md": {
      "@apply text-lg": {},
    },

    "&-lg": {
      "@apply text-xl": {},
    },

    "&-list": {
      "@apply flex items-baseline": {},
    },

    "&-pageLabel": {
      "@apply cursor-pointer m-sm": {},
      width: "1.5em",
      height: "1.8em",

      "&[aria-disabled='true']": {
        "@apply border-primary border-b cursor-default text-primary": {},
      },
    },

    "&-prevNextButton": {
      "@apply inline-flex items-center  sm:w-auto inline-flex flex-row leading-none":
        {},

      "&[data-reverse=true]": {
        "@apply flex-row-reverse": {},

        ".pagination-prevNextButton-label": {
          "@apply mr-sm ml-0": {},
        },
      },

      "&[disabled]": {
        "@apply opacity-50 cursor-default": {},
      },

      "&[disabled='false']": {
        "&-label, &-icon": {
          "@apply cursor-pointer": {},
        },
      },

      "&-label": {
        "@apply hidden sm:inline ml-sm leading-none": {},
      },

      "&-icon": {
        "@apply align-text-bottom leading-none flex items-center": {},

        ".material-icons-outlined": {
          fontSize: "1em",
        },
      },
    },

    "&-ellipsis": {
      "@apply inline-block w-16 text-center": {},
    },
  },
});
