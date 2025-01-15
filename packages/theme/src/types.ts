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
