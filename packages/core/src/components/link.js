module.exports = Link = () => ({
  ".link": {
    "@apply cursor-base underline outline-none hover:underline": {},
    "@apply text-primary dark:text-primary": {},
    "@apply focus-visible:ring-4 focus-visible:ring-primary": {},

    "@apply hover:text-primary-active": {},

    "&-external-icon": {
      fontSize: "0.875em !important",
      lineHeight: "1",
      marginLeft: ".25em",
      verticalAlign: "text-top",
    },

    "&-disabled": {
      "@apply disabled:opacity-60 disabled:cursor-not-allowed disabled:no-underline": {},
    },
  },
});
