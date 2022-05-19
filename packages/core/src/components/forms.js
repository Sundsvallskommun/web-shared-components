function fieldOutline(colors) {
  return {
    "&-outline": {
      "@apply border shadow-sm border-gray-stroke": {},
      "@apply text-gray bg-white": {},
      //"@apply hover:border-neutral-300": {},

      "&[aria-invalid=true]": {
        "--tw-border-opacity": "1",
        borderColor: "rgba(220, 38, 38, var(--tw-border-opacity))",
        "--tw-ring-offset-shadow":
          "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow":
          "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
        boxShadow:
          "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(220, 38, 38, var(--tw-ring-opacity))",
      },
      "focus-visible:ring-4": {},
      /* dark mode */
      "@apply dark:border-neutral-700": {},
      "@apply dark:text-neutral-100 dark:bg-base": {},
      "@apply dark:hover:border-neutral-600": {},

      ".dark &[aria-invalid=true]": {
        "--tw-border-opacity": "1",
        borderColor: "rgba(248, 113, 113, var(--tw-border-opacity))",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(248, 113, 113, var(--tw-ring-opacity))",
      },
      "@media (prefers-color-scheme: dark)": {
        "&[aria-invalid=true]": {
          "--tw-border-opacity": "1",
          borderColor: "rgba(248, 113, 113, var(--tw-border-opacity))",
          "--tw-ring-opacity": "1",
          "--tw-ring-color": "rgba(248, 113, 113, var(--tw-ring-opacity))",
        },
      },

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply focus-visible:border-${color} focus-visible:ring-${color}`]: {},
            [`@apply dark:focus-visible:border-${color} dark:focus-visible:ring-${color}`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function fieldSolid(colors) {
  return {
    "&-solid": {
      "@apply border border-transparent": {},
      "@apply text-black bg-gray-light": {},
      //"@apply hover:bg-gray-200": {},

      "&[aria-invalid=true]": {
        "--tw-border-opacity": "1",
        borderColor: "rgba(220, 38, 38, var(--tw-border-opacity))",
        "--tw-ring-offset-shadow":
          "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow":
          "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
        boxShadow:
          "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(220, 38, 38, var(--tw-ring-opacity))",
      },
      "focus-visible:ring-4": {},
      /* dark mode */
      "@apply dark:text-neutral-100 dark:bg-whiteAlpha-50": {},
      "@apply dark:hover:bg-whiteAlpha-100": {},
      ".dark &[aria-invalid=true]": {
        "--tw-border-opacity": "1",
        borderColor: "rgba(248, 113, 113, var(--tw-border-opacity))",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(248, 113, 113, var(--tw-ring-opacity))",
      },
      "@media (prefers-color-scheme: dark)": {
        "&[aria-invalid=true]": {
          "--tw-border-opacity": "1",
          borderColor: "rgba(248, 113, 113, var(--tw-border-opacity))",
          "--tw-ring-opacity": "1",
          "--tw-ring-color": "rgba(248, 113, 113, var(--tw-ring-opacity))",
        },
      },

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply focus-visible:border-${color} focus-visible:ring-${color}`]: {},
            [`@apply dark:focus-visible:border-${color} dark:focus-visible:ring-${color}`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function formControl() {
  return {
    ".form-control": {
      "@apply w-full relative": {},
    },
    ".form-helper-text": {
      "@apply mt-1.5 leading-none text-gray dark:text-whiteAlpha-600": {},
    },
    ".form-error-message": {
      "@apply mt-1.5 leading-none flex items-center text-sm": {},
      "--tw-text-opacity": "1",
      color: "rgba(239, 68, 68, var(--tw-text-opacity))",
      ".dark &": {
        "--tw-text-opacity": "1",
        color: "rgba(252, 165, 165, var(--tw-text-opacity))",
      }
    },
    ".form-label": {
      "@apply text-sm font-medium text-left align-middle block mb-1.5": {},

      "&-disabled": {
        //"@apply opacity-60": {},
      },
    },
    ".form-required-indicator": {
      "@apply ml-1 text-sm": {},
      "--tw-text-opacity": "1",
      color: "rgba(239, 68, 68, var(--tw-text-opacity))",
      ".dark &": {
        "--tw-text-opacity": "1",
        color: "rgba(252, 165, 165, var(--tw-text-opacity))",
      }
    }
  };
}

function formInputGroup() {
  return {
    ".form-input-group": {
      "@apply flex relative": {},
    },

    ".form-input-element": {
      "@apply flex items-center justify-center absolute z-base top-0": {},

      "&-sm": {
        "@apply text-xs h-7 w-7": {},
      },

      "&-md": {
        "@apply text-sm h-8 w-8": {},
      },

      "&-lg": {
        "@apply text-base h-10 w-10": {},
      },

    },

    ".form-input-addon": {
      "@apply flex items-center w-auto rounded-base shadow-sm whitespace-nowrap": {},
      "@apply border border-neutral-300": {},
      "@apply text-neutral-600 bg-neutral-50": {},
      // dark colors
      "@apply dark:border-neutral-700": {},
      "@apply dark:text-neutral-100 dark:bg-whiteAlpha-300": {},

      "&-sm": {
        "@apply px-3 text-xs": {},
      },

      "&-md": {
        "@apply px-4 text-sm": {},
      },

      "&-lg": {
        "@apply px-4 text-base": {},
      },

      "&-left": {
        "@apply -mr-1 rounded-r-none": {},
      },

      "&-right": {
        "@apply -ml-1 rounded-l-none": {},
      },
    },
  };
}

module.exports = Forms = (colors) => ({
  ".form-field": {
    "@apply placeholder-gray-stroke": {},
    "@apply relative w-full min-w-0 inline-flex items-center appearance-none focus-visible:outline-none": {},
    "@apply transition-colors	duration-75 ease-out": {},

    "&-sm": {
      "@apply text-sm leading-sm": {},
      borderRadius: "0.2rem",
      padding: "1.08rem 1.44rem",
    },

    "&-md": {
      "@apply text-base leading-base": {},
      borderRadius: "0.2rem",
      padding: "1.2rem 1.6rem",
    },

    "&-lg": {
      "@apply text-lg leading-lg": {},
      borderRadius: "0.2rem",
      padding: "1.32rem 1.76rem",
    },


    "&-disabled": {
      "@apply disabled:cursor-not-allowed": {},
      "@apply disabled:bg-gray-lighter": {},
      //"@apply disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60": {},
      //"@apply disabled:border-neutral-200 disabled:bg-neutral-200": {},
      //"@apply dark:disabled:border-transparent dark:disabled:bg-whiteAlpha-200": {},
    },

    // variants
    ...fieldOutline(colors),
    ...fieldSolid(colors),
  },

  ".form-textarea": {
    //"@apply leading-tight": {},
    minHeight: "5rem",

    "&-counter": {
      "@apply mt-xs text-right": {},
    },
  },

  ".form-select": {
    //"@apply pr-10": {},
  },

  ...formInputGroup(),
  ...formControl(),
});
