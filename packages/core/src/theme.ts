import withOpacity from './with-opacity';
import { colors } from './colors';
import { units } from './units';
import { RecursiveObject, screens } from '@sk-web-gui/theme';
import { Config } from 'tailwindcss/types/config';

const theme: RecursiveObject<Config['theme'] | string | string[]> = {
  extend: {
    containers: Object.keys(screens).reduce(
      (containers, screenKey, index) => ({ ...containers, [`screen-${screenKey}`]: Object.values(screens)[index] }),
      {}
    ),
    fontSize: {
      ...units.fontSizes,

      tiny: 'var(--sk-spacing-10)',
      xs: 'var(--sk-spacing-12)',
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
    backgroundPosition: {
      ...(Object.keys(units.spacing) as Array<keyof typeof units.spacing>).reduce(
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
      '50': `
      0 0 var(--sk-spacing-3) 0 rgba(10, 12, 15, 0.08),
      0 var(--sk-spacing-1) var(--sk-spacing-8) 0 rgba(10, 12, 15, 0.13)
      `,
      '100': `
        0 var(--sk-spacing-6) var(-sk-spacing-16) 0 rgba(13,13,14, 0.07),
        0 var var(--sk-spacing-12) 0 rgba(13,13,14, 0.15),
        0 var(--sk-spacing-0.75) var(--sk-spacing-2) 0 rgba(13,13,14, 0.085),
        0 var(--sk-spacing-0.25) var(--sk-spacing-0.75) 0 rgba(13,13,14, 0.0583)
      `,
      '200': `
        0 var(--sk-spacing-15) var(--sk-spacing-28) 0 rgba(13,13,14, 0.1),
        0 var(--sk-spacing-46) var(--sk-spacing-12) 0 rgba(13,13,14, 0.06),
        0 var(--sk-spacing-2) var(--sk-spacing-4) 0 rgba(13,13,14, 0.03),
        0 var(--sk-spacing-0.75) var(--sk-spacing-1) 0 rgba(13,13,14, 0.02)
      `,
      insetring: `0 0 0 0.25rem ${colors.ring} inset`,
    },
    ringColor: {
      DEFAULT: colors.ring,
      ...colors,
    },
    ringOffsetWidth: {
      DEFAULT: 'var(--sk-spacing-2)',
      ...units.spacing,
    },
    ringWidth: {
      DEFAULT: 'var(--sk-spacing-3)',
      0: '0px',
    },
    ringOpacity: {
      DEFAULT: '1',
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
      ...(Object.keys(units.spacing) as Array<keyof typeof units.spacing>).reduce(
        (smallerSpacings, spacingkey) => ({
          ...smallerSpacings,
          [`${spacingkey}-1`]: `calc(${units.spacing[spacingkey]} - var(--sk-spacing-1))`,
          [`${spacingkey}-2`]: `calc(${units.spacing[spacingkey]} - var(--sk-spacing-2))`,
          [`${spacingkey}+1`]: `calc(${units.spacing[spacingkey]} + var(--sk-spacing-1))`,
          [`${spacingkey}+2`]: `calc(${units.spacing[spacingkey]} + var(--sk-spacing-2))`,
        }),
        {}
      ),
      xs: units.spacing[4],
      sm: units.spacing[8],
      md: units.spacing[16],
      lg: units.spacing[24],
      xl: units.spacing[48],
    },
    maxWidth: {
      content: screens['desktop-max'],
    },
    lineHeight: {
      ...units.lineHeights,
      ...units.spacing,
      xs: 'var(-sk-spacing-16)',
      xl: units.lineHeights['h4'],
      '2xl': units.lineHeights['h3'],
      '3xl': units.lineHeights['h2'],
      '4xl': units.lineHeights['h1'],
      '5xl': units.lineHeights['display-3'],
    },
    opacity: {
      '15': '0.15',
    },
    borderWidth: {
      DEFAULT: 'var(--sk-spacing-2)',
      ...units.spacing,
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
      hide: '-1',
      none: '0',
      base: '1',
      docked: '10',
      dropdown: '1000',
      sticky: '1100',
      banner: '1200',
      overlay: '1300',
      modal: '1400',
      popover: '1500',
      skipLink: '1600',
      toast: '1700',
      tooltip: '1800',
    },
    keyframes: {
      'reset-overflow': {
        'from, to': {
          overflow: 'hidden',
        },
      },
      typingbounce: {
        '0%': { transform: 'translateY(0)' },
        '10%': { transform: 'translateY(-0.8rem)' },
        '20%, 100%': { transform: 'translateY(0rem)' },
      },
    },
    animation: {
      'reset-overflow': 'reset-overflow 180ms backwards',
      'typing-bounce-1': 'typingbounce 1.5s ease-in-out 600ms infinite',
      'typing-bounce-2': 'typingbounce 1.5s ease-in-out 800ms infinite',
      'typing-bounce-3': 'typingbounce 1.5s ease-in-out 1s infinite',
    },
  },
};
export { theme };
