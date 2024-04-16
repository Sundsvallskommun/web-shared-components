export const RichTextEditor = () => ({
  ".sk-rich-text-editor":
    {
      "@apply h-full": {},
      "@apply box-border": {},

      ".sk-divider-vertical": {
        "@apply my-4": {},
      },

      ".toolbar": {
        "@apply bg-background-200": {},
        "@apply rounded-t": {},
        "@apply border-1 border-divider": {},
        "@apply border-b-0": {},
        "@apply py-0": {},
        "@apply px-8": {},
        "@apply flex": {},
        ".ql-formats": {
          "@apply py-4": {},
          "@apply mt-4": {},
          "@apply mr-14": {},
          "@apply inline-block": {},
          "@apply align-middle": {},
          "@apply flex": {},
          button: {
            "@apply inline": {},
            "@apply text-dark-secondary": {},
            "@apply rounded-button-sm": {},
            "@apply h-32 w-32": {},
            "@apply flex justify-center items-center": {},
            svg: {
              "@apply w-20 h-20": {},
            },
            ".ql-fill": {
              fill: "currentColor",
            },
            ".ql-stroke": {
              stroke: "currentColor",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2px",
            },
            "&:hover": {},
            "&.ql-active:hover": {
              "@apply text-dark-primary": {},
              "@apply bg-tertiary-surface-hover": {},
              ".ql-fill": {
                fill: "currentColor",
              },
              ".ql-stroke": {
                stroke: "currentColor",
              },
            },
            "&.ql-active": {
              "@apply text-dark-primary": {},
              "@apply bg-inverted-vattjom-surface-primary": {},
              ".ql-fill": {
                fill: "currentColor",
              },
              ".ql-stroke": {
                stroke: "currentColor",
              },
            },
          },
        },
        "input.ql-image[type=file]": {
          "@apply hidden": {},
        },
      },

      ".ql-editor": {
        "@apply bg-background-content text-dark-primary": {},
        "@apply rounded-b-button": {},
        "@apply border-divider": {},
        "@apply p-14": {},
        "@apply text-left": {},
        "@apply break-words": {},
        "@apply overflow-y-auto": {},
        "@apply h-full": {},
        "@apply whitespace-pre-wrap": {},
        "@apply font-sans": {},

        "a": {
          "@apply underline": {},
        },
        "ul": {
          "@apply pl-28": {},
          "@apply list-disc": {},
          counterReset: "list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9",
        },
        "li:not(.ql-direction-rtl)::before": {
          "@apply text-right": {},
        },
        ".ql-editor ol li:before": {
          content: "counter(list-0, decimal) '. '",
        },
        "ol": {
          "@apply pl-28": {},
          "@apply list-decimal": {}
        },
        "ol li": {
          counterReset: "list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9",
          counterIncrement: "list-0",
        }
      },

      ".ql-clipboard": {
        left: "-1000000px",
        "@apply h-px": {},
        "@apply overflow-y-hidden": {},
        "@apply absolute": {},
        "@apply top-1/2": {},
      },

      ".ql-tooltip.ql-editing input[type=text]": {
        "@apply inline-block": {},
      },
      ".ql-tooltip input[type=text]": {
        "@apply hidden": {},
        "@apply border-1 border-divider": {},
        "@apply text-base": {},
      },

      ".ql-tooltip.ql-editing a.ql-preview": {
        display: "none"
      },

      ".ql-editor .ql-indent-1:not(.ql-direction-rtl)": {
        paddingLeft: "3em"
      },
      ".ql-editor .ql-indent-2:not(.ql-direction-rtl)": {
        paddingLeft: "6em"
      },
      ".ql-editor .ql-indent-3:not(.ql-direction-rtl)": {
        paddingLeft: "9em"
      },
      ".ql-editor .ql-indent-4:not(.ql-direction-rtl)": {
        paddingLeft: "12em"
      },
      ".ql-editor .ql-indent-5:not(.ql-direction-rtl)": {
        paddingLeft: "15em"
      },
      ".ql-editor .ql-indent-6:not(.ql-direction-rtl)": {
        paddingLeft: "18em"
      },
      ".ql-editor .ql-indent-7:not(.ql-direction-rtl)": {
        paddingLeft: "21em"
      },
      ".ql-editor .ql-indent-8:not(.ql-direction-rtl)": {
        paddingLeft: "24em"
      },
      ".ql-editor .ql-indent-9:not(.ql-direction-rtl)": {
        paddingLeft: "27em"
      },

      ".ql-direction.ql-active svg:first-child": {
        display: "none",
      },

      ".ql-editor .ql-direction-rtl": {
        direction: "right"
      },

      ".ql-direction.ql-active svg:last-child": {
        display: "inline"
      },

      ".ql-editor .ql-align-center": {
        "@apply text-center": {},
      },

      ".ql-editor .ql-align-right": {
        textAlign: "right"
      },

      ".ql-editor .ql-align-justify": {
        "@apply text-justify": {}
      },

      ".ql-tooltip": {
        "@apply bg-background-100": {},
        "@apply rounded": {},
        "@apply shadow-md": {},
        "@apply border-1 border-divider": {},
        "@apply p-5": {},
        "@apply font-sans": {},
        "@apply absolute": {},
        transform: "translate(220px, 50px);",

        ".ql-tooltip a": {
          "@apply cursor-pointer": {},
        },
        "a.ql-preview": {
          "@apply inline-block": {},
          "@apply overflow-x-hidden": {},
          "@apply text-ellipsis": {},
          "@apply align-top": {},
          "@apply max-w-52": {},
        },
        "a.ql-remove::before": {
          content: "'Ta bort'",
          "@apply ml-8": {}
        }
      },
      ".ql-tooltip[data-mode=link]::before": {
        "@apply mr-16": {},
        content: "'URL:'"
      },
      "a.ql-action::after": {
        "@apply border-r-1 border-divider": {},
        content: "'Ändra'",
        "@apply ml-16": {},
        "@apply pr-8": {},
      },
      ".ql-tooltip.ql-editing a.ql-action::after": {
        "@apply ml-16": {},
        content: "'Spara'"
      },
      ".ql-tooltip::before": {
        content: "'Besök URL: '",
        "@apply mr-8": {},
      },

      ".ql-formats:after": {
        content: "",
        display: "table",
        clear: "both"
      },

      ".quill": {
        ".ql-container": {
          "@apply border-1 border-divider": {},
          "@apply h-full": {},
        },

        ".ql-hidden": {
          "@apply hidden": {},
        },
        "pre.ql-container": {
          "@apply rounded-b-button": {},
        },
      },
    }
});