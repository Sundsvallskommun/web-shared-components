import { deepmerge, Dict, WithCSSVar } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTheme } from './default-theme';
import { BrandTheme, ColorSchemeMode, GuiTheme, GuiThemeOverride } from './types';

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
       * The active brand theme — the organisation's colour set (name + mode hexes +
       * optional feedback overrides). Defaults to `sundsvallTheme`.
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
