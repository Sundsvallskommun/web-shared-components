import { deepmerge, Dict, WithCSSVar } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTheme } from './default-theme';
import { BrandTheme, ColorSchemeMode, GuiTheme, GuiThemeOverride, Palette } from './types';

export const isBrowser = typeof document !== 'undefined';

export const GuiContext = React.createContext<
  | {
      theme: WithCSSVar<Dict>;
      /**
       * The chosen colorScheme
       */
      colorScheme: ColorSchemeMode;
      /**
       * Set the colorScheme
       */
      setColorScheme: (scheme: ColorSchemeMode) => void;
      /**
       * Scheme that is used when set to "system"
       */
      preferredColorScheme: Exclude<ColorSchemeMode, ColorSchemeMode.System>;
      /**
       * The active palette (controls theme-following roles: action / brand / accent / alert)
       * when the brand theme is 'sundsvall'. Feedback colors are unaffected.
       */
      palette: Palette;
      /**
       * Switch the active palette at runtime.
       */
      setPalette: (palette: Palette) => void;
      /**
       * The active brand theme (organisation colour set). Replaces neutral + brand-following
       * roles; feedback colors stay shared across brand themes.
       */
      brandTheme: BrandTheme;
      /**
       * Switch the active brand theme at runtime.
       */
      setBrandTheme: (brandTheme: BrandTheme) => void;
      units: { base: number; htmlBase: number };
    }
  | undefined
>(undefined);

GuiContext.displayName = 'GuiContext';

export function extendTheme(themeOverride: GuiThemeOverride): GuiTheme {
  return deepmerge(defaultTheme, themeOverride, { clone: true }) as GuiTheme;
}

export function getPreferredColorScheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return ColorSchemeMode.Dark;
    } else {
      return ColorSchemeMode.Light;
    }
  }
  return ColorSchemeMode.Light;
}
