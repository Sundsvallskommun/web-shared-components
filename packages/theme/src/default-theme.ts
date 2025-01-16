import { colors } from './colors';
import { fonts } from './fonts';
import { ColorScheme, GuiTheme } from './types';
import { fontSizes, lineHeights, radius, screens, spacing } from './units';

// light theme
export const lightScheme: ColorScheme = {
  id: 'light',
  type: 'light',
  colors: {
    ...colors.lightmode,
    bg: {
      base: colors.lightmode.background.content,
      fill: colors.lightmode.background[200],
    },
    text: {
      foreground: colors.lightmode.dark.primary,
      muted: colors.lightmode.dark.secondary,
    },
  },
};

// dark theme
export const darkScheme: ColorScheme = {
  id: 'dark',
  type: 'dark',
  colors: {
    ...colors.darkmode,
    bg: {
      base: colors.darkmode.background.content,
      fill: colors.darkmode.background[200],
    },
    text: {
      foreground: colors.darkmode.dark.primary,
      muted: colors.darkmode.dark.secondary,
    },
  },
};

export const defaultTheme: GuiTheme = {
  cursor: 'pointer',
  rounded: '0.375rem', // md
  colorSchemes: {
    light: lightScheme,
    dark: darkScheme,
  },
  config: {},
  fontSize: {
    ...fontSizes,
  },
  fontFamily: { ...fonts },
  lineHeight: {
    ...lineHeights,
  },
  spacing,
  screens,
  radius,
};
