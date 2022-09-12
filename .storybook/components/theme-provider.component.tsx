import { GuiProvider } from './../../packages/theme';

export function ThemeProvider({ children }) {
  return <GuiProvider /*theme={theme}*/ colorScheme="light">{children}</GuiProvider>;
}
