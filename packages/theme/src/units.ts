export const spacing = {
  0: '0px',
  2: '0.2rem',
  4: '0.4rem',
  6: '0.6rem',
  8: '0.8rem',
  10: '1rem',
  12: '1.2rem',
  14: '1.4rem',
  16: '1.6rem',
  18: '1.8rem',
  20: '2rem',
  24: '2.4rem',
  32: '3.2rem',
  40: '4rem',
  48: '4.8rem',
  56: '5.6rem',
  64: '6.4rem',
  72: '7.2rem',
  80: '8rem',
};

export const breakpoints = {
  phone: {
    DEFAULT: '320px',
    min: '320px',
    max: '479px',
  },
  'small-device': {
    DEFAULT: '480px',
    min: '480px',
    max: '767px',
  },
  'medium-device': {
    DEFAULT: '768px',
    min: '768px',
    max: '1023px',
  },
  'large-device': {
    DEFAULT: '1024px',
    min: '1024px',
    max: '1365px',
  },
  desktop: {
    DEFAULT: '1366px',
    min: '1366px',
    max: '1600px',
  },
};

export const screens = {
  xs: breakpoints.phone.DEFAULT,
  sm: breakpoints['small-device'].DEFAULT,
  md: breakpoints['medium-device'].DEFAULT,
  lg: breakpoints['large-device'].DEFAULT,
  xl: breakpoints.desktop.DEFAULT,
  phone: breakpoints.phone.DEFAULT,
  'small-device': breakpoints['small-device'].DEFAULT,
  'medium-device': breakpoints['medium-device'].DEFAULT,
  'large-device': breakpoints['large-device'].DEFAULT,
  desktop: breakpoints.desktop.DEFAULT,
};

export const fontSizes = {
  display: {
    1: {
      DEFAULT: '8rem',
      lg: '8rem',
      md: '7.2rem',
      sm: '5.6rem',
    },
    2: {
      DEFAULT: '6.4rem',
      lg: '6.4rem',
      md: '5.6rem',
      sm: '4.4rem',
    },
    3: {
      DEFAULT: '4.8rem',
      lg: '4.8rem',
      md: '4rem',
      sm: '3.2rem',
    },
  },
  heading: {
    1: {
      DEFAULT: '4rem',
      lg: '4rem',
      md: '3.4rem',
      sm: '3.2rem',
    },
    2: {
      DEFAULT: '3.2rem',
      lg: '3.2rem',
      md: '2.8rem',
      sm: '2.6rem',
    },
    3: {
      DEFAULT: '2.6rem',
      lg: '2.6rem',
      md: '2.2rem',
      sm: '2rem',
    },
    4: {
      DEFAULT: '2.4rem',
      lg: '2.4rem',
      md: '2rem',
      sm: '1.8rem',
    },
  },
  label: {
    lg: '1.8rem',
    md: '1.6rem',
    sm: '1.4rem',
  },
  input: {
    lg: '1.8rem',
    md: '1.6rem',
    sm: '1.4rem',
  },
  lead: '2rem',
  base: '1.6rem',
  lg: '1.8rem',
  sm: '1.4rem',
};

export const lineHeights = {
  display: {
    1: {
      DEFAULT: '9.6rem',
      lg: '9.6rem',
      md: '8rem',
      sm: '6.4rem',
    },
    2: {
      DEFAULT: '7.2rem',
      lg: '7.2rem',
      md: '6.4rem',
      sm: '5.6rem',
    },
    3: {
      DEFAULT: '5.6rem',
      lg: '5.6rem',
      md: '4.8rem',
      sm: '3.6rem',
    },
  },
  heading: {
    1: {
      DEFAULT: '5.6rem',
      lg: '5.6rem',
      md: '4.8rem',
      sm: '4.4rem',
    },
    2: {
      DEFAULT: '4rem',
      lg: '4rem',
      md: '3.6rem',
      sm: '3.2rem',
    },
    3: {
      DEFAULT: '3.4rem',
      lg: '3.4rem',
      md: '3rem',
      sm: '2.8rem',
    },
    4: {
      DEFAULT: '3.2rem',
      lg: '3.2rem',
      md: '2.8rem',
      sm: '2.4rem',
    },
  },
  label: {
    lg: '3.2rem',
    md: '2.4rem',
    sm: '1.6rem',
  },
  input: {
    lg: '2.4rem',
    md: '2.4rem',
    sm: '2rem',
  },
  lead: '2.8rem',
  base: '2.4rem',
  lg: '2.6rem',
  sm: '2.2rem',
};
