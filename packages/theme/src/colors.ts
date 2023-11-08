// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js

import { toRGB } from '@sk-web-gui/utils';

// /* Base colors */
export const primitives = {
  // NEUTRALS
  gray: {
    lightest: `rgb(${toRGB('#FFFFFF')?.join(',')})`,
    50: `rgb(${toRGB('#FAFAFA')?.join(',')})`,
    100: `rgb(${toRGB('#F0F0F0')?.join(',')})`,
    200: `rgb(${toRGB('#E5E5E5')?.join(',')})`,
    300: `rgb(${toRGB('#B7B7BA')?.join(',')})`,
    400: `rgb(${toRGB('#A2A2A8')?.join(',')})`,
    500: `rgb(${toRGB('#68686D')?.join(',')})`,
    600: `rgb(${toRGB('#51515C')?.join(',')})`,
    700: `rgb(${toRGB('#444450')?.join(',')})`,
    800: `rgb(${toRGB('#2F2F3C')?.join(',')})`,
    900: `rgb(${toRGB('#1C1C28')?.join(',')})`,
    darkest: `rgb(${toRGB('#1C1C28')?.join(',')})`,
  },

  overlay: {
    darken: {
      1: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.04)`,
      2: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.08)`,
      3: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.12)`,
      4: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.18)`,
      5: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.3)`,
      6: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.5)`,
      7: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.64)`,
      8: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.8)`,
      9: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.88)`,
      10: `rgba(${toRGB('#1C1C28')?.join(',')}, 0.95)`,
    },
    lighten: {
      1: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.04)`,
      2: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.08)`,
      3: `rgba(${toRGB('#FFFFFF')?.join(',')}, 0.12)`,
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
      DEFAULT: primitives.overlay.darken[9],
      hover: primitives.overlay.darken[10],
      disabled: primitives.overlay.darken[3],
    },
    ...primitives.gray,
  },
  secondary: {
    DEFAULT: primitives.gray[700],
    active: primitives.gray[700],
    outline: {
      DEFAULT: primitives.overlay.darken[5],
      hover: primitives.overlay.darken[6],
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
    disabled: primitives.overlay.darken[6],
    placeholder: primitives.overlay.darken[6],
    ghost: primitives.overlay.darken[4],
  },
  light: {
    DEFAULT: primitives.gray.lightest,
    primary: primitives.gray.lightest,
    secondary: primitives.overlay.lighten[9],
    disabled: primitives.overlay.lighten[6],
    placeholder: primitives.overlay.lighten[5],
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
        hover: primitives.blue[800],
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
      secondary: primitives.red[100],
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
      secondary: primitives.orange[100],
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
      DEFAULT: primitives.overlay.lighten[10],
      hover: primitives.gray.lightest,
      disabled: primitives.overlay.lighten[3],
    },
    ...primitives.gray,
  },
  secondary: {
    DEFAULT: primitives.gray[200],
    outline: {
      DEFAULT: primitives.overlay.lighten[5],
      hover: primitives.overlay.lighten[6],
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
    disabled: primitives.overlay.lighten[7],
    placeholder: primitives.overlay.lighten[5],
    ghost: primitives.overlay.lighten[4],
  },

  light: {
    DEFAULT: primitives.gray[900],
    primary: primitives.gray[900],
    secondary: primitives.overlay.darken[9],
    disabled: primitives.overlay.darken[7],
    placeholder: primitives.overlay.darken[6],
    ghost: primitives.overlay.darken[4],
  },
  divider: primitives.overlay.lighten[5],
  background: {
    DEFAULT: primitives.gray[800],
    content: primitives.gray[800],
    100: primitives.gray[700],
    200: primitives.gray[900],
    'color-mixin': {
      1: primitives.overlay.lighten[1],
      2: primitives.overlay.lighten[3],
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
      DEFAULT: primitives.red[100],
      primary: primitives.red[100],
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
      DEFAULT: primitives.orange[100],
      primary: primitives.orange[100],
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

// App setup
export const colors = {
  lightmode: {
    primitives,
    ...lightmode,
    inverted: darkmode,
  },
  darkmode: {
    primitives,
    ...darkmode,
    inverted: lightmode,
  },
};
