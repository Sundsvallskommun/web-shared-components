module.exports = Footer = (colors) => ({
    ".footer": {

        "&-innerwrapper": {
            "@apply bg-gray text-white py-12 px-2 sm:p-12": {},

            ...colors.reduce(
                (styles, color) => ({
                    ...styles,
                    [`&[data-color="${color}"]`]: {
                        [`@apply bg-${color}`]: {},
                    },
                }),
                {}
            ),
        },

        "&-content": {
            "@apply container md:flex items-center justify-center m-auto": {},
        },

        "&-bottomlinks": {
            "@apply bg-gray-middle text-black py-12 px-2 sm:p-12": {},

            ...colors.reduce(
                (styles, color) => ({
                    ...styles,
                    [`&[data-color="${color}"]`]: {
                        [`@apply bg-${color}`]: {},
                    },
                }),
                {}
            ),

            "&-container": {
                "@apply container flex items-start md:items-center justify-center m-auto md:space-x-10 flex-col md:flex-row": {},
            }
        }
        
    }
    
});