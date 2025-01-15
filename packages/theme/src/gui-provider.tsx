import { omit } from '@sk-web-gui/utils';
import React from 'react';
import { toCSSVar } from './create-theme-vars';
import { defaultTheme } from './default-theme';
import { ColorSchemeMode, GuiTheme, ThemeOption } from './types';
import { useSafeEffect } from './use-safe-effect';
import { GuiContext, isBrowser } from './utils';

export interface GuiProviderProps {
  children: React.ReactNode;
  theme?: GuiTheme;
  /**
   * @default system
   */
  colorScheme?: ColorSchemeMode;
  /**
   * Font size in px that the theme variables are based on
   * @default 10
   */
  baseFontSize?: number;
  /**
   * Font base size in px that the site uses.
   * @default 10
   */
  htmlFontSize?: number;
}

export function GuiProvider({
  theme = defaultTheme,
  colorScheme: _colorScheme,
  baseFontSize = 10,
  htmlFontSize = 10,
  children,
}: GuiProviderProps) {
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

  const units = React.useMemo(() => {
    let fontSize = theme.fontSize;
    let lineHeight = theme.lineHeight;
    let spacing = theme.spacing;
    let screens = theme.screens;
    let radius = theme.radius;

    if (baseFontSize !== htmlFontSize) {
      const diff = baseFontSize / htmlFontSize;
      fontSize = crawlSizes(theme.fontSize, diff);
      lineHeight = crawlSizes(theme.lineHeight, diff);
      spacing = crawlSizes(theme.spacing, diff);
      screens = crawlSizes(theme.screens, diff);
      radius = crawlSizes(theme.radius, diff);
    }

    return { fontSize, lineHeight, spacing, screens, radius };
  }, [baseFontSize, htmlFontSize]);

  const computedTheme = React.useMemo(() => {
    const omittedTheme = omit(theme, ['colorSchemes']);
    const { colors, type } = theme.colorSchemes[colorScheme] || {};
    if (isBrowser) {
      if (type === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }

    const normalizedTheme = {
      ...omittedTheme,
      ...units,
      colors,
    };

    if (baseFontSize !== htmlFontSize) {
      const { fontSize, lineHeight, spacing, screens, radius } = theme;
      const diff = baseFontSize / htmlFontSize;
      normalizedTheme.fontSize = crawlSizes(fontSize, diff);
      normalizedTheme.lineHeight = crawlSizes(lineHeight, diff);
      normalizedTheme.spacing = crawlSizes(spacing, diff);
      normalizedTheme.screens = crawlSizes(screens, diff);
      normalizedTheme.radius = crawlSizes(radius, diff);
    }

    return toCSSVar(normalizedTheme);
  }, [theme, colorScheme, pickedColorScheme, units]);

  useSafeEffect(() => {
    if (isBrowser) updateThemeVariables(computedTheme.__cssVars);
  }, [computedTheme]);

  const value = React.useMemo(
    () => ({
      theme: computedTheme,
      preferredColorScheme,
      colorScheme: pickedColorScheme,
      setColorScheme: setPickedColorScheme,
      units: { base: baseFontSize, htmlBase: htmlFontSize },
    }),
    [computedTheme, preferredColorScheme]
  );

  return <GuiContext.Provider value={value}>{children}</GuiContext.Provider>;
}

function crawlSizes(options: ThemeOption, diff: number): ThemeOption {
  return Object.keys(options).reduce((newOptions, optionKey) => {
    const value = options[optionKey];
    let newValue = value;
    if (value) {
      if (typeof value === 'string' && value.includes('rem')) {
        newValue = `${parseFloat(value.replace('rem', '')) * diff}rem`;
      }
      if (typeof value !== 'string') {
        newValue = crawlSizes(value, diff);
      }
    }
    return { ...newOptions, [optionKey]: newValue };
  }, {});
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
