module.exports = Accordion = () => ({
    ".accordion": {
        "@apply border border-gray-stroke": {},

        "&-header": {
            "@apply flex flex-col text-left bg-primary text-white": {},

            "[aria-expanded=\"true\"] &": {
                "@apply bg-hover": {}
            }
        },

        "&-is-open &-header": {
            "@apply bg-hover": {}
        },

        "&-toggle": {
            "@apply flex inline-block text-lg leading-lg text-left text-lg mx-lg my-md": {},
            fontWeight: "bold",
            //"@apply focus-visible:shadow shadow-lg": {},
            "&:focus-visible": {
                boxShadow: "0 0 0 0.4rem #fff!important",
                outline: "0",
                //"@apply border-4": {},
            }
        },

        "&-body": {
            "@apply h-0 overflow-hidden m-lg": {},
            transitionProperty: "visibility, height, padding, margin",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "180ms",

            "&[aria-hidden=\"true\"], &[data-hidden=\"true\"]": {
                "@apply my-0 invisible": {},
            },

            "&[aria-hidden=\"false\"], &[data-hidden=\"false\"]": {
                "@apply block h-auto visible": {},
            },
        },
    },
});
