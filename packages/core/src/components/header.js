module.exports = Header = (colors) => ({
    ".header": {
        "@apply lg:border-t-8 lg:border-primary lg:static lg:w-auto lg:h-auto lg:min-h-0": {},

        ...colors.reduce(
            (styles, color) => ({
                ...styles,
                [`&[data-color="${color}"]`]: {
                    [`@apply border-${color}`]: {},
                },
            }),
            {}
        ),

        [`&[data-color="none"]`]: {
            [`@apply border-none`]: {},
        },

        "&-innerwrapper": {
            "@apply flex lg:h-[112px] shadow-lg relative mx-auto px-7 pt-[22px] pb-[8px] z-10": {},
        },

        "&-container": {
            "@apply w-full m-auto flex items-center justify-between flex-wrap md:px-lg max-w-[140rem]": {},
        },

        "&-content": {
            "@apply flex items-center flex-shrink-0 text-black mr-6": {},
        },

        "&-usermenu": {
            "@apply block flex-shrink lg:flex lg:items-center lg:w-auto": {},

            "&-content": {
                "@apply flex flex-grow lg:flex justify-end items-center lg:w-auto": {},
            },
        },

    }

});