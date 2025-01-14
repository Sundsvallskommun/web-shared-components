import { ColorSchemeMode, defaultTheme, extendTheme } from '@sk-web-gui/theme';
import { ThemeContext } from './theme-context';
import { MemoizedGuiProvider } from './theme-helpers';
import { useDarkMode } from 'storybook-dark-mode';
import React from 'react';

export const WithGuiDecorator = (StoryFn: any) => {
  const isDark = useDarkMode();

  const theme = React.useMemo(
    () =>
      extendTheme({
        cursor: !isDark ? 'pointer' : 'default',
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}>
      <MemoizedGuiProvider theme={theme} colorScheme={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}>
        <div id="story-wrapper">
          <StoryFn />
        </div>
      </MemoizedGuiProvider>
    </ThemeContext.Provider>
  );
};
