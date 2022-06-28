module.exports = Message = () => ({
  ".message": {
    "@apply max-w-2xl flex items-center font-bold text-sm sm:text-base px-6 py-6 m-2 shadow-lg w-max break-words": {},
    "@apply text-neutral-900 bg-white border-l-4": {},
    // dark
    "@apply dark:text-neutral-100 dark:bg-neutral-700 dark:border-neutral-600": {},
    "minWidth": "520px",
    "width": "520px",

    "&-text": {
      "@apply text-left flex-grow": {},
    },

    "&-info": {
      "--tw-text-opacity": "1",
      "borderColor": "rgba(59, 130, 246, var(--tw-text-opacity))",

      ".message-icon": {
        "color": "rgba(59, 130, 246, var(--tw-text-opacity))",
      },

    },
    "&-success": {
      "--tw-text-opacity": "1",
      "borderColor": "rgba(34, 197, 94, var(--tw-text-opacity))",

      ".message-icon": {
        "color": "rgba(34, 197, 94, var(--tw-text-opacity))",
      },
    },
    "&-error": {
      "--tw-text-opacity": "1",
      "borderColor": "rgba(239, 68, 68, var(--tw-text-opacity))",

      ".message-icon": {
        "color": "rgba(239, 68, 68, var(--tw-text-opacity))",
      },
    },
    "&-warning": {
      "--tw-text-opacity": "1",
      "borderColor": "rgba(234, 179, 8, var(--tw-text-opacity))",

      ".message-icon": {
        "color": "rgba(234, 179, 8, var(--tw-text-opacity))",
      },
    },
  },

  ".message-icon": {
    "@apply mr-4 flex-shrink-0 w-10 h-10": {},
  },

  ".message-close-button": {
    "@apply border-transparent flex items-center justify-center transition-all duration-150 rounded-full outline-none cursor-base": {},
    fontSize: "1.2em",
    padding: "0.36em",
    marginLeft: "0.25em",
    marginRight: "-0.55em",

    "&-icon": {
      fontSize: "1em"
    },

    "&-disabled": {
      "@apply disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none": {},
    },
  },
});
