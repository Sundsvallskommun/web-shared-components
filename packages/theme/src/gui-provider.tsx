import { Dict, WithCSSVar, deepmerge, omit } from '@sk-web-gui/utils';
import React from 'react';
import { createContext, useContext, useMemo } from 'react';

import { toCSSVar } from './create-theme-vars';
import { defaultTheme } from './default-theme';
import { GuiTheme, GuiThemeOverride } from './types';
import { useSafeEffect } from './use-safe-effect';
import { isBrowser } from './utils';

export enum ColorSchemeMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

export const GuiContext = createContext<
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
    }
  | undefined
>(undefined);

GuiContext.displayName = 'GuiContext';

export interface GuiProviderProps {
  children: React.ReactNode;
  theme?: GuiTheme;
  /**
   * @default system
   */
  colorScheme?: ColorSchemeMode;
}

export function GuiProvider({ theme = defaultTheme, colorScheme: _colorScheme, children }: GuiProviderProps) {
  const [preferredColorScheme, setPreferredColorScheme] = React.useState<
    Exclude<ColorSchemeMode, ColorSchemeMode.System>
  >(ColorSchemeMode.Light);
  const [pickedColorScheme, setPickedColorScheme] = React.useState<ColorSchemeMode>(ColorSchemeMode.System);

  React.useEffect(() => {
    setPickedColorScheme(_colorScheme || ColorSchemeMode.System);
  }, [_colorScheme]);

  useSafeEffect(() => {
    if (pickedColorScheme === ColorSchemeMode.System) {
      const scheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ColorSchemeMode.Dark
        : ColorSchemeMode.Light;
      setPreferredColorScheme(scheme);
    }
  }, [pickedColorScheme]);

  const colorScheme = pickedColorScheme === ColorSchemeMode.System ? preferredColorScheme : pickedColorScheme;

  const computedTheme = useMemo(() => {
    const omittedTheme = omit(theme, ['colorSchemes']);
    const { colors, type } = theme.colorSchemes[colorScheme] || {};
    if (isBrowser) {
      if (type === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }

    const normalizedTheme = {
      ...omittedTheme,
      colors,
    };

    return toCSSVar(normalizedTheme);
  }, [theme, colorScheme, pickedColorScheme]);

  useSafeEffect(() => {
    if (isBrowser) updateThemeVariables(computedTheme.__cssVars);
  }, [computedTheme]);

  const value = useMemo(
    () => ({
      theme: computedTheme,
      preferredColorScheme,
      colorScheme: pickedColorScheme,
      setColorScheme: setPickedColorScheme,
    }),
    [computedTheme, preferredColorScheme]
  );

  return <GuiContext.Provider value={value}>{children}</GuiContext.Provider>;
}

function setStyleVariable(name: string, value: string) {
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty(name, value);
}

function updateStyleHelper(_themeKey: string, style: string) {
  const themeKey = _themeKey.startsWith('--') ? _themeKey : `--${_themeKey}`;
  setStyleVariable(themeKey, style);
}

function updateThemeVariables(vars: Record<string, string>) {
  Object.entries(vars).forEach(([key, val]) => {
    updateStyleHelper(key, val);
  });
}

export function useGui<T extends object = Dict>() {
  const theme = useContext(GuiContext as unknown as React.Context<T | undefined>);
  if (!theme) {
    throw Error('useGui: `theme` is undefined. Seems you forgot to wrap your app in `<GuiProvider />`');
  }

  return theme as WithCSSVar<T>;
}

export function extendTheme(themeOverride: GuiThemeOverride): GuiTheme {
  return deepmerge(defaultTheme, themeOverride, { clone: true }) as GuiTheme;
}
