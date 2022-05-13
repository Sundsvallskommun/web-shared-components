module.exports = Link = () => ({
  ".link": {
    "@apply cursor-base no-underline outline-none hover:underline": {},
    "@apply text-primary dark:text-primary": {},
    "@apply focus-visible:ring-4 focus-visible:ring-primary": {},

    "@apply hover:text-primary-active": {},

    "&[target='_blank']": {
      "&::after": {
        fontFamily: "Material Icons Outlined",
        display: "inline-block",
        position: "relative",
        content: "'launch'",
        lineHeight: "1",
        marginLeft: ".25em",
        verticalAlign: "text-top",
      },
    },

    "&-disabled": {
      "@apply disabled:opacity-60 disabled:cursor-not-allowed disabled:no-underline": {},
    },
  },
});
