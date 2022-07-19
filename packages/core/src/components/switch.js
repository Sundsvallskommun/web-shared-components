module.exports = Switch = (colors) => ({
  ".form-switch-label": {
    "@apply inline-block align-middle": {},

    "&[type='hidden']": {
      "@apply hidden": {},

      ".form-switch": {
        "@apply hidden": {},
      },
    } 
    
      
  },
  ".form-switch": {
    "@apply rounded-full p-0.5 cursor-base focus:outline-none": {},
    "@apply bg-gray-stroke dark:bg-neutral-700": {},
    // Hover
    //"@apply hover:bg-neutral-300 dark:hover:bg-neutral-600": {},

    border: "0.1rem solid transparent",

    "input[type=checkbox]:checked + &, input[type=checkbox][aria-checked=mixed] + &": {
      backgroundColor: "currentColor",
      ".form-switch-box-sm": {
        transform: "translateX(1.42rem)",
      },
      ".form-switch-box-md": {
        transform: "translateX(1.6rem)",
      },
      ".form-switch-box-lg": {
        transform: "translateX(1.78rem)",
      },
    },



    "input[type=checkbox]:focus-visible + &": {
      "@apply z-base !important": {},
      "@apply border-primary !important": {},
      "@apply ring-4 ring-black !important": {},
    },

    "input[type=checkbox]:checked:focus-visible + &, input[type=checkbox][aria-checked=mixed]:focus-visible + &": {
      "@apply ring-black !important": {},
    },
    ".dark input[type=checkbox]:checked:focus-visible + &,.dark input[type=checkbox][aria-checked=mixed]:focus-visible + &": {
      "@apply ring-black !important": {},
    },
    "input[type=checkbox]:checked:hover:not(:disabled) + &, input[type=checkbox][aria-checked=mixed]:hover:not(:disabled) + &": {
      "@apply cursor-base": {},
    },

    // colors
    ...colors.reduce(
      (styles, color) => ({
        ...styles,
        [`&[data-color="${color}"]`]: {
          [`@apply text-${color}`]: {},

          "input[type=checkbox]:focus + &": {
            borderColor: `theme('colors.${color}.DEFAULT')`,
            boxShadow: `0 0 5px theme('colors.${color}.DEFAULT')`,
            borderWidth: "0.1rem",
          },
        },
      }),
      {}
    ),

    // disabled
    "&-disabled": {
      "@apply cursor-not-allowed": {},

      "&": {
        backgroundColor: "#ECECEC",
      }
    },

    "input[type=checkbox]:not(:checked) + &-disabled .form-switch-box": {
      "@apply bg-gray-stroke": {},
    },


    // sizing
    "&-sm": {
      height: "2.16rem",
      width: "3.6rem",
    },

    "&-md": {
      height: "2.4rem",
      width: "4rem",
    },

    "&-lg": {
      height: "2.64rem",
      width: "4.4rem",
    },
  },

  // Knob
  ".form-switch-box": {
    "@apply transition-transform ease-in-out duration-150 transform bg-white rounded-full shadow translate-x-0": {},

    // sizing
    "&-sm": {
      height: "1.6rem",
      width: "1.7rem",
    },

    "&-md": {
      height: "2rem",
      width: "2rem",
    },

    "&-lg": {
      height: "2.2rem",
      width: "2.2rem",
    },
  },
});
