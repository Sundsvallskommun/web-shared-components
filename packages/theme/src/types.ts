import { DeepPartial } from '@sk-web-gui/utils';

export type RecursiveProperty<Nested = string | number> = RecursiveObject<Nested> | Nested;
export interface RecursiveObject<Nested = string | number> {
  [property: string]: RecursiveProperty<Nested>;
}
export interface ColorHues {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  lightest?: string;
  darkest?: string;
}

export interface ThemeOption {
  [key: string | number]: string | ThemeOption;
}

export type Colors = RecursiveObject<Record<string, Partial<ColorHues>> | string>;
export interface ColorScheme {
  id: string;
  type: 'light' | 'dark';
  colors: {
    bg: {
      base: string;
      fill: string;
    };
    text: {
      foreground: string;
      muted: string;
    };
    severity?: {
      error: ThemeOption;
      warning: ThemeOption;
      info: ThemeOption;
    };
  } & Colors;
}
export interface GuiTheme {
  readonly cursor: 'default' | 'pointer';
  readonly rounded: string;
  readonly colorSchemes: Record<string, ColorScheme>;
  readonly fontSize: ThemeOption;
  readonly fontFamily: ThemeOption;
  readonly lineHeight: ThemeOption;
  readonly spacing: ThemeOption;
  readonly screens: ThemeOption;
  readonly radius: ThemeOption;
  readonly config: Record<string, unknown>;
}

export type GuiThemeOverride = DeepPartial<GuiTheme>;

export enum ColorSchemeMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

/**
 * Feedback colours an organisation can override. Each entry is a single hex value (e.g.
 * `'#AA4A44'`) that is expanded internally into a full ramp + surface/text/border tree.
 * Omitting a field falls back to {@link sundsvallTheme}'s value for that feedback type.
 */
export interface BrandThemeFeedback {
  warning?: string;
  error?: string;
  success?: string;
  alert?: string;
  info?: string;
}

/**
 * The three brand-driven colour roles. Each is a single hex value that GuiProvider
 * expands into a 50–900 ramp plus surface/text/border tokens with hover/disabled states.
 *
 * - `primary` drives the main CTA tokens (`action.*`)
 * - `secondary` and `tertiary` are two additional brand slots available for accent/highlight
 *   roles (consumers decide where to use them via Tailwind classes / CSS variables)
 */
export interface BrandThemeMode {
  primary: string;
  secondary: string;
  tertiary: string;
}

/**
 * A consumer-supplied brand theme. Pass to `<GuiProvider brandTheme={...}>` to override
 * Sundsvall's defaults with another organisation's colours.
 *
 * @example
 * ```ts
 * const hudiksvallsTheme: BrandTheme = {
 *   name: 'Hudiksvalls kommun',
 *   mode: { primary: '#0578EB', secondary: '#8C42AE', tertiary: '#00733B' },
 * };
 * ```
 */
export interface BrandTheme {
  /** Organisation name, used for documentation / debugging. */
  name: string;
  /** Optional feedback colour overrides. Missing fields inherit from {@link sundsvallTheme}. */
  feedback?: BrandThemeFeedback;
  /** Required brand colour slots. */
  mode: BrandThemeMode;
}

