import { ColorSchemeMode, defaultTheme } from '@sk-web-gui/theme';
import { MemoizedGuiProvider } from './theme-helpers';
import { useBrandTheme } from './use-brand-theme';
import { useDarkMode } from './use-darkmode';

export const WithGuiDecorator = (StoryFn: any, context: any) => {
  const isDark = useDarkMode();
  const brandTheme = useBrandTheme(context.globals?.brandTheme as string | undefined);

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
