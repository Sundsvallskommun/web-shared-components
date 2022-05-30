module.exports = ZebraTable = () => ({
    ".zebratable": {
        "@apply w-full text-left table-auto": {},


        "&-thead": {

            "&-tr": {
                "@apply text-sm hidden lg:table-row": {},
            },

            "&-th": {
                "@apply py-sm first-of-type:pl-lg": {},

                "&[data-isColumnSortable='true']": {
                    "@apply py-sm cursor-pointer": {},
                },
            },
        },

        "&-sortbutton": {
            "@apply flex items-center": {},

            "&-icon": {
                "@apply inline-flex pl-sm": {},
    
    
                "&-sort": {
                    "@apply text-black transform": {},
        
                    "&[data-sortmodeascending='true']": {
                        "@apply -rotate-90": {},
                    },
                    
                    "&[data-sortmodeascending='false']": {
                        "@apply rotate-90": {},
                    },
                },
    
                "&-more": {
                    "@apply text-gray-300": {},
                },
            },
        },

        ".material-icons-outlined": {
            fontSize: "1.25em",
        },

        "&-tbody": {
            "@apply lg:bg-white": {},

            "&-tr": {
                "@apply transition-all bg-white lg:even:bg-white lg:odd:bg-gray-100 px-md py-md md:px-lg md:py-lg my-lg first-of-type:mt-0 block shadow-md lg:shadow-none lg:table-row lg:my-0 lg:py-0 lg:px-lg": {},

                "&.highlighted": {
                    "@apply lg:border lg:border-hover": {},
                },
            },

            "&-td": {
                "@apply empty:hidden py-4 px-sm lg:px-0 first-of-type:pl-sm lg:first-of-type:pl-lg last-of-type:px-0 lg:last-of-type:pr-lg last-of-type:text-right block lg:table-cell even:bg-white odd:bg-gray-100 last-of-type:bg-transparent lg:even:bg-transparent lg:odd:bg-transparent": {},
            },
        },

        "&-paginationwrapper": {
            "@apply px-lg my-lg w-full text-lg flex justify-center lg:justify-start": {},
        },
    },
});