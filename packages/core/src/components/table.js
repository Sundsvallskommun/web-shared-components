module.exports = Table = () => ({
    ".table": {
        "@apply min-w-full border-collapse border-gray-stroke divide-gray-lighter table-auto": {},

        "&-item": {
            "@apply px-6 py-4 border border-gray-stroke whitespace-nowrap": {},

            "&:nth-child(odd)": {
                "@apply bg-gray-lighter": {},
            }
        }
    },
});
