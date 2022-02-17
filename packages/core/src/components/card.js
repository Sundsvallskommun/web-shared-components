module.exports = Card = () => ({

    ".avatar": {
        "@apply bg-primary-light text-primary rounded-full p-4": {},
    },

    ".card-list": {
        "@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10": {},
        "@apply text-center": {},
        //"@apply justify-center items-center": {},
    },
    ".card": {
        "@apply p-lg rounded shadow-lg bg-white": {},
        //padding: "2.4rem",

        "@apply border-t-4 border-primary": {},

        // Hover
        "@apply hover:shadow-xl hover:cursor-pointer": {},

        // "@apply bg-neutral-200 border border-neutral-100 text-neutral-900": {},
        // dark
        //"@apply dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300": {},
    },
});
