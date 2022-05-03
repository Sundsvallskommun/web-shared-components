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
      "@apply text-sm": {},
    },

    "&-lg": {
      "@apply text-base": {},
    },

    "&-list": {
      "@apply flex items-baseline": {},
    },

    "&-pageLabel": {
      "@apply px-sm py-sm cursor-pointer rounded-xl": {},
      width: "2.75em",
      height: "2.75em",

      "&[aria-disabled='true']": {
        "@apply bg-gray-200 cursor-default": {},
      },
    },

    "&-prevNextButton": {
      "@apply inline-flex items-center  sm:w-auto inline-flex flex-row leading-none": {},

      "&[data-reverse=true]": {
        "@apply flex-row-reverse": {},

        ".pagination-prevNextButton-label": {
          "@apply mr-sm ml-0": {},
        }
      },

      "&[disabled]": {
        "@apply opacity-50 cursor-default": {},
      },

      "&[disabled='false']": {

        "&-label, &-icon": {
          "@apply cursor-pointer": {},
        }
        
      },

      "&-label": {
        "@apply hidden sm:inline ml-sm leading-none": {},
      },

      "&-icon": {
        "@apply align-text-bottom leading-none flex items-center": {},
        

        '.material-icons-outlined': {
          fontSize: '1.675em',
        }
      },

    },

    "&-ellipsis": {
      "@apply inline-block w-16 text-center": {},
    },
  },
});
