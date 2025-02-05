import { ColorSchemeMode, defaultTheme } from '@sk-web-gui/theme';
import { MemoizedGuiProvider } from './theme-helpers';
import { useDarkMode } from './use-darkmode';

export const WithGuiDecorator = (StoryFn: any) => {
  const isDark = useDarkMode();

  return (
    <MemoizedGuiProvider theme={defaultTheme} colorScheme={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}>
      <div id="story-wrapper">
        <StoryFn />
      </div>
    </MemoizedGuiProvider>
  );
};
