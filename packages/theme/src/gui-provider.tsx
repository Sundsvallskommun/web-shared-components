import {
  walkObject,
  omit,
  toRGB,
  deepmerge,
  WithCSSVar,
  Dict,
} from "@sk-web-gui/utils";
import * as React from "react";
import { createContext, useContext, useMemo } from "react";
import set from "lodash.set";

import { defaultTheme } from "./default-theme";
import { toCSSVar } from "./create-theme-vars";
import { useSafeEffect } from "./use-safe-effect";
import { isBrowser } from "./utils";
import { GuiTheme, GuiThemeOverride } from "./types";

interface DictGuiTheme extends Dict {}

export const GuiContext = createContext<
  | {
      theme: WithCSSVar<DictGuiTheme>;
    }
  | undefined
>(undefined);

GuiContext.displayName = "GuiContext";

export interface GuiProviderProps {
  children: React.ReactNode;
  theme?: GuiTheme;
  colorScheme?: string;
}

export function GuiProvider({
  theme = defaultTheme,
  colorScheme = "light",
  children,
}: GuiProviderProps) {
  const computedTheme = useMemo(() => {
    const omittedTheme = omit(theme, ["colorSchemes"]);
    const { colors, type } = theme.colorSchemes[colorScheme] || {};
    if (isBrowser) {
      if (type === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }

    walkObject(colors, (value, path) => {
      if (typeof value !== "string") return;
      const rgb = toRGB(value);
      if (rgb) set(colors, path, rgb.join(","));
    });

    const normalizedTheme = {
      ...omittedTheme,
      colors,
    };

    return toCSSVar(normalizedTheme);
  }, [theme, colorScheme]);

  useSafeEffect(() => {
    if (isBrowser) updateThemeVariables(computedTheme.__cssVars);
  }, [computedTheme]);

  const value = useMemo(
    () => ({
      theme: computedTheme,
    }),
    [computedTheme]
  );

  return (
    <GuiContext.Provider value={value}>{children}</GuiContext.Provider>
  );
}

function setStyleVariable(name: string, value: string) {
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty(name, value);
}

function updateStyleHelper(_themeKey: string, style: string) {
  const themeKey = _themeKey.startsWith("--") ? _themeKey : `--${_themeKey}`;
  setStyleVariable(themeKey, style);
}

function updateThemeVariables(vars: Record<string, string>) {
  Object.entries(vars).forEach(([key, val]) => {
    updateStyleHelper(key, val);
  });
}

export function useGui<T extends object = Dict>() {
  const theme = useContext(
    (GuiContext as unknown) as React.Context<T | undefined>
  );
  if (!theme) {
    throw Error(
      "useGui: `theme` is undefined. Seems you forgot to wrap your app in `<GuiProvider />`"
    );
  }

  return theme as WithCSSVar<T>;
}

export function extendTheme(themeOverride: GuiThemeOverride): GuiTheme {
  return deepmerge(defaultTheme, themeOverride, { clone: true }) as GuiTheme;
}
