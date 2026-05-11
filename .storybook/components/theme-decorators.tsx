import { BrandTheme, ColorSchemeMode, defaultTheme } from '@sk-web-gui/theme';
import { MemoizedGuiProvider } from './theme-helpers';
import { useDarkMode } from './use-darkmode';

export const WithGuiDecorator = (StoryFn: any, context: any) => {
  const isDark = useDarkMode();
  const brandTheme = (context.globals?.brandTheme as BrandTheme) || 'sundsvall';

  return (
    <MemoizedGuiProvider
      theme={defaultTheme}
      colorScheme={isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light}
      brandTheme={brandTheme}
    >
      <div id="story-wrapper">
        <StoryFn />
      </div>
    </MemoizedGuiProvider>
  );
};
