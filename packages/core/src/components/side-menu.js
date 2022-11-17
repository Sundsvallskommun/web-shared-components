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
            
            "&.active": {
                "> .wrapper": {
                    boxShadow: "inset 6px 0 0 0 #005595",
                    
                    "> .MenuItem-link": {
                        fontWeight: 600,
                    }
                } 
            },

            ".wrapper": {
                minHeight: "64px",
                display: "flex",
                alignItems: "center",

                ".MenuItem-link": {
                    "@apply flex-grow text-left justify-start pr-[15px] h-full":{}
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

            "&.background-white": {
                "@apply bg-white": {},
            },

            "&.background-lightGrey": {
                "@apply bg-gray-lighter": {},
            },
            
            "&.background-darkerGrey": {
                "@apply bg-gray-middle": {},
            },



            "&.lvl-0": {
                "> .wrapper > .MenuItem-link": {
                    marginLeft: "1rem"
                }
            },

            "&.lvl-1": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "2rem"
                }
            },

            "&.lvl-2": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "3rem"
                }
            },

            "&.lvl-3": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "4rem"
                }
            },

            "&.lvl-4": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "5rem"
                }
            },

            "&.lvl-5": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "6rem"
                }
            },

            "&.lvl-6": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "7rem"
                }
            },

            "&.lvl-7": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "8rem"
                }
            },
            
            "&.lvl-8": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "9rem"
                }
            },

            "&.lvl-9": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "10rem"
                }
            },

            "&.lvl-10": {
                "> .wrapper > .MenuItem-link": {
                    paddingLeft: "11rem"
                }
            }
        }
    },
});
  