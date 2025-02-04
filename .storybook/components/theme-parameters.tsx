import { ColorSchemeMode, defaultTheme } from '@sk-web-gui/theme';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import React from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { MemoizedDocsContainer, MemoizedGuiProvider } from './theme-helpers';
import { htmlIsDark, useDarkMode } from './use-darkmode';

const channel = addons.getChannel();
interface ParametersContainerProps {
  children: any;
  context: any;
}
export const ParametersContainer: React.FC<ParametersContainerProps> = ({ children, context }) => {
  const isDark = useDarkMode();

  const theme = React.useMemo(
    () => ({
      ...(isDark ? themes.dark : themes.light),
    }),
    [isDark]
  );

  return (
    <div className="docs-wrapper">
      <MemoizedDocsContainer context={context} theme={theme}>
        <MemoizedGuiProvider theme={defaultTheme} colorScheme={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}>
          {children}
        </MemoizedGuiProvider>
      </MemoizedDocsContainer>
    </div>
  );
};
