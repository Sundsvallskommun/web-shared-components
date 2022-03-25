// const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./packages/*/**/*.{js,jsx,ts,tsx,vue,mdx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("./packages/core")({
      colors: [],
      cssBase: true
    }),
  ],
};
