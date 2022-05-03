module.exports = ZebraTable = () => ({
    ".zebratable": {
        "@apply w-full text-left table-auto bg-white": {},


        "&-thead": {
            "@apply bg-white": {},

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

        "&-icon": {
            "&-sort": {
                "@apply ml-2 text-black transform rotate-90": {},
    
                "&[data-sortmodeascending='false']": {
                    "@apply -rotate-90": {},
                },
            },

            "&-more": {
                "@apply pl-sm text-gray-300": {},
            },
        },

        "&-sortbutton": {
            "@apply flex items-center": {},
        },

        ".material-icons-outlined": {
            fontSize: "1.25em",
        },

        "&-tbody": {
            "@apply bg-gray-100 lg:bg-white": {},

            "&-tr": {
                "@apply bg-white lg:even:bg-white lg:odd:bg-gray-100 px-lg py-lg my-lg first-of-type:mt-0 block shadow-md lg:shadow-none lg:table-row lg:my-0 lg:py-0 lg:px-lg": {},
            },

            "&-td": {
                "@apply empty:hidden py-sm lg:first-of-type:w-1/3 px-sm lg:px-0 first-of-type:pl-sm lg:first-of-type:pl-lg last-of-type:px-0 lg:last-of-type:pr-lg last-of-type:flex last-of-type:justify-center lg:last-of-type:justify-end block lg:table-cell even:bg-white odd:bg-gray-100 last-of-type:bg-transparent lg:even:bg-transparent lg:odd:bg-transparent": {},
            },
        },

        "&-paginationwrapper": {
            "@apply px-lg my-lg w-full text-lg flex justify-center lg:justify-start": {},
        },
    },
});