import { colors } from "./colors";
import { GuiTheme, ColorScheme } from "./types";

// light theme
export const lightScheme: ColorScheme = {
  id: "light",
  type: "light",
  colors: {
    bg: {
      base: "#ffffff",
      fill: colors.background.two,
    },
    text: {
      foreground: "#000000",
      muted: "#E4E4E5",
    },
    primary: colors.vattjom,
    secondary: colors.gronsta,
    neutral: colors.svartvik,
  },
};

// dark theme
export const darkScheme: ColorScheme = {
  id: "dark",
  type: "dark",
  colors: {
    bg: {
      base: "#ffffff",
      fill: colors.background.two,
    },
    text: {
      foreground: colors.svartvik["100"],
      muted: colors.svartvik["300"],
    },
    primary: colors.vattjom,
    secondary: colors.gronsta,
    neutral: colors.svartvik,
  },
};

export const defaultTheme: GuiTheme = {
  cursor: "pointer",
  rounded: "0.375rem", // md
  colorSchemes: {
    light: lightScheme,
    dark: darkScheme,
  },
  config: {},
};
