import { ColorSchemeMode, defaultTheme } from '@sk-web-gui/theme';
import { themes } from '@storybook/theming';
import React from 'react';
import { MemoizedDocsContainer, MemoizedGuiProvider } from './theme-helpers';
import { useBrandTheme } from './use-brand-theme';
import { useDarkMode } from './use-darkmode';

interface ParametersContainerProps {
  children: any;
  context: any;
}
export const ParametersContainer: React.FC<ParametersContainerProps> = ({ children, context }) => {
  const isDark = useDarkMode();
  // Docs pages render here instead of through WithGuiDecorator, so the org-theme
  // toolbar global is picked up via the channel and forwarded to the provider.
  const brandTheme = useBrandTheme(context?.globals?.brandTheme as string | undefined);

  const theme = React.useMemo(
    () => ({
      ...(isDark ? themes.dark : themes.light),
    }),
    [isDark]
  );

  return (
    <div className="docs-wrapper">
      <MemoizedDocsContainer context={context} theme={theme}>
        <MemoizedGuiProvider
          theme={defaultTheme}
          colorScheme={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}
          brandTheme={brandTheme}
        >
          {children}
        </MemoizedGuiProvider>
      </MemoizedDocsContainer>
    </div>
  );
};
