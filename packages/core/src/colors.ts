import { defaultColors } from '@sk-web-gui/utils';

const createDefaultColorReferences = (name: string, inverted = false) => {
  const prefix = inverted ? `inverted-${name}` : name;

  return {
    background: {
      100: `var(--sk-colors-${prefix}-background-100)`,
      200: `var(--sk-colors-${prefix}-background-200)`,
      300: `var(--sk-colors-${prefix}-background-300)`,
    },
    surface: {
      primary: {
        DEFAULT: `var(--sk-colors-${prefix}-surface-primary-DEFAULT)`,
        hover: `var(--sk-colors-${prefix}-surface-primary-hover)`,
      },
      accent: {
        DEFAULT: `var(--sk-colors-${prefix}-surface-accent-DEFAULT)`,
        hover: `var(--sk-colors-${prefix}-surface-accent-hover)`,
      },
    },
    text: {
      DEFAULT: `var(--sk-colors-${prefix}-text-DEFAULT)`,
      primary: `var(--sk-colors-${prefix}-text-primary)`,
      secondary: `var(--sk-colors-${prefix}-text-secondary)`,
    },
  };
};

const colors = {
  primitives: {
    gray: {
      lightest: `var(--sk-colors-primitives-gray-lightest)`,
      50: `var(--sk-colors-primitives-gray-50)`,
      100: `var(--sk-colors-primitives-gray-100)`,
      200: `var(--sk-colors-primitives-gray-200)`,
      300: `var(--sk-colors-primitives-gray-300)`,
      400: `var(--sk-colors-primitives-gray-400)`,
      500: `var(--sk-colors-primitives-gray-500)`,
      600: `var(--sk-colors-primitives-gray-600)`,
      700: `var(--sk-colors-primitives-gray-700)`,
      800: `var(--sk-colors-primitives-gray-800)`,
      900: `var(--sk-colors-primitives-gray-900)`,
      darkest: `var(--sk-colors-primitives-gray-darkest)`,
    },

    overlay: {
      darken: {
        1: `var(--sk-colors-primitives-overlay-darken-1)`,
        2: `var(--sk-colors-primitives-overlay-darken-2)`,
        3: `var(--sk-colors-primitives-overlay-darken-3)`,
        4: `var(--sk-colors-primitives-overlay-darken-4)`,
        5: `var(--sk-colors-primitives-overlay-darken-5)`,
        6: `var(--sk-colors-primitives-overlay-darken-6)`,
        7: `var(--sk-colors-primitives-overlay-darken-7)`,
        8: `var(--sk-colors-primitives-overlay-darken-8)`,
        9: `var(--sk-colors-primitives-overlay-darken-9)`,
        10: `var(--sk-colors-primitives-overlay-darken-10)`,
      },
      lighten: {
        1: `var(--sk-colors-primitives-overlay-lighten-1)`,
        2: `var(--sk-colors-primitives-overlay-lighten-2)`,
        3: `var(--sk-colors-primitives-overlay-lighten-3)`,
        4: `var(--sk-colors-primitives-overlay-lighten-4)`,
        5: `var(--sk-colors-primitives-overlay-lighten-5)`,
        6: `var(--sk-colors-primitives-overlay-lighten-6)`,
        7: `var(--sk-colors-primitives-overlay-lighten-7)`,
        8: `var(--sk-colors-primitives-overlay-lighten-8)`,
        9: `var(--sk-colors-primitives-overlay-lighten-9)`,
        10: `var(--sk-colors-primitives-overlay-lighten-10)`,
      },
    },

    //COLORS
    blue: {
      50: `var(--sk-colors-primitives-blue-50)`,
      100: `var(--sk-colors-primitives-blue-100)`,
      200: `var(--sk-colors-primitives-blue-200)`,
      300: `var(--sk-colors-primitives-blue-300)`,
      400: `var(--sk-colors-primitives-blue-400)`,
      500: `var(--sk-colors-primitives-blue-500)`,
      600: `var(--sk-colors-primitives-blue-600)`,
      700: `var(--sk-colors-primitives-blue-700)`,
      800: `var(--sk-colors-primitives-blue-800)`,
      900: `var(--sk-colors-primitives-blue-900)`,
    },
    green: {
      50: `var(--sk-colors-primitives-green-50)`,
      100: `var(--sk-colors-primitives-green-100)`,
      200: `var(--sk-colors-primitives-green-200)`,
      300: `var(--sk-colors-primitives-green-300)`,
      400: `var(--sk-colors-primitives-green-400)`,
      500: `var(--sk-colors-primitives-green-500)`,
      600: `var(--sk-colors-primitives-green-600)`,
      700: `var(--sk-colors-primitives-green-700)`,
      800: `var(--sk-colors-primitives-green-800)`,
      900: `var(--sk-colors-primitives-green-900)`,
    },
    purple: {
      50: `var(--sk-colors-primitives-purple-50)`,
      100: `var(--sk-colors-primitives-purple-100)`,
      200: `var(--sk-colors-primitives-purple-200)`,
      300: `var(--sk-colors-primitives-purple-300)`,
      400: `var(--sk-colors-primitives-purple-400)`,
      500: `var(--sk-colors-primitives-purple-500)`,
      600: `var(--sk-colors-primitives-purple-600)`,
      700: `var(--sk-colors-primitives-purple-700)`,
      800: `var(--sk-colors-primitives-purple-800)`,
      900: `var(--sk-colors-primitives-purple-900)`,
    },
    pink: {
      50: `var(--sk-colors-primitives-pink-50)`,
      100: `var(--sk-colors-primitives-pink-100)`,
      200: `var(--sk-colors-primitives-pink-200)`,
      300: `var(--sk-colors-primitives-pink-300)`,
      400: `var(--sk-colors-primitives-pink-400)`,
      500: `var(--sk-colors-primitives-pink-500)`,
      600: `var(--sk-colors-primitives-pink-600)`,
      700: `var(--sk-colors-primitives-pink-700)`,
      800: `var(--sk-colors-primitives-pink-800)`,
      900: `var(--sk-colors-primitives-pink-900)`,
    },
    orange: {
      50: `var(--sk-colors-primitives-orange-50)`,
      100: `var(--sk-colors-primitives-orange-100)`,
      200: `var(--sk-colors-primitives-orange-200)`,
      300: `var(--sk-colors-primitives-orange-300)`,
      400: `var(--sk-colors-primitives-orange-400)`,
      500: `var(--sk-colors-primitives-orange-500)`,
      600: `var(--sk-colors-primitives-orange-600)`,
      700: `var(--sk-colors-primitives-orange-700)`,
      800: `var(--sk-colors-primitives-orange-800)`,
      900: `var(--sk-colors-primitives-orange-900)`,
    },
    red: {
      50: `var(--sk-colors-primitives-red-50)`,
      100: `var(--sk-colors-primitives-red-100)`,
      200: `var(--sk-colors-primitives-red-200)`,
      300: `var(--sk-colors-primitives-red-300)`,
      400: `var(--sk-colors-primitives-red-400)`,
      500: `var(--sk-colors-primitives-red-500)`,
      600: `var(--sk-colors-primitives-red-600)`,
      700: `var(--sk-colors-primitives-red-700)`,
      800: `var(--sk-colors-primitives-red-800)`,
      900: `var(--sk-colors-primitives-red-900)`,
    },
  },
  body: `var(--sk-colors-body)`,
  black: `var(--sk-colors-black)`,
  white: `var(--sk-colors-white)`,
  ring: `var(--sk-colors-ring)`,
  primary: {
    DEFAULT: `var(--sk-colors-primary-DEFAULT)`,
    surface: {
      DEFAULT: `var(--sk-colors-primary-surface-DEFAULT)`,
      hover: `var(--sk-colors-primary-surface-hover)`,
      disabled: `var(--sk-colors-primary-surface-disabled)`,
    },
    lightest: `var(--sk-colors-primary-lightest)`,
    50: `var(--sk-colors-primary-50)`,
    100: `var(--sk-colors-primary-100)`,
    200: `var(--sk-colors-primary-200)`,
    300: `var(--sk-colors-primary-300)`,
    400: `var(--sk-colors-primary-400)`,
    500: `var(--sk-colors-primary-500)`,
    600: `var(--sk-colors-primary-600)`,
    700: `var(--sk-colors-primary-700)`,
    800: `var(--sk-colors-primary-800)`,
    900: `var(--sk-colors-primary-900)`,
    darkest: `var(--sk-colors-primary-darkest)`,
  },
  secondary: {
    DEFAULT: `var(--sk-colors-secondary-DEFAULT)`,
    outline: {
      DEFAULT: `var(--sk-colors-secondary-outline-DEFAULT)`,
      hover: `var(--sk-colors-secondary-outline-hover)`,
    },
    surface: {
      DEFAULT: `var(--sk-colors-secondary-surface-DEFAULT)`,
      hover: `var(--sk-colors-secondary-surface-hover)`,
      disabled: `var(--sk-colors-secondary-surface-disabled)`,
    },
    lightest: `var(--sk-colors-secondary-lightest)`,
    50: `var(--sk-colors-secondary-50)`,
    100: `var(--sk-colors-secondary-100)`,
    200: `var(--sk-colors-secondary-200)`,
    300: `var(--sk-colors-secondary-300)`,
    400: `var(--sk-colors-secondary-400)`,
    500: `var(--sk-colors-secondary-500)`,
    600: `var(--sk-colors-secondary-600)`,
    700: `var(--sk-colors-secondary-700)`,
    800: `var(--sk-colors-secondary-800)`,
    900: `var(--sk-colors-secondary-900)`,
    darkest: `var(--sk-colors-secondary-darkest)`,
  },
  tertiary: {
    surface: {
      DEFAULT: `var(--sk-colors-tertiary-surface-DEFAULT)`,
      hover: `var(--sk-colors-tertiary-surface-hover)`,
      disabled: `var(--sk-colors-tertiary-surface-disabled)`,
    },
  },
  dark: {
    DEFAULT: `var(--sk-colors-dark-DEFAULT)`,
    primary: `var(--sk-colors-dark-primary)`,
    secondary: `var(--sk-colors-dark-secondary)`,
    disabled: `var(--sk-colors-dark-disabled)`,
    placeholder: `var(--sk-colors-dark-placeholder)`,
    ghost: `var(--sk-colors-dark-ghost)`,
  },
  light: {
    DEFAULT: `var(--sk-colors-light-DEFAULT)`,
    primary: `var(--sk-colors-light-primary)`,
    secondary: `var(--sk-colors-light-secondary)`,
    disabled: `var(--sk-colors-light-disabled)`,
    placeholder: `var(--sk-colors-light-placeholder)`,
    ghost: `var(--sk-colors-light-ghost)`,
  },
  divider: `var(--sk-colors-divider)`,
  background: {
    DEFAULT: `var(--sk-colors-background-DEFUALT)`,
    content: `var(--sk-colors-background-content)`,
    100: `var(--sk-colors-background-100)`,
    200: `var(--sk-colors-background-200)`,
    'color-mixin': {
      1: `var(--sk-colors-background-color-mixin-1)`,
      2: `var(--sk-colors-background-color-mixin-2)`,
    },
  },
  ...defaultColors.reduce((colors, color) => ({ ...colors, [color]: createDefaultColorReferences(color, false) }), {}),
  'input-field': {
    outline: {
      DEFAULT: `var(--sk-colors-input-field-outline-DEFAULT)`,
      hover: `var(--sk-colors-input-field-outline-hover)`,
      disabled: `var(--sk-colors-input-field-outline-disabled)`,
    },
    surface: {
      DEFAULT: `var(--sk-colors-input-field-surface-DEFAULT)`,
      disabled: `var(--sk-colors-input-field-surface-disabled)`,
      focus: `var(--sk-colors-input-field-surface-focus)`,
    },
  },
  switch: {
    surface: {
      DEFAULT: `var(--sk-colors-switch-surface-DEFAULT)`,
      on: `var(--sk-colors-switch-surface-on)`,
      disabled: `var(--sk-colors-switch-surface-disabled)`,
      hover: `var(--sk-colors-switch-surface-hover)`,
    },
    control: {
      DEFAULT: `var(--sk-colors-switch-control-DEFAULT)`,
      disabled: `var(--sk-colors-switch-control-disabled)`,
      on: `var(--sk-colors-switch-control-on)`,
    },
  },
  'menu-item': {
    surface: {
      open: `var(--sk-colors-menu-item-surface-DEFAULT)`,
      hover: `var(--sk-colors-menu-item-surface-hover)`,
      active: `var(--sk-colors-menu-item-surface-active)`,
    },
    node: {
      line: `var(--sk-colors-menu-item-node-line)`,
    },
  },
  link: {
    text: {
      DEFAULT: `var(--sk-colors-link-text-DEFAULT)`,
      hover: `var(--sk-colors-link-text-hover)`,
      visited: {
        DEFAULT: `var(--sk-colors-link-text-visited-DEFAULT)`,
        hover: `var(--sk-colors-link-text-visited-hover)`,
      },
    },
  },
  inverted: {
    body: `var(--sk-colors-inverted-body)`,
    black: `var(--sk-colors-inverted-black)`,
    white: `var(--sk-colors-inverted-white)`,
    ring: `var(--sk-colors-inverted-ring)`,
    primary: {
      DEFAULT: `var(--sk-colors-inverted-primary-DEFAULT)`,
      surface: {
        DEFAULT: `var(--sk-colors-inverted-primary-surface-DEFAULT)`,
        hover: `var(--sk-colors-inverted-primary-surface-hover)`,
        disabled: `var(--sk-colors-inverted-primary-surface-disabled)`,
      },
      lightest: `var(--sk-colors-inverted-primary-lightest)`,
      50: `var(--sk-colors-inverted-primary-50)`,
      100: `var(--sk-colors-inverted-primary-100)`,
      200: `var(--sk-colors-inverted-primary-200)`,
      300: `var(--sk-colors-inverted-primary-300)`,
      400: `var(--sk-colors-inverted-primary-400)`,
      500: `var(--sk-colors-inverted-primary-500)`,
      600: `var(--sk-colors-inverted-primary-600)`,
      700: `var(--sk-colors-inverted-primary-700)`,
      800: `var(--sk-colors-inverted-primary-800)`,
      900: `var(--sk-colors-inverted-primary-900)`,
      darkest: `var(--sk-colors-inverted-primary-darkest)`,
    },
    secondary: {
      DEFAULT: `var(--sk-colors-inverted-secondary-DEFAULT)`,
      outline: {
        DEFAULT: `var(--sk-colors-inverted-secondary-outline-DEFAULT)`,
        hover: `var(--sk-colors-inverted-secondary-outline-hover)`,
      },
      surface: {
        DEFAULT: `var(--sk-colors-inverted-secondary-surface-DEFAULT)`,
        hover: `var(--sk-colors-inverted-secondary-surface-hover)`,
        disabled: `var(--sk-colors-inverted-secondary-surface-disabled)`,
      },
      lightest: `var(--sk-colors-inverted-secondary-lightest)`,
      50: `var(--sk-colors-inverted-secondary-50)`,
      100: `var(--sk-colors-inverted-secondary-100)`,
      200: `var(--sk-colors-inverted-secondary-200)`,
      300: `var(--sk-colors-inverted-secondary-300)`,
      400: `var(--sk-colors-inverted-secondary-400)`,
      500: `var(--sk-colors-inverted-secondary-500)`,
      600: `var(--sk-colors-inverted-secondary-600)`,
      700: `var(--sk-colors-inverted-secondary-700)`,
      800: `var(--sk-colors-inverted-secondary-800)`,
      900: `var(--sk-colors-inverted-secondary-900)`,
      darkest: `var(--sk-colors-inverted-secondary-darkest)`,
    },
    tertiary: {
      surface: {
        DEFAULT: `var(--sk-colors-inverted-tertiary-surface-DEFAULT)`,
        hover: `var(--sk-colors-inverted-tertiary-surface-hover)`,
        disabled: `var(--sk-colors-inverted-tertiary-surface-disabled)`,
      },
    },
    dark: {
      DEFAULT: `var(--sk-colors-inverted-dark-DEFAULT)`,
      primary: `var(--sk-colors-inverted-dark-primary)`,
      secondary: `var(--sk-colors-inverted-dark-secondary)`,
      disabled: `var(--sk-colors-inverted-dark-disabled)`,
      placeholder: `var(--sk-colors-inverted-dark-placeholder)`,
      ghost: `var(--sk-colors-inverted-dark-ghost)`,
    },
    light: {
      DEFAULT: `var(--sk-colors-inverted-light-DEFAULT)`,
      primary: `var(--sk-colors-inverted-light-primary)`,
      secondary: `var(--sk-colors-inverted-light-secondary)`,
      disabled: `var(--sk-colors-inverted-light-disabled)`,
      placeholder: `var(--sk-colors-inverted-light-placeholder)`,
      ghost: `var(--sk-colors-inverted-light-ghost)`,
    },
    divider: `var(--sk-colors-inverted-divider)`,
    background: {
      DEFAULT: `var(--sk-colors-inverted-background-DEFUALT)`,
      content: `var(--sk-colors-inverted-background-content)`,
      100: `var(--sk-colors-inverted-background-100)`,
      200: `var(--sk-colors-inverted-background-200)`,
      'color-mixin': {
        1: `var(--sk-colors-inverted-background-color-mixin-1)`,
        2: `var(--sk-colors-inverted-background-color-mixin-2)`,
      },
    },
    ...defaultColors.reduce((colors, color) => ({ ...colors, [color]: createDefaultColorReferences(color, true) }), {}),
    'input-field': {
      outline: {
        DEFAULT: `var(--sk-colors-inverted-input-field-outline-DEFAULT)`,
        hover: `var(--sk-colors-inverted-input-field-outline-hover)`,
        disabled: `var(--sk-colors-inverted-input-field-outline-disabled)`,
      },
      surface: {
        DEFAULT: `var(--sk-colors-inverted-input-field-surface-DEFAULT)`,
        disabled: `var(--sk-colors-inverted-input-field-surface-disabled)`,
        focus: `var(--sk-colors-inverted-input-field-surface-focus)`,
      },
    },
    switch: {
      surface: {
        DEFAULT: `var(--sk-colors-inverted-switch-surface-DEFAULT)`,
        on: `var(--sk-colors-inverted-switch-surface-on)`,
        disabled: `var(--sk-colors-inverted-switch-surface-disabled)`,
        hover: `var(--sk-colors-inverted-switch-surface-hover)`,
      },
      control: {
        DEFAULT: `var(--sk-colors-inverted-switch-control-DEFAULT)`,
        disabled: `var(--sk-colors-inverted-switch-control-disabled)`,
        on: `var(--sk-colors-inverted-switch-control-on)`,
      },
    },
    'menu-item': {
      surface: {
        open: `var(--sk-colors-inverted-menu-item-surface-DEFAULT)`,
        hover: `var(--sk-colors-inverted-menu-item-surface-hover)`,
        active: `var(--sk-colors-inverted-menu-item-surface-active)`,
      },
      node: {
        line: `var(--sk-colors-inverted-menu-item-node-line)`,
      },
    },
    link: {
      text: {
        DEFAULT: `var(--sk-colors-inverted-link-text-DEFAULT)`,
        hover: `var(--sk-colors-inverted-link-text-hover)`,
        visited: {
          DEFAULT: `var(--sk-colors-inverted-link-text-visited-DEFAULT)`,
          hover: `var(--sk-colors-inverted-link-text-visited-hover)`,
        },
      },
    },
  },
};

export { colors };



