module.exports = Accordion = () => ({

    ".accordion": {
        //"@apply": {},
        //padding: "2.4rem",
        
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
            "@apply flex text-left text-lg m-4 inline-block": {},
            //"@apply focus-visible:shadow shadow-lg": {},
            "&:focus-visible, &:focus": {
                boxShadow: "0 0 0 0.4rem #fff!important",
                outline: "0",
                //"@apply border-4": {},
            }
        },

        "&-body": {
            "@apply transition-all h-0 hidden overflow-hidden": {},
            transitionProperty: "height",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150m",

            "&[aria-hidden=\"false\"], &[data-hidden=\"false\"]": {
                "@apply block h-auto p-lg": {},
            },
        },
    },
});
