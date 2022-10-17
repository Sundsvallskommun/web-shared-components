module.exports = SearchBar = () => ({
    ".SearchBar": {
        width: "100%",
        position: "relative",
        border: "1px solid #939393",
        borderRadius: 200,
        overflow: "hidden",
        height: 44,
        
        "input": {
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            flexGrow: 1,
            width: "100%",
            height: "inherit",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 20,
            color: "#4B4B4B",
            padding: "0px 44px 0px 16px"
        },
        
        ".search-icon": {
            border: "none",
            display: "flex",
            height: 42,
            width: 44,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            right: 0,

            "svg.small": {
                height: 13,
                width: 13
            }
        }

    }
})
  