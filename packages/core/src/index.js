const plugin = require('tailwindcss/plugin');

// const colors = require("/colors");
const { colors } = require('@sk-web-gui/theme');
const withOpacity = require('./with-opacity');
// components
const Alert = require('./components/alert');
const AlertBanner = require('./components/alert-banner');
const Badge = require('./components/badge');
const Breadcrumb = require('./components/breadcrumb');
const ButtonGroup = require('./components/button-group');

const Checkbox = require('./components/checkbox');
const ContextMenu = require('./components/context-menu');
const Dialog = require('./components/dialog');
const Dot = require('./components/dot');
const Forms = require('./components/forms');
const Calendar = require('./components/calendar');
const IconButton = require('./components/icon-button');
const Icon = require('./components/icon');
const Link = require('./components/link');
const Message = require('./components/message');
const Notification = require('./components/notification');
const Radio = require('./components/radio');
const Switch = require('./components/switch');

const Button = require('./components/button');
const Accordion = require('./components/accordion');
const Card = require('./components/card');
const Table = require('./components/table');
const ZebraTable = require('./components/zebratable');

const Modal = require('./components/modal');
const CookieConsent = require('./components/cookie-consent');
const Divider = require('./components/divider');

const SideMenu = require('./components/side-menu');
const TabMenu = require('./components/tab-menu');
const UserMenu = require('./components/user-menu');

const DropdownFilter = require('./components/dropdown-filter');

const Tag = require('./components/tag');
const Pagination = require('./components/pagination');
const Footer = require('./components/footer');
const Header = require('./components/header');

const SearchBar = require('./components/search-bar');

const components = [
  Alert,
  AlertBanner,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Button,
  Checkbox,
  ContextMenu,
  Dialog,
  Dot,
  Forms,
  Calendar,
  IconButton,
  Icon,
  Link,
  Message,
  Notification,
  Radio,
  Switch,

  Table,
  ZebraTable,
  CookieConsent,
  Modal,

  Accordion,
  Card,
  Divider,

  SideMenu,
  TabMenu,
  UserMenu,

  DropdownFilter,

  SearchBar,

  Tag,
  Pagination,
  Footer,
  Header,
];

const defaultColors = ['primary', 'secondary'];

module.exports = plugin.withOptions(
  function (options = { colors: [], cssBase: true }) {
    return function ({ addComponents, addVariant, addBase, variants, e, theme, addUtilities }) {
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
            '@apply text-foreground antialiased bg-base': {},
            fontSize: '62.5%',
            lineHeight: '1.5',
            textRendering: 'optimizeLegibility',
            textSizeAdjust: '100%',
            touchAction: 'manipulation',
          },
          body: {
            '@apply text-base leading-base': {},
            position: 'relative',
            minHeight: '100%',
            fontFeatureSettings: "'kern'",
          },
          'h1,h2,h3,h4,h5,h6': {
            '@apply font-bold': {},
          },
          small: {
            fontSize: '1.4rem',
          },
          h1: { '@apply text-3xl leading-3xl': {} },
          h2: { '@apply text-2xl leading-2xl': {} },
          h3: { '@apply text-xl leading-xl': {} },
          h4: { '@apply text-lg leading-lg': {} },
          h5: { '@apply text-base leading-base': {} },
          h6: { '@apply text-sm leading-sm': {} },
          p: { '@apply my-4': {} },

          '.text-content': {
            '@apply max-w-[80rem]': {},

            h1: {
              '@apply mb-md': {},

              '+ p': {
                '@apply mb-[40px] mt-0': {},
              },
            },
            h2: { '@apply mt-lg': {} },
            h3: { '@apply mt-lg': {} },
            h4: { '@apply mt-lg': {} },
            h5: { '@apply mt-lg': {} },
            h6: { '@apply mt-lg': {} },
            p: { '@apply mt-sm leading-[1.5]': {} },
          },
        });
      }
    };
  },
  function () {
    return {
      theme: {
        fontSize: {
          tiny: '1rem',
          xs: '1.2rem',
          sm: '1.4rem',
          base: '1.6rem',
          lg: '1.8rem',
          xl: '2.0rem',
          '2xl': '2.4rem',
          '3xl': '3.2rem',
          '4xl': '4.0rem',
          '5xl': '5.2rem',
        },
        extend: {
          colors: {
            ...colors,
            current: 'currentColor',
          },
          cursor: {
            base: 'var(--vc-cursor)',
          },
          spacing: {
            xs: '4px',
            sm: '8px',
            md: '16px',
            lg: '24px',
            xl: '48px',
          },
          lineHeight: {
            tiny: '1.4rem',
            xs: '1.6rem',
            sm: '2rem',
            base: '2.4rem',
            lg: '2.4rem',
            xl: '3.2rem',
            '2xl': '3.2rem',
            '3xl': '4rem',
            '4xl': '4.8rem',
            '5xl': '5.8rem',
          },
          opacity: {
            15: '0.15',
          },
          backgroundColor: {
            base: withOpacity('--vc-colors-bg-base'),
            fill: withOpacity('--vc-colors-bg-fill'),
          },
          textColor: {
            foreground: withOpacity('--vc-colors-text-foreground'),
            muted: withOpacity('--vc-colors-text-muted'),
          },
          borderRadius: {
            base: 'var(--vc-rounded)',
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
          keyframes: {
            'reset-overflow': {
              'from, to': {
                overflow: 'hidden',
              },
            },
          },
          animation: {
            'reset-overflow': 'reset-overflow 180ms backwards',
          },
        },
      },
      variants: {
        extend: {
          boxShadow: ['disabled'],
          cursor: ['disabled'],
          opacity: ['active', 'disabled'],
          textColor: ['active', 'disabled:hover'],
          textDecoration: ['disabled'],
          backgroundColor: ['disabled'],
          borderColor: ['disabled'],
        },
      },
    };
  }
);

function active({ addVariant, e }) {
  addVariant('active', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`active${separator}${className}`)}:active, .${e(
        `active${separator}${className}`
      )}[data-active=true]`;
    });
  });
}

function selected({ addVariant, e }) {
  addVariant('selected', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`selected${separator}${className}`)}[aria-selected=true]`;
    });
  });
}

function disabled({ addVariant, e }) {
  addVariant('disabled', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`disabled${separator}${className}`)}[aria-disabled=true]`;
    });
  });
  addVariant('disabled:hover', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`disabled:hover${separator}${className}`)}[aria-disabled=true]`;
    });
  });
}
