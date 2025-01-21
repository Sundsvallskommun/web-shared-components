import { deepmerge, Dict, WithCSSVar } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTheme } from './default-theme';
import { ColorSchemeMode, GuiTheme, GuiThemeOverride } from './types';

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
      units: { base: number; htmlBase: number };
    }
  | undefined
>(undefined);

GuiContext.displayName = 'GuiContext';

export function extendTheme(themeOverride: GuiThemeOverride): GuiTheme {
  return deepmerge(defaultTheme, themeOverride, { clone: true }) as GuiTheme;
}
