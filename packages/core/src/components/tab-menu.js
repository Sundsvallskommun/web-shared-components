module.exports = TabMenu = () => ({
    ".TabMenu": {
        
        ".tab-wrapper": {
            display: "flex",
            flexDirection: "row"
        },

        ".TabItem": {
            all: 'unset',
            height: 65,
            display: "flex",
            padding: "0 1rem",
            marginRight: "5rem",
            alignItems: "center",
            position: "relative",

            "&.active::after": {
                content: '""',
                display: "block",
                position: "absolute",
                width: "100%",
                height: 6,
                background: "#005595",
                top: "100%",
                left: 0,
            }
        },

        ".underline": {
            width: "100%",
            height: 6,
            background: "#F4F4F4"
        }
    },
});
  