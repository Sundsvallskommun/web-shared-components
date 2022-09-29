module.exports = Menu = () => ({
    ".Menu": {
        width: "440px",
        border: "1px solid #939393",
        borderRadius: "2px",
        overflow: "hidden",

        ".menu-header": {
            padding: "3rem 1rem 1.8rem", 
            backgroundColor: "#005595",
            padding: "2rem 1rem",

            "label": {
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff"
            },

            ".label-header": {
                display: "flex",
                alignItems: "center",


                "span": {
                    marginLeft: "auto"
                }
            },

            ".select-header": {
                paddingBottom: "6rem",

                "label": {
                    marginBottom: "10px",
                    display: "block"
                }
            }
        },

        
        ".MenuItem": {
            borderTop: "1px solid #939393",
            transition: "500ms ease",
            
            ".wrapper": {
                minHeight: "64px",
                display: "flex",
                alignItems: "center",
                
                "a, button": {
                    all: "unset",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    verticalAlign: "middle",
                    alignItems: "center", 
                    paddingRight: '15px'
                },

                "&.lvl-1, &.lvl-2, &.lvl-3, &.lvl-4, &.lvl-5, &.lvl-6, &.lvl-7, &.lvl-8, &.lvl-9, &.lvl-10": {
                    minHeight: "56px",
                },

                "&.open": {
                    boxShadow: "inset 6px 0 0 0 #005595",
                },

                "&.lvl-0": {
                    backgroundColor: "#fff",
                    "> a, > button": {
                        paddingLeft: "1rem"
                    }
                },

                "&.lvl-1": {
                    backgroundColor: "#F9F9F9",
                    "> a, > button": {
                        paddingLeft: "2rem"
                    }
                },

                "&.lvl-2": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "3rem"
                    }
                },

                "&.lvl-3": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "4rem"
                    }
                },

                "&.lvl-4": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "5rem"
                    }
                },

                "&.lvl-5": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "6rem"
                    }
                },

                "&.lvl-6": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "7rem"
                    }
                },

                "&.lvl-7": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "8rem"
                    }
                },
                
                "&.lvl-8": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "9rem"
                    }
                },

                "&.lvl-9": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "10rem"
                    }
                },

                "&.lvl-10": {
                    backgroundColor: "#ECECEC",
                    "> a, > button": {
                        paddingLeft: "11rem"
                    }
                },

                "label": {
                    
                },
                
                ".expand": {
                    width: "50px",
                    height: "64px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "auto",
                    padding: 0,
                    
                    "span": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderLeft: "1px solid",
                        height: '24px',
                        width: '45px'
                    }
                }
            }
        }
    },
});
  