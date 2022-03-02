const plugin = require("tailwindcss/plugin");

const colors = require("./colors");
const withOpacity = require("./with-opacity");
// components
const Alert = require("./components/alert");
const Breadcrumb = require("./components/breadcrumb");
const ButtonGroup = require("./components/button-group");

const Checkbox = require("./components/checkbox");
const Dot = require("./components/dot");
const Forms = require("./components/forms");
const IconButton = require("./components/icon-button");
const Icon = require("./components/icon");
const Link = require("./components/link");
const Message = require("./components/message");
const Notification = require("./components/notification");
const Radio = require("./components/radio");
const Switch = require("./components/switch");

const Button = require("./components/button");
const Accordion = require("./components/accordion");
const Card = require('./components/card');
const Table = require('./components/table');

const Modal = require('./components/modal');
const CookieConsent = require('./components/cookie-consent');

const components = [
  Alert,
  Breadcrumb,
  ButtonGroup,
  Button,
  Checkbox,
  Dot,
  Forms,
  IconButton,
  Icon,
  Link,
  Message,
  Notification,
  Radio,
  Switch,

  Table,
  CookieConsent,
  Modal,

  Accordion,
  Card,
];

const defaultColors = ["primary", "secondary"];

module.exports = plugin.withOptions(
  function(options = { colors: [], cssBase: true }) {
    return function({
      addComponents,
      addVariant,
      addBase,
      variants,
      e,
      theme,
      addUtilities,
    }) {
      const optionColors = [...defaultColors, ...(options.colors || [])];

      active({ addVariant, variants, e, theme, addUtilities });
      selected({ addVariant, variants, e, theme, addUtilities });
      disabled({ addVariant, variants, e, theme, addUtilities });

      addComponents(
        components.map((component) => component(optionColors, theme)),
        {
          respectPrefix: false,
        }
      );

      if (options.cssBase) {
        addBase({
          html: {
            "@apply text-foreground antialiased bg-base": {},
            fontSize: "62.5%",
            lineHeight: "1.5",
            textRendering: "optimizeLegibility",
            textSizeAdjust: "100%",
            touchAction: "manipulation",
          },
          body: {
            "@apply text-base leading-base": {},
            position: "relative",
            minHeight: "100%",
            fontFeatureSettings: "'kern'",
          },
          "h1,h2,h3,h4,h5,h6": {
            "@apply font-bold": {},
          },
          h1: { "@apply text-5xl leading-5xl": {} },
          h2: { "@apply text-4xl leading-4xl": {} },
          h3: { "@apply text-3xl leading-3xl": {} },
          h4: { "@apply text-2xl leading-2xl": {} },
          h5: { "@apply text-xl leading-xl": {} },
          h6: { "@apply text-lg leading-lg": {} },
          p: { "@apply my-4": {} },
        });
      }
    };
  },
  function() {
    return {
      theme: {
        fontSize: {
          'tiny': '1rem',
          'xs': '1.2rem',
          'sm': '1.4rem',
          'base': '1.6rem',
          'lg': '1.8rem',
          'xl': '2.0rem',
          '2xl': '2.4rem',
          '3xl': '3.2rem',
          '4xl': '4.0rem',
          '5xl': '5.2rem',
        },
        extend: {
          colors: {
            ...colors,
            gray: {
              DEFAULT: "#4b4b4b",
              stroke: "#939393",
              light: "#F4F4F4",
              lighter: "#F9F9F9",
            },
            hover: {
              DEFAULT: "#2B76B0",
            },
          },
          cursor: {
            base: "var(--vc-cursor)",
          },
          spacing: {
            sm: '8px',
            md: '16px',
            lg: '24px',
            xl: '48px',
          },
          lineHeight: {
            'tiny': '1.4rem',
            'xs': '1.6rem',
            'sm': '2rem',
            'base': '2.4rem',
            'lg': '2.4rem',
            'xl': '3.2rem',
            '2xl': '3.2rem',
            '3xl': '4rem',
            '4xl': '4.8rem',
            '5xl': '5.8rem',
          },
          opacity: {
            15: "0.15",
          },
          backgroundColor: {
            base: withOpacity("--vc-colors-bg-base"),
            fill: withOpacity("--vc-colors-bg-fill"),
          },
          textColor: {
            foreground: withOpacity("--vc-colors-text-foreground"),
            muted: withOpacity("--vc-colors-text-muted"),
          },
          borderRadius: {
            base: "var(--vc-rounded)",
          },
          zIndex: {
            hide: -1,
            none: 0,
            base: 1,
            docked: 10,
            dropdown: 1000,
            sticky: 1100,
            banner: 1200,
            overlay: 1300,
            modal: 1400,
            popover: 1500,
            skipLink: 1600,
            toast: 1700,
            tooltip: 1800,
          },
        },
      },
      variants: {
        extend: {
          boxShadow: ["disabled"],
          cursor: ["disabled"],
          opacity: ["active", "disabled"],
          textColor: ["active", "disabled:hover"],
          textDecoration: ["disabled"],
          backgroundColor: ["disabled"],
          borderColor: ["disabled"],
        },
      },
    };
  }
);

function active({ addVariant, e }) {
  addVariant("active", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`active${separator}${className}`)}:active, .${e(
        `active${separator}${className}`
      )}[data-active=true]`;
    });
  });
}

function selected({ addVariant, e }) {
  addVariant("selected", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`selected${separator}${className}`)}[aria-selected=true]`;
    });
  });
}

function disabled({ addVariant, e }) {
  addVariant("disabled", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`disabled${separator}${className}`)}[aria-disabled=true]`;
    });
  });
  addVariant("disabled:hover", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `disabled:hover${separator}${className}`
      )}[aria-disabled=true]`;
    });
  });
}