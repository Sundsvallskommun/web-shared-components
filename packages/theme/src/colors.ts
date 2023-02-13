// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js

let warned = false;

/* Convert hex to rgba */
// based on https://stackoverflow.com/a/21648508
function hexToRgbA(hex: string, opacity: string) {
  var c: any;
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

/* Base colors */
export const _colors = {
  // Grayscale
  black: {
    DEFAULT: '#000000',
    dark: '#000000',
    light: '#000000',
    active: '#000000',
  },
  gray: {
    DEFAULT: '#4b4b4b',
    dark: '#4b4b4b',
    light: '#4b4b4b',
    active: '#F4F4F4',
  },
  'gray-light': {
    DEFAULT: '#F4F4F4',
    dark: '#F4F4F4',
    light: '#F4F4F4',
    active: '#F4F4F4',
  },
  'gray-lighter': {
    DEFAULT: '#F9F9F9',
    dark: '#F9F9F9',
    light: '#F9F9F9',
    active: '#F9F9F9',
  },
  'gray-stroke': {
    DEFAULT: '#939393',
    dark: '#939393',
    light: '#939393',
    active: '#939393',
  },
  'gray-middle': {
    DEFAULT: '#ECECEC',
    dark: '#ECECEC',
    light: '#ECECEC',
    active: '#ECECEC',
  },
  white: {
    DEFAULT: '#FFFFFF',
    dark: '#FFFFFF',
    light: '#FFFFFF',
    active: '#FFFFFF',
  },

  // Named
  vattjom: {
    DEFAULT: '#005595',
    dark: '#005595',
    light: '#DAEFF1',
    active: '#2B76B0',
  },
  gronsta: {
    DEFAULT: '#00733B',
    dark: '#00733B',
    light: '#E0F6DE',
    active: '#00994e',
  },
  bjornstigen: {
    DEFAULT: '#5B1F78',
    dark: '#5B1F78',
    light: '#D7DBF2',
    active: '#D7DBF2',
  },
  juniskar: {
    DEFAULT: '#A90074',
    dark: '#A90074',
    light: '#FEDFE2',
    active: '#FEDFE2',
  },
  svartvik: {
    DEFAULT: '#D4D8DB',
    dark: '#D4D8DB',
    light: '#D4D8DB',
    active: '#D4D8DB',
    '50': '#D4D8DB',
    '100': '#C8CFD2',
    '200': '#B2BBBF',
    '300': '#9CA7AD',
    '400': '#86939A',
    '500': '#707F87',
    '600': '#576268',
    '700': '#3D454A',
    '800': '#24282B',
    '900': '#0A0C0C',
  },

  // Other
  red: {
    DEFAULT: '#A90000',
    dark: '#A90000',
    light: '#A90000',
    active: '#A90000',
  },

  orange: {
    DEFAULT: '#C16A03',
    dark: '#C16A03',
    light: '#F3E1CD',
    active: '#C16A03',
  },
};

// App setup
export const colors = {
  ..._colors,

  primary: {
    DEFAULT: _colors.vattjom.DEFAULT,
    dark: _colors.vattjom.dark,
    light: _colors.vattjom.light,
    active: _colors.vattjom.active,
    50: _colors.vattjom.DEFAULT,
    100: _colors.vattjom.DEFAULT,
    200: _colors.vattjom.DEFAULT,
    300: _colors.vattjom.DEFAULT,
    400: _colors.vattjom.DEFAULT,
    500: _colors.vattjom.DEFAULT,
    600: _colors.vattjom.DEFAULT,
    700: _colors.vattjom.DEFAULT,
    800: _colors.vattjom.DEFAULT,
    900: _colors.vattjom.DEFAULT,
  },
  secondary: {
    DEFAULT: _colors.gronsta.DEFAULT,
    dark: _colors.gronsta.dark,
    light: _colors.gronsta.light,
    active: _colors.gronsta.active,
    50: _colors.gronsta.DEFAULT,
    100: _colors.gronsta.DEFAULT,
    200: _colors.gronsta.DEFAULT,
    300: _colors.gronsta.DEFAULT,
    400: _colors.gronsta.DEFAULT,
    500: _colors.gronsta.DEFAULT,
    600: _colors.gronsta.DEFAULT,
    700: _colors.gronsta.DEFAULT,
    800: _colors.gronsta.DEFAULT,
    900: _colors.gronsta.DEFAULT,
  },
  neutral: {
    DEFAULT: _colors.svartvik.DEFAULT,
    dark: _colors.svartvik.dark,
    light: _colors.svartvik.light,
    active: _colors.svartvik.active,
    50: _colors.svartvik[50],
    100: _colors.svartvik[100],
    200: _colors.svartvik[200],
    300: _colors.svartvik[300],
    400: _colors.svartvik[400],
    500: _colors.svartvik[500],
    600: _colors.svartvik[600],
    700: _colors.svartvik[700],
    800: _colors.svartvik[800],
    900: _colors.svartvik[900],
  },
  hover: {
    DEFAULT: '#2B76B0',
    dark: '#2B76B0',
    light: '#2B76B0',
    active: '#2B76B0',
  },

  // ..background
  background: {
    one: '#D9E6EF',
    two: '#F4F4F4',
    three: '#F9F9F9',
  },

  // ..headings
  heading: {
    DEFAULT: _colors.black.DEFAULT,
    two: _colors.vattjom.DEFAULT,
    three: _colors.black.light,
  },
  // ..body
  body: {
    DEFAULT: '#212121',
    two: _colors.black.DEFAULT,
  },

  // ..statuses
  info: {
    DEFAULT: _colors.vattjom.DEFAULT,
    dark: _colors.vattjom.dark,
    light: _colors.vattjom.light,
    active: _colors.vattjom.DEFAULT,
  },
  success: {
    DEFAULT: _colors.gronsta.DEFAULT,
    dark: _colors.gronsta.dark,
    light: _colors.gronsta.light,
    active: _colors.gronsta.DEFAULT,
  },
  warning: {
    DEFAULT: _colors.orange.DEFAULT,
    dark: _colors.orange.dark,
    light: _colors.orange.light,
    active: _colors.orange.DEFAULT,
  },
  error: {
    DEFAULT: _colors.red.DEFAULT,
    dark: _colors.red.dark,
    light: _colors.juniskar.light,
    active: _colors.red.DEFAULT,
  },
};
