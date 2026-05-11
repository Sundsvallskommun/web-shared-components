// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js

import { toRGB } from '@sk-web-gui/utils';
import { BrandTheme, Palette } from './types';

// /* Base colors */
export const primitives = {
  // NEUTRALS
  gray: {
    lightest: `rgb(${toRGB('#FFFFFF')?.join(',')})`,
    50: `rgb(${toRGB('#FAFAFA')?.join(',')})`,
    100: `rgb(${toRGB('#F0F0F0')?.join(',')})`,
    200: `rgb(${toRGB('#E5E5E5')?.join(',')})`,
    300: `rgb(${toRGB('#B7B7BA')?.join(',')})`,
    400: `rgb(${toRGB('#A2A2A7')?.join(',')})`,
    500: `rgb(${toRGB('#68686D')?.join(',')})`,
    600: `rgb(${toRGB('#51515C')?.join(',')})`,
    700: `rgb(${toRGB('#444450')?.join(',')})`,
    800: `rgb(${toRGB('#2F2F3C')?.join(',')})`,
    900: `rgb(${toRGB('#1F1F25')?.join(',')})`,
    darkest: `rgb(${toRGB('#1C1C28')?.join(',')})`,
  },

  overlay: {
    darken: {
      1: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.04)`,
      2: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.12)`,
      3: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.16)`,
      4: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.18)`,
      5: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.3)`,
      6: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.5)`,
      7: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.64)`,
      8: `rgba(${toRGB('#1E2126')?.join(',')}, 0.8)`,
      9: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.88)`,
      10: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.95)`,
    },
    lighten: {
      1: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.05)`,
      2: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.08)`,
      3: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.10)`,
      4: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.2)`,
      5: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.3)`,
      6: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.5)`,
      7: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.64)`,
      8: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.8)`,
      9: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.88)`,
      10: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.95)`,
    },
  },

  //COLORS
  blue: {
    50: `rgb(${toRGB('#F0F5F9')?.join(',')})`,
    100: `rgb(${toRGB('#E1ECF4')?.join(',')})`,
    200: `rgb(${toRGB('#CFE0EC')?.join(',')})`,
    300: `rgb(${toRGB('#B5CFE3')?.join(',')})`,
    400: `rgb(${toRGB('#73ACD6')?.join(',')})`,
    500: `rgb(${toRGB('#4293D1')?.join(',')})`,
    600: `rgb(${toRGB('#1472B8')?.join(',')})`,
    700: `rgb(${toRGB('#005595')?.join(',')})`,
    800: `rgb(${toRGB('#004C85')?.join(',')})`,
    900: `rgb(${toRGB('#004070')?.join(',')})`,
  },
  green: {
    50: `rgb(${toRGB('#F1F9F5')?.join(',')})`,
    100: `rgb(${toRGB('#E1EFE9')?.join(',')})`,
    200: `rgb(${toRGB('#C9E4D7')?.join(',')})`,
    300: `rgb(${toRGB('#AAD4BF')?.join(',')})`,
    400: `rgb(${toRGB('#65B88F')?.join(',')})`,
    500: `rgb(${toRGB('#16A25E')?.join(',')})`,
    600: `rgb(${toRGB('#12874E')?.join(',')})`,
    700: `rgb(${toRGB('#00733B')?.join(',')})`,
    800: `rgb(${toRGB('#00592D')?.join(',')})`,
    900: `rgb(${toRGB('#004222')?.join(',')})`,
  },
  purple: {
    50: `rgb(${toRGB('#F6F1F9')?.join(',')})`,
    100: `rgb(${toRGB('#EFE8F3')?.join(',')})`,
    200: `rgb(${toRGB('#E4D8E9')?.join(',')})`,
    300: `rgb(${toRGB('#D6C4DE')?.join(',')})`,
    400: `rgb(${toRGB('#BA90CE')?.join(',')})`,
    500: `rgb(${toRGB('#8C42AE')?.join(',')})`,
    600: `rgb(${toRGB('#722796')?.join(',')})`,
    700: `rgb(${toRGB('#5B1F78')?.join(',')})`,
    800: `rgb(${toRGB('#4D1A65')?.join(',')})`,
    900: `rgb(${toRGB('#2E103D')?.join(',')})`,
  },
  pink: {
    50: `rgb(${toRGB('#FAEFF8')?.join(',')})`,
    100: `rgb(${toRGB('#F6E4F2')?.join(',')})`,
    200: `rgb(${toRGB('#F1D5EA')?.join(',')})`,
    300: `rgb(${toRGB('#E9BEE0')?.join(',')})`,
    400: `rgb(${toRGB('#DF83CD')?.join(',')})`,
    500: `rgb(${toRGB('#D558AE')?.join(',')})`,
    600: `rgb(${toRGB('#BF1D8C')?.join(',')})`,
    700: `rgb(${toRGB('#A90074')?.join(',')})`,
    800: `rgb(${toRGB('#8A005E')?.join(',')})`,
    900: `rgb(${toRGB('#6B004A')?.join(',')})`,
  },
  orange: {
    50: `rgb(${toRGB('#FFF5EB')?.join(',')})`,
    100: `rgb(${toRGB('#FFE7D1')?.join(',')})`,
    200: `rgb(${toRGB('#FFD3A8')?.join(',')})`,
    300: `rgb(${toRGB('#FFC68F')?.join(',')})`,
    400: `rgb(${toRGB('#FFA34D')?.join(',')})`,
    500: `rgb(${toRGB('#FF840F')?.join(',')})`,
    600: `rgb(${toRGB('#DB6900')?.join(',')})`,
    700: `rgb(${toRGB('#B94E18')?.join(',')})`,
    800: `rgb(${toRGB('#8C3B12')?.join(',')})`,
    900: `rgb(${toRGB('#5C2100')?.join(',')})`,
  },
  red: {
    50: `rgb(${toRGB('#FFEBEB')?.join(',')})`,
    100: `rgb(${toRGB('#FEE2E2')?.join(',')})`,
    200: `rgb(${toRGB('#FCD4D4')?.join(',')})`,
    300: `rgb(${toRGB('#FBC1C1')?.join(',')})`,
    400: `rgb(${toRGB('#F78282')?.join(',')})`,
    500: `rgb(${toRGB('#F44E4E')?.join(',')})`,
    600: `rgb(${toRGB('#D62E2E')?.join(',')})`,
    700: `rgb(${toRGB('#B92424')?.join(',')})`,
    800: `rgb(${toRGB('#971A1A')?.join(',')})`,
    900: `rgb(${toRGB('#6D0303')?.join(',')})`,
  },
  ring: `rgb(${toRGB('#0C8CED')?.join(',')})`,
  shadow: `${toRGB('#0D0D0E')?.join(',')}`,
};

const lightmode = {
  body: primitives.gray[900],
  black: primitives.gray[900],
  white: primitives.gray.lightest,
  ring: primitives.ring,
  primary: {
    DEFAULT: primitives.gray[900],
    active: primitives.gray[900],
    surface: {
      DEFAULT: primitives.overlay.darken[10],
      hover: primitives.overlay.darken[9],
      disabled: primitives.overlay.darken[3],
    },
    ...primitives.gray,
  },
  secondary: {
    DEFAULT: primitives.gray[700],
    active: primitives.gray[700],
    outline: {
      DEFAULT: primitives.overlay.darken[5],
      hover: primitives.overlay.darken[7],
    },
    surface: {
      DEFAULT: 'transparent',
      hover: primitives.overlay.lighten[3],
      disabled: primitives.overlay.darken[2],
    },
    ...primitives.gray,
  },
  tertiary: {
    surface: {
      DEFAULT: primitives.overlay.darken[2],
      hover: primitives.overlay.darken[3],
      disabled: primitives.overlay.darken[2],
    },
  },
  dark: {
    DEFAULT: primitives.gray[900],
    primary: primitives.gray[900],
    secondary: primitives.gray[700],
    disabled: primitives.overlay.darken[7],
    placeholder: primitives.overlay.darken[7],
    ghost: primitives.overlay.darken[4],
  },
  light: {
    DEFAULT: primitives.gray.lightest,
    primary: primitives.gray.lightest,
    secondary: primitives.overlay.lighten[9],
    disabled: primitives.overlay.lighten[6],
    placeholder: primitives.overlay.lighten[6],
    ghost: primitives.overlay.lighten[4],
  },
  divider: primitives.overlay.darken[5],
  background: {
    DEFAULT: primitives.gray.lightest,
    content: primitives.gray.lightest,
    100: primitives.gray[50],
    200: primitives.gray[100],
    'color-mixin': {
      1: primitives.overlay.darken[1],
      2: primitives.overlay.darken[3],
    },
  },
  vattjom: {
    background: {
      100: primitives.blue[50],
      200: primitives.blue[100],
      300: primitives.blue[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.blue[700],
        hover: primitives.blue[900],
      },
      accent: {
        DEFAULT: primitives.blue[200],
        hover: primitives.blue[100],
      },
    },
    text: {
      DEFAULT: primitives.blue[800],
      primary: primitives.blue[800],
      secondary: primitives.blue[100],
    },
  },
  gronsta: {
    background: {
      100: primitives.green[50],
      200: primitives.green[200],
      300: primitives.green[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.green[700],
        hover: primitives.green[800],
      },
      accent: {
        DEFAULT: primitives.green[200],
        hover: primitives.green[100],
      },
    },
    text: {
      DEFAULT: primitives.green[800],
      primary: primitives.green[800],
      secondary: primitives.green[100],
    },
  },
  juniskar: {
    background: {
      100: primitives.pink[50],
      200: primitives.pink[100],
      300: primitives.pink[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.pink[700],
        hover: primitives.pink[800],
      },
      accent: {
        DEFAULT: primitives.pink[200],
        hover: primitives.pink[100],
      },
    },
    text: {
      DEFAULT: primitives.pink[800],
      primary: primitives.pink[800],
      secondary: primitives.pink[100],
    },
  },
  bjornstigen: {
    background: {
      100: primitives.purple[50],
      200: primitives.purple[100],
      300: primitives.purple[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.purple[700],
        hover: primitives.purple[800],
      },
      accent: {
        DEFAULT: primitives.purple[200],
        hover: primitives.purple[100],
      },
    },
    text: {
      DEFAULT: primitives.purple[800],
      primary: primitives.purple[800],
      secondary: primitives.purple[100],
    },
  },
  error: {
    DEFAULT: primitives.red[800],
    background: {
      100: primitives.red[50],
      200: primitives.red[100],
      300: primitives.red[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.red[600],
        hover: primitives.red[700],
      },
      accent: {
        DEFAULT: primitives.red[300],
        hover: primitives.red[200],
      },
    },
    text: {
      DEFAULT: primitives.red[800],
      primary: primitives.red[800],
      secondary: primitives.gray.lightest,
    },
  },
  warning: {
    DEFAULT: primitives.orange[800],
    background: {
      100: primitives.orange[50],
      200: primitives.orange[100],
      300: primitives.orange[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.orange[600],
        hover: primitives.orange[700],
      },
      accent: {
        DEFAULT: primitives.orange[200],
        hover: primitives.orange[100],
      },
    },
    text: {
      DEFAULT: primitives.orange[800],
      primary: primitives.orange[800],
      secondary: primitives.gray.lightest,
    },
  },
  info: {
    DEFAULT: primitives.blue[800],
    background: {
      100: primitives.blue[50],
      200: primitives.blue[100],
      300: primitives.blue[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.blue[600],
        hover: primitives.blue[700],
      },
      accent: {
        DEFAULT: primitives.blue[200],
        hover: primitives.blue[100],
      },
    },
    text: {
      DEFAULT: primitives.blue[800],
      primary: primitives.blue[800],
      secondary: primitives.blue[100],
    },
  },
  success: {
    DEFAULT: primitives.green[800],
    background: {
      100: primitives.green[50],
      200: primitives.green[100],
      300: primitives.green[300],
    },
    surface: {
      primary: {
        DEFAULT: primitives.green[600],
        hover: primitives.green[700],
      },
      accent: {
        DEFAULT: primitives.green[200],
        hover: primitives.green[100],
      },
    },
    text: {
      DEFAULT: primitives.green[800],
      primary: primitives.green[800],
      secondary: primitives.green[100],
    },
  },
};

const darkmode = {
  body: primitives.gray.lightest,
  black: primitives.gray[900],
  white: primitives.gray.lightest,
  ring: primitives.ring,
  primary: {
    DEFAULT: primitives.gray.lightest,
    surface: {
      DEFAULT: primitives.overlay.lighten[9],
      hover: primitives.gray.lightest,
      disabled: primitives.overlay.lighten[3],
    },
    ...primitives.gray,
  },
  secondary: {
    DEFAULT: primitives.gray[200],
    outline: {
      DEFAULT: primitives.overlay.lighten[5],
      hover: primitives.overlay.lighten[7],
    },
    surface: {
      DEFAULT: 'transparent',
      hover: primitives.overlay.darken[3],
      disabled: primitives.overlay.lighten[2],
    },
    ...primitives.gray,
  },
  tertiary: {
    surface: {
      DEFAULT: primitives.overlay.lighten[4],
      hover: primitives.overlay.lighten[5],
      disabled: primitives.overlay.lighten[2],
    },
  },
  dark: {
    DEFAULT: primitives.gray.lightest,
    primary: primitives.gray.lightest,
    secondary: primitives.gray[200],
    disabled: primitives.overlay.lighten[6],
    placeholder: primitives.overlay.lighten[6],
    ghost: primitives.overlay.lighten[4],
  },

  light: {
    DEFAULT: primitives.gray[900],
    primary: primitives.gray[900],
    secondary: primitives.overlay.darken[9],
    disabled: primitives.overlay.darken[7],
    placeholder: primitives.overlay.darken[7],
    ghost: primitives.overlay.darken[4],
  },
  divider: primitives.overlay.lighten[5],
  background: {
    DEFAULT: primitives.gray[800],
    content: primitives.gray[800],
    100: primitives.gray[700],
    200: primitives.gray[900],
    'color-mixin': {
      1: primitives.overlay.lighten[3],
      2: primitives.overlay.lighten[4],
    },
  },
  vattjom: {
    background: {
      100: primitives.blue[900],
      200: primitives.blue[700],
      300: primitives.blue[600],
    },
    surface: {
      primary: {
        DEFAULT: primitives.blue[200],
        hover: primitives.blue[300],
      },
      accent: {
        DEFAULT: primitives.blue[700],
        hover: primitives.blue[600],
      },
    },
    text: {
      DEFAULT: primitives.blue[100],
      primary: primitives.blue[100],
      secondary: primitives.blue[800],
    },
  },
  gronsta: {
    background: {
      100: primitives.green[900],
      200: primitives.green[800],
      300: primitives.green[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.green[300],
        hover: primitives.green[200],
      },
      accent: {
        DEFAULT: primitives.green[700],
        hover: primitives.green[600],
      },
    },
    text: {
      DEFAULT: primitives.green[100],
      primary: primitives.green[100],
      secondary: primitives.green[800],
    },
  },
  juniskar: {
    background: {
      100: primitives.pink[900],
      200: primitives.pink[800],
      300: primitives.pink[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.pink[300],
        hover: primitives.pink[200],
      },
      accent: {
        DEFAULT: primitives.pink[700],
        hover: primitives.pink[600],
      },
    },
    text: {
      DEFAULT: primitives.pink[100],
      primary: primitives.pink[100],
      secondary: primitives.pink[800],
    },
  },
  bjornstigen: {
    background: {
      100: primitives.purple[900],
      200: primitives.purple[800],
      300: primitives.purple[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.purple[300],
        hover: primitives.purple[200],
      },
      accent: {
        DEFAULT: primitives.purple[700],
        hover: primitives.purple[600],
      },
    },
    text: {
      DEFAULT: primitives.purple[100],
      primary: primitives.purple[100],
      secondary: primitives.purple[800],
    },
  },
  error: {
    DEFAULT: primitives.red[100],
    background: {
      100: primitives.red[900],
      200: primitives.red[800],
      300: primitives.red[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.red[300],
        hover: primitives.red[200],
      },
      accent: {
        DEFAULT: primitives.red[700],
        hover: primitives.red[600],
      },
    },
    text: {
      DEFAULT: primitives.gray.lightest,
      primary: primitives.gray.lightest,
      secondary: primitives.red[800],
    },
  },
  warning: {
    DEFAULT: primitives.orange[100],
    background: {
      100: primitives.orange[900],
      200: primitives.orange[800],
      300: primitives.orange[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.orange[400],
        hover: primitives.orange[300],
      },
      accent: {
        DEFAULT: primitives.orange[700],
        hover: primitives.orange[600],
      },
    },
    text: {
      DEFAULT: primitives.gray.lightest,
      primary: primitives.gray.lightest,
      secondary: primitives.orange[800],
    },
  },
  info: {
    DEFAULT: primitives.blue[100],
    background: {
      100: primitives.blue[900],
      200: primitives.blue[800],
      300: primitives.blue[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.blue[400],
        hover: primitives.blue[300],
      },
      accent: {
        DEFAULT: primitives.blue[700],
        hover: primitives.blue[600],
      },
    },
    text: {
      DEFAULT: primitives.blue[100],
      primary: primitives.blue[100],
      secondary: primitives.blue[800],
    },
  },
  success: {
    DEFAULT: primitives.green[100],
    background: {
      100: primitives.green[900],
      200: primitives.green[800],
      300: primitives.green[700],
    },
    surface: {
      primary: {
        DEFAULT: primitives.green[400],
        hover: primitives.green[300],
      },
      accent: {
        DEFAULT: primitives.green[700],
        hover: primitives.green[600],
      },
    },
    text: {
      DEFAULT: primitives.green[100],
      primary: primitives.green[100],
      secondary: primitives.green[800],
    },
  },
};

// Maps a palette mode to the underlying place-named palette that holds the hex values.
// Hex values are not duplicated — palettes alias to the existing lightmode/darkmode entries.
const paletteToPlace = {
  blue: 'vattjom',
  green: 'gronsta',
  pink: 'juniskar',
  purple: 'bjornstigen',
} as const satisfies Record<Palette, keyof typeof lightmode>;

// Builds the brand-following role tokens. `action` / `brand` follow the active palette;
// `accent` and `alert` are distinct highlight roles with their own identity (provisional
// mappings — UX has not finalised what `accent` / `alert` mean, so they are parked here as
// bjornstigen / juniskar rather than aliased onto the primary brand colour). Feedback
// colors (info / success / warning / error) are palette-independent and live in
// lightmode / darkmode directly.
export const buildSemanticColors = (palette: Palette = 'blue') => {
  const lightPlace = lightmode[paletteToPlace[palette]];
  const darkPlace = darkmode[paletteToPlace[palette]];

  return {
    lightmode: {
      action: { ...lightPlace },
      brand: { ...lightPlace },
      accent: { ...lightmode.bjornstigen },
      alert: { ...lightmode.juniskar },
    },
    darkmode: {
      action: { ...darkPlace },
      brand: { ...darkPlace },
      accent: { ...darkmode.bjornstigen },
      alert: { ...darkmode.juniskar },
    },
  };
};

// Default palette: 'blue' (matches the existing Sundsvall behaviour).
const semanticColors = buildSemanticColors('blue');

const utility = {
  lightmode: {
    'input-field': {
      outline: {
        DEFAULT: primitives.overlay.darken[6],
        hover: primitives.overlay.darken[8],
        disabled: primitives.overlay.darken[5],
      },
      surface: {
        DEFAULT: primitives.overlay.lighten[10],
        disabled: primitives.gray[50],
        focus: primitives.gray.lightest,
      },
    },
    switch: {
      surface: {
        DEFAULT: primitives.overlay.darken[3],
        on: primitives.overlay.darken[4],
        disabled: primitives.overlay.darken[2],
        hover: primitives.overlay.darken[5],
      },
      control: {
        DEFAULT: primitives.overlay.darken[7],
        disabled: primitives.overlay.darken[6],
        on: lightmode.primary.surface.hover,
      },
    },

    'menu-item': {
      surface: {
        open: lightmode.vattjom.surface.accent.DEFAULT,
        hover: primitives.overlay.darken[3],
        active: lightmode.primary.surface.DEFAULT,
      },
      node: {
        line: primitives.gray[300],
      },
    },
    link: {
      text: {
        DEFAULT: lightmode.vattjom.surface.primary.DEFAULT,
        hover: lightmode.vattjom.surface.primary.hover,
        visited: {
          DEFAULT: lightmode.vattjom.surface.primary.DEFAULT,
          hover: lightmode.vattjom.surface.primary.hover,
        },
      },
    },
  },

  darkmode: {
    'input-field': {
      outline: {
        DEFAULT: primitives.overlay.lighten[6],
        hover: primitives.overlay.lighten[4],
        disabled: primitives.overlay.lighten[5],
      },
      surface: {
        DEFAULT: primitives.overlay.darken[6],
        disabled: primitives.overlay.lighten[1],
        focus: primitives.gray.darkest,
      },
    },
    switch: {
      surface: {
        DEFAULT: primitives.overlay.lighten[3],
        on: primitives.overlay.lighten[5],
        disabled: primitives.overlay.lighten[2],
        hover: primitives.overlay.lighten[4],
      },
      control: {
        DEFAULT: primitives.overlay.lighten[7],
        disabled: primitives.overlay.lighten[6],
        on: darkmode.primary.surface.hover,
      },
    },

    'menu-item': {
      surface: {
        open: darkmode.vattjom.surface.accent.DEFAULT,
        hover: primitives.overlay.lighten[5],
        active: darkmode.primary.surface.DEFAULT,
      },
      node: {
        line: primitives.gray[600],
      },
    },
    link: {
      text: {
        DEFAULT: darkmode.vattjom.surface.primary.DEFAULT,
        hover: darkmode.vattjom.surface.primary.hover,
        visited: {
          DEFAULT: darkmode.vattjom.surface.primary.DEFAULT,
          hover: darkmode.vattjom.surface.primary.hover,
        },
      },
    },
  },
};

// App setup — builds the full color tree for a given palette.
// Theme-following roles (action / brand / accent / alert) resolve to the chosen palette;
// feedback roles (info / success / warning / error) are palette-independent.
export const buildColors = (palette: Palette = 'blue') => {
  const semantic = buildSemanticColors(palette);
  return {
    lightmode: {
      primitives,
      ...lightmode,
      ...utility.lightmode,
      ...semantic.lightmode,
      inverted: { ...darkmode, ...utility.darkmode, ...semantic.darkmode },
    },
    darkmode: {
      primitives,
      ...darkmode,
      ...utility.darkmode,
      ...semantic.darkmode,
      inverted: { ...lightmode, ...utility.lightmode, ...semantic.lightmode },
    },
  };
};

// Default colors export (palette = 'blue') for backward compatibility.
export const colors = buildColors('blue');

// ---------------------------------------------------------------------------
// Brand themes (multi-tenant POC)
// ---------------------------------------------------------------------------
// A brand theme is a named colour set for an organisation. Picking one replaces the
// neutral roles (background / surface / text / border / primary / secondary / …) and the
// brand-following roles (action / brand / accent / alert). Feedback colours
// (info / success / warning / error) are intentionally NOT redefined here — they stay
// shared with the base Sundsvall theme.

// Example partner-org primitives — deliberately distinct from Sundsvall (cool slate
// neutrals + a teal brand ramp) so the org switch is visually obvious in the POC.
const aldeeranPrimitives = {
  neutral: {
    lightest: `rgb(${toRGB('#FFFFFF')?.join(',')})`,
    50: `rgb(${toRGB('#F6F8FB')?.join(',')})`,
    100: `rgb(${toRGB('#ECEFF5')?.join(',')})`,
    200: `rgb(${toRGB('#DAE1EC')?.join(',')})`,
    300: `rgb(${toRGB('#B3BFD0')?.join(',')})`,
    400: `rgb(${toRGB('#94A3B8')?.join(',')})`,
    500: `rgb(${toRGB('#5C6B82')?.join(',')})`,
    600: `rgb(${toRGB('#45526A')?.join(',')})`,
    700: `rgb(${toRGB('#37435A')?.join(',')})`,
    800: `rgb(${toRGB('#242D3D')?.join(',')})`,
    900: `rgb(${toRGB('#161D29')?.join(',')})`,
    darkest: `rgb(${toRGB('#11161F')?.join(',')})`,
  },
  brand: {
    50: `rgb(${toRGB('#ECFBF8')?.join(',')})`,
    100: `rgb(${toRGB('#CFF3EC')?.join(',')})`,
    200: `rgb(${toRGB('#A2E7DA')?.join(',')})`,
    300: `rgb(${toRGB('#69D2C0')?.join(',')})`,
    400: `rgb(${toRGB('#2FB5A0')?.join(',')})`,
    500: `rgb(${toRGB('#0F9685')?.join(',')})`,
    600: `rgb(${toRGB('#0B786A')?.join(',')})`,
    700: `rgb(${toRGB('#085E53')?.join(',')})`,
    800: `rgb(${toRGB('#064A41')?.join(',')})`,
    900: `rgb(${toRGB('#04372F')?.join(',')})`,
  },
  // A separate accent hue (amber) — unlike Sundsvall (where action/brand/accent all map to
  // the same palette), this example org deliberately gives `accent` its own colour, to show
  // that the role abstraction lets each org choose how much the roles diverge.
  accent: {
    50: `rgb(${toRGB('#FFF7EB')?.join(',')})`,
    100: `rgb(${toRGB('#FCE9C8')?.join(',')})`,
    200: `rgb(${toRGB('#F7D597')?.join(',')})`,
    300: `rgb(${toRGB('#F0BC5E')?.join(',')})`,
    400: `rgb(${toRGB('#E0992A')?.join(',')})`,
    500: `rgb(${toRGB('#C27C12')?.join(',')})`,
    600: `rgb(${toRGB('#9C620C')?.join(',')})`,
    700: `rgb(${toRGB('#7D4E0A')?.join(',')})`,
    800: `rgb(${toRGB('#5F3B0B')?.join(',')})`,
    900: `rgb(${toRGB('#422809')?.join(',')})`,
  },
};

type ColorRamp = typeof primitives.blue;
type NeutralRamp = typeof primitives.gray;
type BrandRoles = typeof lightmode.vattjom;

// Builds the `{ background, surface, text }` shape used by the brand-following roles
// (action / brand / accent / alert) from a 50..900 colour ramp — same shape that
// buildSemanticColors produces from the legacy place-named palettes.
const buildRoleShape = (ramp: ColorRamp, mode: 'light' | 'dark'): BrandRoles =>
  mode === 'light'
    ? {
        background: { 100: ramp[50], 200: ramp[100], 300: ramp[300] },
        surface: {
          primary: { DEFAULT: ramp[700], hover: ramp[900] },
          accent: { DEFAULT: ramp[200], hover: ramp[100] },
        },
        text: { DEFAULT: ramp[800], primary: ramp[800], secondary: ramp[100] },
      }
    : {
        background: { 100: ramp[900], 200: ramp[700], 300: ramp[600] },
        surface: {
          primary: { DEFAULT: ramp[200], hover: ramp[300] },
          accent: { DEFAULT: ramp[700], hover: ramp[600] },
        },
        text: { DEFAULT: ramp[100], primary: ramp[100], secondary: ramp[800] },
      };

// Builds the neutral + brand-following role overrides for a partner-org theme. Structure
// mirrors the relevant slice of `lightmode` / `darkmode`. `brand` drives action / brand /
// alert; `accent` drives the accent role (pass the same ramp to keep them in sync).
// Anything not returned here (notably the feedback colours and the legacy place-named
// palettes) falls back to base.
const buildBrandRoles = (neutral: NeutralRamp, brand: ColorRamp, accent: ColorRamp, mode: 'light' | 'dark') => {
  const brandRole = buildRoleShape(brand, mode);
  const accentRole = buildRoleShape(accent, mode);
  if (mode === 'light') {
    return {
      body: neutral[900],
      black: neutral[900],
      white: neutral.lightest,
      ring: primitives.ring,
      primary: {
        DEFAULT: neutral[900],
        active: neutral[900],
        surface: {
          DEFAULT: primitives.overlay.darken[10],
          hover: primitives.overlay.darken[9],
          disabled: primitives.overlay.darken[3],
        },
        ...neutral,
      },
      secondary: {
        DEFAULT: neutral[700],
        active: neutral[700],
        outline: { DEFAULT: primitives.overlay.darken[5], hover: primitives.overlay.darken[7] },
        surface: {
          DEFAULT: 'transparent',
          hover: primitives.overlay.lighten[3],
          disabled: primitives.overlay.darken[2],
        },
        ...neutral,
      },
      tertiary: {
        surface: {
          DEFAULT: primitives.overlay.darken[2],
          hover: primitives.overlay.darken[3],
          disabled: primitives.overlay.darken[2],
        },
      },
      dark: {
        DEFAULT: neutral[900],
        primary: neutral[900],
        secondary: neutral[700],
        disabled: primitives.overlay.darken[7],
        placeholder: primitives.overlay.darken[7],
        ghost: primitives.overlay.darken[4],
      },
      light: {
        DEFAULT: neutral.lightest,
        primary: neutral.lightest,
        secondary: primitives.overlay.lighten[9],
        disabled: primitives.overlay.lighten[6],
        placeholder: primitives.overlay.lighten[6],
        ghost: primitives.overlay.lighten[4],
      },
      divider: primitives.overlay.darken[5],
      background: {
        DEFAULT: neutral.lightest,
        content: neutral.lightest,
        100: neutral[50],
        200: neutral[100],
        'color-mixin': { 1: primitives.overlay.darken[1], 2: primitives.overlay.darken[3] },
      },
      action: { ...brandRole },
      brand: { ...brandRole },
      accent: { ...accentRole },
      alert: { ...brandRole },
      // Links follow the org's primary brand colour (mirrors utility.link in the base theme).
      link: {
        text: {
          DEFAULT: brandRole.surface.primary.DEFAULT,
          hover: brandRole.surface.primary.hover,
          visited: { DEFAULT: brandRole.surface.primary.DEFAULT, hover: brandRole.surface.primary.hover },
        },
      },
    };
  }
  return {
    body: neutral.lightest,
    black: neutral[900],
    white: neutral.lightest,
    ring: primitives.ring,
    primary: {
      DEFAULT: neutral.lightest,
      surface: {
        DEFAULT: primitives.overlay.lighten[9],
        hover: neutral.lightest,
        disabled: primitives.overlay.lighten[3],
      },
      ...neutral,
    },
    secondary: {
      DEFAULT: neutral[200],
      outline: { DEFAULT: primitives.overlay.lighten[5], hover: primitives.overlay.lighten[7] },
      surface: {
        DEFAULT: 'transparent',
        hover: primitives.overlay.darken[3],
        disabled: primitives.overlay.lighten[2],
      },
      ...neutral,
    },
    tertiary: {
      surface: {
        DEFAULT: primitives.overlay.lighten[4],
        hover: primitives.overlay.lighten[5],
        disabled: primitives.overlay.lighten[2],
      },
    },
    dark: {
      DEFAULT: neutral.lightest,
      primary: neutral.lightest,
      secondary: neutral[200],
      disabled: primitives.overlay.lighten[6],
      placeholder: primitives.overlay.lighten[6],
      ghost: primitives.overlay.lighten[4],
    },
    light: {
      DEFAULT: neutral[900],
      primary: neutral[900],
      secondary: primitives.overlay.darken[9],
      disabled: primitives.overlay.darken[7],
      placeholder: primitives.overlay.darken[7],
      ghost: primitives.overlay.darken[4],
    },
    divider: primitives.overlay.lighten[5],
    background: {
      DEFAULT: neutral[800],
      content: neutral[800],
      100: neutral[700],
      200: neutral[900],
      'color-mixin': { 1: primitives.overlay.lighten[3], 2: primitives.overlay.lighten[4] },
    },
    action: { ...brandRole },
    brand: { ...brandRole },
    accent: { ...accentRole },
    alert: { ...brandRole },
    // Links follow the org's primary brand colour (mirrors utility.link in the base theme).
    link: {
      text: {
        DEFAULT: brandRole.surface.primary.DEFAULT,
        hover: brandRole.surface.primary.hover,
        visited: { DEFAULT: brandRole.surface.primary.DEFAULT, hover: brandRole.surface.primary.hover },
      },
    },
  };
};

const brandThemes: Record<BrandTheme, { lightmode: ReturnType<typeof buildBrandRoles>; darkmode: ReturnType<typeof buildBrandRoles> } | null> = {
  // 'sundsvall' uses the base colour set as-is (palette-mode driven); no overlay.
  sundsvall: null,
  aldeeran: {
    lightmode: buildBrandRoles(aldeeranPrimitives.neutral, aldeeranPrimitives.brand, aldeeranPrimitives.accent, 'light'),
    darkmode: buildBrandRoles(aldeeranPrimitives.neutral, aldeeranPrimitives.brand, aldeeranPrimitives.accent, 'dark'),
  },
};

// Returns the colour overlay for a brand theme, or null for the base ('sundsvall') theme.
// Consumed by GuiProvider, which overlays it on top of the active colour scheme.
export const buildBrandThemeColors = (brandTheme: BrandTheme = 'sundsvall') => brandThemes[brandTheme] ?? null;

