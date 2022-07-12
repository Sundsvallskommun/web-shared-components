function buttonSolid(colors) {
  return {
    "&-solid": {
      //"@apply text-": {},
      "@apply border border-gray-stroke": {},
      "@apply text-black bg-white": {},
      /* hover */
      "@apply hover:text-white hover:bg-hover": {},
      /* focus */
      "@apply focus-visible:z-base": {},
      "@apply focus-visible:border-primary": {},
      "@apply focus-visible:ring-4 focus-visible:ring-black": {},
      /* active */
      "@apply active:bg-hover active:text-white": {},


      /* dark mode */
      "@apply dark:border-neutral-600": {},
      "@apply dark:text-neutral-100 dark:bg-neutral-700": {},
      /* dark hover */
      "@apply dark:hover:border-hover dark:hover:bg-neutral-600": {},
      /* dark focus */
      "@apply dark:focus-visible:border-primary-500": {},
      /* dark active */
      "@apply dark:active:bg-neutral-900 dark:active:border-neutral-600": {},

      /* "&[data-color=\"primary\"]": {
        "@apply text-white bg-primary": {},
        "@apply hover:text-white hover:bg-hover": {},
        "@apply active:text-white active:bg-hover": {},
        "@apply focus-visible:ring-4 focus-visible:ring-black": {},
      }, */

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            //[`@apply border-${color}`]: {},
            [`@apply text-white bg-${color}`]: {},
            // hover
            [`@apply hover:text-white hover:bg-${color}-active`]: {},

            [`@apply active:text-white active:bg-${color}-active`]: {},
            [`@apply focus-visible:ring-4 focus-visible:ring-black`]: {},


            // focus
            //[`@apply focus-visible:bg-${color}-700`]: {},
            //[`@apply focus-visible:border-${color}-500`]: {},
            //[`@apply focus-visible:ring-${color}-500`]: {},
            // active
            //[`@apply active:bg-${color}-600`]: {},
            // dark mode
            //[`@apply dark:border-${color}-500`]: {},
            //[`@apply dark:bg-${color}-600`]: {},
            // dark hover
            //[`@apply dark:hover:border-${color}-400 dark:hover:bg-${color}-500`]: {},
            // dark focus
            //[`@apply dark:focus-visible:border-${color}-500`]: {},
            //[`@apply dark:focus-visible:ring-${color}-500`]: {},
            // dark active
            //[`@apply dark:active:bg-${color}-800 dark:active:border-${color}-600`]: {},
          },
        }),
        {}
      ),

    },
  };
}

function buttonOutline(colors) {
  return {
    "&-outline": {
      "@apply border border-neutral-200": {},
      "@apply text-body bg-transparent": {},
      /* hover */
      "@apply hover:bg-neutral-100 hover:border-neutral-300": {},
      /* focus */
      "@apply focus-visible:z-base": {},
      "@apply focus-visible:border-primary-500": {},
      "@apply focus-visible:ring-4 focus-visible:ring-primary-500": {},
      /* active */
      "@apply active:bg-neutral-200": {},
      /* dark mode */
      "@apply dark:border-neutral-600": {},
      "@apply dark:text-neutral-100 dark:bg-transparent": {},
      /* dark hover */
      "@apply dark:hover:border-neutral-300 dark:hover:bg-neutral-700": {},
      /* dark focus */
      "@apply dark:focus-visible:border-primary-500": {},
      /* dark active */
      "@apply dark:active:bg-neutral-600 dark:active:border-neutral-600": {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply border-current`]: {},
            [`@apply text-${color}-600 bg-transparent`]: {},
            /* hover */
            [`@apply hover:bg-${color}-50`]: {},
            /* focus */
            [`@apply focus-visible:border-${color}-500`]: {},
            [`@apply focus-visible:ring-${color}-500`]: {},
            /* active */
            [`@apply active:bg-${color}-100`]: {},
            /* dark mode */
            [`@apply dark:border-${color}-200`]: {},
            [`@apply dark:text-${color}-200 dark:bg-transparent`]: {},
            [`@apply dark:border-${color}-300`]: {},
            /* dark hover */
            [`@apply dark:hover:bg-${color}-200`]: {},
            [`@apply dark:hover:bg-opacity-15`]: {},
            /* dark focus */
            [`@apply dark:focus-visible:border-${color}-500`]: {},
            [`@apply dark:focus-visible:ring-${color}-500`]: {},
            /* dark active */
            [`@apply dark:active:bg-${color}-200`]: {},
            [`@apply dark:active:bg-opacity-25`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function buttonGhost(colors) {
  return {
    "&-ghost": {
      "@apply text-body bg-transparent": {},
      "@apply hover:bg-neutral-100": {},
      /* focus */
      "@apply focus-visible:z-base": {},
      "@apply focus-visible:ring-4 focus-visible:ring-primary-500": {},
      /* active */
      "@apply active:bg-neutral-200": {},
      /* dark mode */
      "@apply dark:text-neutral-100 dark:bg-transparent": {},
      /* dark hover */
      "@apply dark:hover:border-neutral-300 dark:hover:bg-neutral-700": {},
      /* dark active */
      "@apply dark:active:bg-neutral-600 dark:active:border-neutral-400": {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-600`]: {},
            [`@apply hover:bg-${color}-50`]: {},
            /* focus */
            [`@apply focus-visible:ring-${color}-500`]: {},
            [`@apply active:bg-${color}-100`]: {},
            // dark colors
            [`@apply dark:text-${color}-200 dark:bg-transparent`]: {},
            [`@apply dark:border-${color}-300 dark:hover:bg-${color}-200`]: {},
            [`@apply dark:hover:bg-opacity-15`]: {},
            [`@apply dark:active:bg-${color}-200`]: {},
            [`@apply dark:active:bg-opacity-25`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function buttonLight(colors) {
  return {
    "&-light": {
      "@apply shadow-sm": {},
      "@apply border border-transparent": {},
      "@apply text-body bg-neutral-100": {},
      /* hover */
      "@apply hover:bg-neutral-200": {},
      /* focus */
      "@apply focus-visible:z-base": {},
      "@apply focus-visible:border-primary-500": {},
      "@apply focus-visible:ring-4 focus-visible:ring-primary-500": {},
      /* active */
      "@apply active:bg-neutral-300": {},
      /* dark mode */
      "@apply dark:border-transparent": {},
      "@apply dark:text-neutral-100 dark:bg-neutral-700": {},
      /* dark hover */
      "@apply dark:hover:bg-neutral-600": {},
      /* dark focus */
      "@apply dark:focus-visible:border-primary-500": {},
      /* dark active */
      "@apply dark:active:bg-neutral-600": {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-600 bg-${color}-50`]: {},
            /* hover */
            [`@apply hover:bg-${color}-100`]: {},
            /* focus */
            [`@apply focus-visible:border-${color}-500`]: {},
            [`@apply focus-visible:ring-${color}-500`]: {},
            /* active */
            [`@apply active:bg-${color}-200`]: {},
            /* dark mode */
            [`@apply dark:text-${color}-300 dark:bg-${color}-500`]: {},
            [`@apply dark:bg-opacity-15`]: {},
            /* dark hover */
            [`@apply dark:hover:bg-${color}-500`]: {},
            [`@apply dark:hover:bg-opacity-25`]: {},
            /* dark focus */
            [`@apply dark:focus-visible:border-${color}-500`]: {},
            [`@apply dark:focus-visible:ring-${color}-500`]: {},
            /* dark active */
            [`@apply dark:active:bg-${color}-500`]: {},
            [`@apply dark:active:bg-opacity-30`]: {},
          },
        }),
        {}
      ),
    },
  };
}

function buttonLink(colors) {
  return {
    "&-link": {
      "@apply h-auto p-0 leading-normal text-neutral-600 hover:underline active:text-neutral-700": {},
      "@apply focus-visible:z-base focus-visible:ring-4 focus-visible:ring-primary-500": {},
      // dark colors
      "@apply dark:text-neutral-200": {},
      "@apply dark:active:text-neutral-500": {},

      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [`&[data-color="${color}"]`]: {
            [`@apply text-${color}-600 active:text-${color}-700`]: {},
            [`@apply focus-visible:ring-${color}-500`]: {},
            // dark colors
            [`@apply dark:text-${color}-200`]: {},
            [`@apply dark:active:text-${color}-500`]: {},
          },
        }),
        {}
      ),
    },
  };
}

module.exports = Button = (colors) => ({
  ".btn": {
    "@apply relative": {},
    "@apply m-0": {},
    "@apply inline-flex items-center justify-center flex-shrink-0 align-middle": {},
    "@apply font-medium leading-tight": {},
    transitionProperty: "background-color, border-color, color, fill, stroke, box-shadow",
    "@apply	duration-75 ease-out": {},
    "@apply outline-none appearance-none cursor-base select-none whitespace-nowrap": {},
    "@apply focus-visible:outline-none": {},

    padding: "1.2rem 3.2rem",
    borderRadius: "3.2rem",

    // sizing
    "&-sm": {
      "@apply text-xs": {},
      // minWidth: "1.75rem",
    },

    "&-md": {
      "@apply text-sm": {},
      // minWidth: "2rem",
    },

    "&-lg": {
      "@apply text-base": {},
      // minWidth: "2.5rem",
    },

    // State

    "&-disabled": {
      "@apply disabled:shadow-none disabled:cursor-not-allowed": {},
      "@apply disabled:text-black disabled:bg-gray-light !important": {},
    },

    // variants
    ...buttonSolid(colors),
    ...buttonOutline(colors),
    //...buttonGhost(colors),
    //...buttonLight(colors),
    ...buttonLink(colors),
  },
});
