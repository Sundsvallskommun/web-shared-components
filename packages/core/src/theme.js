const { colors } = require('@sk-web-gui/theme');
const withOpacity = require('./with-opacity');

module.exports = {
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
};
