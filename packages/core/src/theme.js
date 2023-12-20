const withOpacity = require('./with-opacity');
const colors = require('./colors');
const units = require('./units');
const { screens } = require('@sk-web-gui/theme');

module.exports = {
  fontSize: {
    ...units.fontSizes,
    tiny: '1rem',
    xs: '1.2rem',
    xl: units.fontSizes['h4'],
    '2xl': units.fontSizes['h3'],
    '3xl': units.fontSizes['h2'],
    '4xl': units.fontSizes['h1'],
    '5xl': units.fontSizes['h3'],
  },
  fontFamily: {
    DEFAULT: ['Arial', 'Helvetica', 'sans-serif'],
    sans: ['Arial', 'Helvetica', 'sans-serif'],
    header: ['Raleway', 'Arial', 'Helvetica', 'sans-serif'],
    display: ['Raleway', 'Arial', 'Helvetica', 'sans-serif'],
  },
  screens,
  borderRadius: {
    ...units.radius,
    base: 'var(--sk-spacing-0)',
  },

  extend: {
    backgroundPosition: {
      ...Object.keys(units.spacing).reduce(
        (positions, spaceKey) => ({
          ...positions,
          [`top-${spaceKey}`]: `center top ${units.spacing[spaceKey]}`,
          [`right-${spaceKey}`]: `center right ${units.spacing[spaceKey]}`,
          [`bottom-${spaceKey}`]: `center bottom ${units.spacing[spaceKey]}`,
          [`left-${spaceKey}`]: `center left ${units.spacing[spaceKey]}`,
        }),
        {}
      ),
    },
    boxShadow: {
      100: [
        '0 0.6rem 1.6rem 0 rgba(13,13,14, 0.07)',
        '0 0.181rem 1.2rem 0 rgba(13,13,14, 0.15)',
        '0 0.075rem 0.2rem 0 rgba(13,13,14, 0.085)',
        '0 0.027rem 0.072rem 0 rgba(13,13,14, 0.0583)',
      ],
      200: [
        '0 1.5rem 2.7rem 0 rgba(13,13,14, 0.1)',
        '0 0.452rem 1.2rem 0 rgba(13,13,14, 0.06)',
        '0 0.188rem 0.338rem 0 rgba(13,13,14, 0.03)',
        '0 0.068rem 0.122rem 0 rgba(13,13,14, 0.02)',
      ],
    },
    ringColor: {
      DEFAULT: colors.ring,
      ...colors,
    },
    ringOffsetWidth: {
      DEFAULT: '0.2rem',
    },
    ringWidth: {
      DEFAULT: '0.3rem',
      0: '0px',
    },
    ringOpacity: {
      DEFAULT: 1,
    },
    colors: {
      ...colors,
      current: 'currentColor',
      gray: {
        DEFAULT: colors.primitives.gray[600],
        stroke: colors.divider,
        middle: colors.primitives.gray[600],
        light: colors.primitives.gray[300],
        lighter: colors.primitives.gray[200],
        ...colors.primitives.gray,
      },
      hover: colors.primitives.gray[600],
      background: {
        ...colors.background,
        one: colors.background[100],
        two: colors.background[200],
      },
    },
    cursor: {
      base: 'var(--tw-cursor)',
    },
    spacing: {
      ...units.spacing,
      xs: units.spacing[4],
      sm: units.spacing[8],
      md: units.spacing[16],
      lg: units.spacing[24],
      xl: units.spacing[48],
    },
    maxWidth: {
      content: screens['desktop-max'],
    },
    borderRadius: {
      ...units.radius,
      base: 'var(--sk-spacing-0)',
    },
    lineHeight: {
      ...units.lineHeights,
      xs: '1.6rem',
      xl: units.lineHeights['h4'],
      '2xl': units.lineHeights['h3'],
      '3xl': units.lineHeights['h2'],
      '4xl': units.lineHeights['h1'],
      '5xl': units.lineHeights['display-3'],
    },
    opacity: {
      15: '0.15',
    },
    borderWidth: {
      DEFAULT: '0.2rem',
      1: '0.1rem',
      2: '0.2rem',
    },
    backgroundColor: {
      base: withOpacity('--sk-colors-primary-surface'),
      fill: withOpacity('--sk-colors-bg-fill'),
    },
    textColor: {
      foreground: withOpacity('--sk-colors-primary-DEFAULT'),
      muted: withOpacity('--sk-colors-xt-muted'),
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
};
