module.exports = Menu = () => ({
    ".SideMenu": {
        width: "440px",
        border: "1px solid #939393",
        borderRadius: "2px",

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
        },

        
        ".MenuItem": {
            borderTop: "1px solid #939393",
            transition: "500ms ease",
            overflow: "hidden", 
            
            "&.active": {
                "> .wrapper": {
                    boxShadow: "inset 6px 0 0 0 #005595",
                    
                    "> div > a": {
                        fontWeight: 600,
                    }
                } 
            },

            ".items": {
                height: 0
            }, 

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
            },

            "&.open": {
                "> .wrapper": {
                    boxShadow: "inset 6px 0 0 0 #005595"
                },

                "> .items": {
                    height: "unset"
                }
            },

            "&.lvl-1, &.lvl-2, &.lvl-3, &.lvl-4, &.lvl-5, &.lvl-6, &.lvl-7, &.lvl-8, &.lvl-9, &.lvl-10": {
                minHeight: "56px",
            },



            "&.lvl-0": {
                backgroundColor: "#fff",
                "> .wrapper > div > a": {
                    paddingLeft: "1rem"
                }
            },

            "&.lvl-1": {
                backgroundColor: "#F9F9F9",
                "> .wrapper > div > a": {
                    paddingLeft: "2rem"
                }
            },

            "&.lvl-2": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "3rem"
                }
            },

            "&.lvl-3": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "4rem"
                }
            },

            "&.lvl-4": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "5rem"
                }
            },

            "&.lvl-5": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "6rem"
                }
            },

            "&.lvl-6": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "7rem"
                }
            },

            "&.lvl-7": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "8rem"
                }
            },
            
            "&.lvl-8": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "9rem"
                }
            },

            "&.lvl-9": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "10rem"
                }
            },

            "&.lvl-10": {
                backgroundColor: "#ECECEC",
                "> .wrapper > div > a": {
                    paddingLeft: "11rem"
                }
            }
        }
    },
});
  