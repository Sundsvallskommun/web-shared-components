// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js

// let warned = false;

/* Convert hex to rgba */
// based on https://stackoverflow.com/a/21648508
function hexToRgbA(hex: string, opacity: string) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
  }
  throw new Error('Bad Hex');
}

// /* Base colors */
export const primitives = {
  // NEUTRALS
  gray: {
    lightest: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F0F0F0',
    200: '#E5E5E5',
    300: '#B7B7BA',
    400: '#A2A2A8',
    500: '#68686D',
    600: '#51515C',
    700: '#444450',
    800: '#2F2F3C',
    900: '#1C1C28',
    darkest: '#1C1C28',
  },

  overlay: {
    darken: {
      1: hexToRgbA('#1C1C28', '0.04'),
      2: hexToRgbA('#1C1C28', '0.08'),
      3: hexToRgbA('#1C1C28', '0.12'),
      4: hexToRgbA('#1C1C28', '0.18'),
      5: hexToRgbA('#1C1C28', '0.3'),
      6: hexToRgbA('#1C1C28', '0.5'),
      7: hexToRgbA('#1C1C28', '0.64'),
      8: hexToRgbA('#1C1C28', '0.8'),
      9: hexToRgbA('#1C1C28', '0.88'),
      10: hexToRgbA('#1C1C28', '0.95'),
    },
    lighten: {
      1: hexToRgbA('#FFFFFF', '0.04'),
      2: hexToRgbA('#FFFFFF', '0.08'),
      3: hexToRgbA('#FFFFFF', '0.12'),
      4: hexToRgbA('#FFFFFF', '0.2'),
      5: hexToRgbA('#FFFFFF', '0.3'),
      6: hexToRgbA('#FFFFFF', '0.5'),
      7: hexToRgbA('#FFFFFF', '0.64'),
      8: hexToRgbA('#FFFFFF', '0.8'),
      9: hexToRgbA('#FFFFFF', '0.88'),
      10: hexToRgbA('#FFFFFF', '0.95'),
    },
  },

  //COLORS
  blue: {
    50: '#F0F5F9',
    100: '#E1ECF4',
    200: '#CFE0EC',
    300: '#B5CFE3',
    400: '#73ACD6',
    500: '#4293D1',
    600: '#1472B8',
    700: '#005595',
    800: '#004C85',
    900: '#004070',
  },
  green: {
    50: '#F1F9F5',
    100: '#E1EFE9',
    200: '#C9E4D7',
    300: '#AAD4BF',
    400: '#65B88F',
    500: '#16A25E',
    600: '#12874E',
    700: '#00733B',
    800: '#00592D',
    900: '#004222',
  },
  purple: {
    50: '#F6F1F9',
    100: '#EFE8F3',
    200: '#E4D8E9',
    300: '#D6C4DE',
    400: '#BA90CE',
    500: '#8C42AE',
    600: '#722796',
    700: '#5B1F78',
    800: '#4D1A65',
    900: '#2E103D',
  },
  pink: {
    50: '#FAEFF8',
    100: '#F6E4F2',
    200: '#F1D5EA',
    300: '#E9BEE0',
    400: '#DF83CD',
    500: '#D558AE',
    600: '#BF1D8C',
    700: '#A90074',
    800: '#8A005E',
    900: '#6B004A',
  },
  orange: {
    50: '#FFF5EB',
    100: '#FFE7D1',
    200: '#FFD3A8',
    300: '#FFC68F',
    400: '#FFA34D',
    500: '#FF840F',
    600: '#DB6900',
    700: '#B94E18',
    800: '#8C3B12',
    900: '#5C2100',
  },
  red: {
    50: '#FFEBEB',
    100: '#FEE2E2',
    200: '#FCD4D4',
    300: '#FBC1C1',
    400: '#F78282',
    500: '#F44E4E',
    600: '#D62E2E',
    700: '#B92424',
    800: '#971A1A',
    900: '#6D0303',
  },
};

// App setup
export const colors = {
  lightmode: {
    primitives,
    body: primitives.gray[900],
    black: primitives.gray[900],
    white: primitives.gray.lightest,

    primary: {
      DEFAULT: primitives.gray[900],
      surface: {
        DEFAULT: primitives.overlay.darken[9],
        hover: primitives.overlay.darken[10],
        disabled: primitives.overlay.darken[3],
      },
    },
    secondary: {
      DEFAULT: primitives.gray[700],
      outline: {
        default: primitives.overlay.darken[5],
        hover: primitives.overlay.darken[6],
      },
      surface: {
        DEFAULT: 'transparent',
        hover: primitives.overlay.lighten[3],
        disabled: primitives.overlay.darken[2],
      },
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
  },

  darkmode: {
    primitives,
    body: primitives.gray[900],
    black: primitives.gray[900],
    white: primitives.gray.lightest,
    primary: {
      DEFAULT: primitives.gray.lightest,
      surface: {
        DEFAULT: primitives.overlay.lighten[10],
        hover: primitives.gray.lightest,
        disabled: primitives.overlay.lighten[3],
      },
    },
    secondary: {
      DEFAULT: primitives.gray[200],
      outline: {
        default: primitives.overlay.lighten[5],
        hover: primitives.overlay.lighten[6],
      },
      surface: {
        DEFAULT: 'transparent',
        hover: primitives.overlay.darken[3],
        disabled: primitives.overlay.lighten[2],
      },
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
  },
};
