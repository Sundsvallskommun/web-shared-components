import { omit } from '@sk-web-gui/utils';
import React from 'react';
import { toCSSVar } from './create-theme-vars';
import { defaultTheme } from './default-theme';
import { ColorSchemeMode, GuiTheme, ThemeOption } from './types';
import { useSafeEffect } from './use-safe-effect';
import { getPreferredColorScheme, GuiContext, isBrowser } from './utils';

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

  /**
   * Reference to element to add your variables to. Defaults to document.documentElement
   */
  ref?: React.RefObject<HTMLElement | null>;
}

export function GuiProvider({
  theme = defaultTheme,
  colorScheme: _colorScheme,
  baseFontSize = 10,
  htmlFontSize = 10,
  children,
  ref,
}: GuiProviderProps) {
  const [preferredColorScheme, setPreferredColorScheme] =
    React.useState<Exclude<ColorSchemeMode, ColorSchemeMode.System>>(getPreferredColorScheme());
  const [pickedColorScheme, setPickedColorScheme] = React.useState<ColorSchemeMode>(
    _colorScheme || ColorSchemeMode.System
  );

  React.useEffect(() => {
    setPickedColorScheme(_colorScheme || ColorSchemeMode.System);
  }, [_colorScheme]);

  useSafeEffect(() => {
    if (pickedColorScheme === ColorSchemeMode.System) {
      setPreferredColorScheme(getPreferredColorScheme());
    }
  }, [pickedColorScheme]);

  const colorScheme = pickedColorScheme === ColorSchemeMode.System ? preferredColorScheme : pickedColorScheme;
  const _element = ref ? ref?.current : undefined;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseFontSize, htmlFontSize]);

  const computedTheme = React.useMemo(() => {
    const omittedTheme = omit(theme, ['colorSchemes']);
    const { colors, type } = theme.colorSchemes[colorScheme] || {};
    if (isBrowser) {
      const element = _element ?? document.documentElement;
      if (type === 'dark') element.classList.add('dark');
      else element.classList.remove('dark');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, colorScheme, pickedColorScheme, units, _element]);

  useSafeEffect(() => {
    if (isBrowser) {
      const element = _element ?? document.documentElement;
      updateThemeVariables(computedTheme.__cssVars, element);
    }
  }, [computedTheme, _element]);

  const value = React.useMemo(
    () => ({
      theme: computedTheme,
      preferredColorScheme,
      colorScheme: pickedColorScheme,
      setColorScheme: setPickedColorScheme,
      units: { base: baseFontSize, htmlBase: htmlFontSize },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

function setStyleVariable(name: string, value: string, element: HTMLElement) {
  const rootStyle = element.style;
  rootStyle.setProperty(name, value);
}

function updateStyleHelper(_themeKey: string, style: string, element: HTMLElement) {
  const themeKey = _themeKey.startsWith('--') ? _themeKey : `--${_themeKey}`;
  setStyleVariable(themeKey, style, element);
}

function updateThemeVariables(vars: Record<string, string>, element: HTMLElement) {
  Object.entries(vars).forEach(([key, val]) => {
    updateStyleHelper(key, val, element);
  });
}
