// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js

import { toRGB } from '@sk-web-gui/utils';
import { hexToRamp, ColorRamp } from './ramp';
import { BrandTheme } from './types';

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

// ---------------------------------------------------------------------------
// Default brand theme (Sundsvalls kommun)
// ---------------------------------------------------------------------------
// Hex values mirror the existing curated primitives used by Sundsvall's identity:
//   - mode.primary   = vattjom blue 700 (the main CTA colour)
//   - mode.secondary = juniskar pink 700
//   - mode.tertiary  = bjornstigen purple 700
//   - feedback.*     = the 700/800 step of each feedback primitive ramp
//
// Consumers can pass a custom `BrandTheme` to <GuiProvider brandTheme={...}>; any
// feedback field they omit falls back to these defaults.

export const sundsvallTheme: BrandTheme = {
  name: 'Sundsvalls kommun',
  feedback: {
    warning: '#B94E18',
    error: '#971A1A',
    success: '#00733B',
    alert: '#A90074',
    info: '#005595',
  },
  mode: {
    primary: '#005595',
    secondary: '#A90074',
    tertiary: '#5B1F78',
  },
};

// ---------------------------------------------------------------------------
// Role shape builders
// ---------------------------------------------------------------------------
// `buildRoleShape` mirrors the {background, surface, text} shape of a brand-driven role
// (e.g. action / brand / accent) — same shape that defaultColors expects so a single shape
// flows through the Tailwind preset.

type RoleShape = {
  background: { 100: string; 200: string; 300: string };
  surface: {
    primary: { DEFAULT: string; hover: string };
    accent: { DEFAULT: string; hover: string };
  };
  text: { DEFAULT: string; primary: string; secondary: string };
};

const buildRoleShape = (ramp: ColorRamp, mode: 'light' | 'dark'): RoleShape =>
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

// Builds a 50–900 ramp from a curated primitive (with the curated hex values intact at
// each step). Used to feed the identity.* / vattjom / gronsta / juniskar / bjornstigen
// role shapes from the static primitives without going through ramp generation.
const primitiveRamp = (p: typeof primitives.blue): ColorRamp => ({
  lightest: primitives.gray.lightest,
  50: p[50],
  100: p[100],
  200: p[200],
  300: p[300],
  400: p[400],
  500: p[500],
  600: p[600],
  700: p[700],
  800: p[800],
  900: p[900],
  darkest: primitives.gray.darkest,
});

// ---------------------------------------------------------------------------
// Brand-theme resolution + colour-tree builder
// ---------------------------------------------------------------------------

interface ResolvedBrandTheme {
  name: string;
  feedback: Required<NonNullable<BrandTheme['feedback']>>;
  mode: BrandTheme['mode'];
}

const resolveBrandTheme = (brandTheme: BrandTheme): ResolvedBrandTheme => ({
  name: brandTheme.name,
  mode: brandTheme.mode,
  feedback: {
    warning: brandTheme.feedback?.warning ?? sundsvallTheme.feedback!.warning!,
    error: brandTheme.feedback?.error ?? sundsvallTheme.feedback!.error!,
    success: brandTheme.feedback?.success ?? sundsvallTheme.feedback!.success!,
    alert: brandTheme.feedback?.alert ?? sundsvallTheme.feedback!.alert!,
    info: brandTheme.feedback?.info ?? sundsvallTheme.feedback!.info!,
  },
});

const buildLightmode = (
  primaryRamp: ColorRamp,
  secondaryRamp: ColorRamp,
  tertiaryRamp: ColorRamp,
  feedbackRamps: { warning: ColorRamp; error: ColorRamp; success: ColorRamp; alert: ColorRamp; info: ColorRamp }
) => ({
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

  // Brand-driven roles (consumer's mode.* hexes expanded into role shapes).
  action: buildRoleShape(primaryRamp, 'light'),
  brand: buildRoleShape(primaryRamp, 'light'),
  accent: buildRoleShape(secondaryRamp, 'light'),
  'tertiary-brand': buildRoleShape(tertiaryRamp, 'light'),

  // Feedback roles (5 types, each from a consumer-overridable hex).
  info: buildRoleShape(feedbackRamps.info, 'light'),
  success: buildRoleShape(feedbackRamps.success, 'light'),
  warning: buildRoleShape(feedbackRamps.warning, 'light'),
  error: buildRoleShape(feedbackRamps.error, 'light'),
  alert: buildRoleShape(feedbackRamps.alert, 'light'),

  // Deprecated identity aliases — keep emitting the same CSS variables (vattjom-*,
  // gronsta-*, juniskar-*, bjornstigen-*) backed by the fixed primitive ramps so
  // existing consumer Tailwind classes (e.g. `bg-vattjom-surface-accent`) keep working.
  // Prefer `action-*` / `accent-*` / `identity-*` in new code.
  vattjom: buildRoleShape(primitiveRamp(primitives.blue), 'light'),
  gronsta: buildRoleShape(primitiveRamp(primitives.green), 'light'),
  juniskar: buildRoleShape(primitiveRamp(primitives.pink), 'light'),
  bjornstigen: buildRoleShape(primitiveRamp(primitives.purple), 'light'),
});

const buildDarkmode = (
  primaryRamp: ColorRamp,
  secondaryRamp: ColorRamp,
  tertiaryRamp: ColorRamp,
  feedbackRamps: { warning: ColorRamp; error: ColorRamp; success: ColorRamp; alert: ColorRamp; info: ColorRamp }
) => ({
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

  action: buildRoleShape(primaryRamp, 'dark'),
  brand: buildRoleShape(primaryRamp, 'dark'),
  accent: buildRoleShape(secondaryRamp, 'dark'),
  'tertiary-brand': buildRoleShape(tertiaryRamp, 'dark'),

  info: buildRoleShape(feedbackRamps.info, 'dark'),
  success: buildRoleShape(feedbackRamps.success, 'dark'),
  warning: buildRoleShape(feedbackRamps.warning, 'dark'),
  error: buildRoleShape(feedbackRamps.error, 'dark'),
  alert: buildRoleShape(feedbackRamps.alert, 'dark'),

  vattjom: buildRoleShape(primitiveRamp(primitives.blue), 'dark'),
  gronsta: buildRoleShape(primitiveRamp(primitives.green), 'dark'),
  juniskar: buildRoleShape(primitiveRamp(primitives.pink), 'dark'),
  bjornstigen: buildRoleShape(primitiveRamp(primitives.purple), 'dark'),
});

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
        on: primitives.overlay.darken[9],
      },
    },

    'menu-item': {
      surface: {
        open: primitives.blue[200],
        hover: primitives.overlay.darken[3],
        active: primitives.overlay.darken[10],
      },
      node: {
        line: primitives.gray[300],
      },
    },
    link: {
      text: {
        DEFAULT: primitives.blue[700],
        hover: primitives.blue[900],
        visited: {
          DEFAULT: primitives.blue[700],
          hover: primitives.blue[900],
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
        on: primitives.gray.lightest,
      },
    },

    'menu-item': {
      surface: {
        open: primitives.blue[700],
        hover: primitives.overlay.lighten[5],
        active: primitives.overlay.lighten[9],
      },
      node: {
        line: primitives.gray[600],
      },
    },
    link: {
      text: {
        DEFAULT: primitives.blue[200],
        hover: primitives.blue[300],
        visited: {
          DEFAULT: primitives.blue[200],
          hover: primitives.blue[300],
        },
      },
    },
  },
};

/**
 * Builds the full light + dark colour trees from a {@link BrandTheme}. Each tree contains
 * primitives, neutral roles, brand-driven roles (action/brand/accent/tertiary-brand),
 * feedback roles (info/success/warning/error/alert) and deprecated identity aliases
 * (vattjom/gronsta/juniskar/bjornstigen).
 *
 * The light tree's `inverted` field is the dark tree (and vice versa) — components that
 * need to swap modes for sub-regions (e.g. inverted toolbars) read from `inverted.*`.
 */
export const buildBrandColors = (brandTheme: BrandTheme) => {
  const resolved = resolveBrandTheme(brandTheme);
  const primaryRamp = hexToRamp(resolved.mode.primary);
  const secondaryRamp = hexToRamp(resolved.mode.secondary);
  const tertiaryRamp = hexToRamp(resolved.mode.tertiary);
  const feedbackRamps = {
    warning: hexToRamp(resolved.feedback.warning),
    error: hexToRamp(resolved.feedback.error),
    success: hexToRamp(resolved.feedback.success),
    alert: hexToRamp(resolved.feedback.alert),
    info: hexToRamp(resolved.feedback.info),
  };

  const lightmode = {
    primitives,
    ...buildLightmode(primaryRamp, secondaryRamp, tertiaryRamp, feedbackRamps),
    ...utility.lightmode,
  };
  const darkmode = {
    primitives,
    ...buildDarkmode(primaryRamp, secondaryRamp, tertiaryRamp, feedbackRamps),
    ...utility.darkmode,
  };

  return {
    lightmode: { ...lightmode, inverted: darkmode },
    darkmode: { ...darkmode, inverted: lightmode },
  };
};

/**
 * Default colour tree (built from {@link sundsvallTheme}). Re-exported for backwards
 * compatibility — consumers should generally let GuiProvider build the tree from a
 * {@link BrandTheme} instead.
 */
export const colors = buildBrandColors(sundsvallTheme);
