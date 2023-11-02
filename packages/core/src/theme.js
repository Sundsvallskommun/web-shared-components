import withOpacity from './with-opacity';
import colors from './colors';
import units from './units';
import { screens } from '@sk-web-gui/theme';

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
  screens,
  borderRadius: {
    ...units.radius,
    base: 'var(--sk-spacing-0)',
  },
  ringColor: {
    DEFAULT: colors.ring,
    ...colors,
  },
  extend: {
    boxShadow: {
      100: [
        '0 0.6rem 1.6rem 0 rgba(13,13,14, 0.7)',
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
