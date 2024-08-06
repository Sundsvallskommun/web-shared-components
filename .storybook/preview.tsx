import { GuiProvider, defaultTheme, extendTheme } from '@sk-web-gui/theme';
import { DocsContainer } from '@storybook/addon-docs';
import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode';
import './styles.scss';

const channel = addons.getChannel();

const parameters: Preview['parameters'] = {
  viewMode: 'docs',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Intro', 'Identitet', 'Sidor', 'Komponenter', 'Design System'],
    },
  },
  darkMode: {
    stylePreview: true,
  },
  controls: { hideNoControlsWarning: true },
  docs: {
    source: {
      type: 'code',
      transform: (code, storyContext) => {
        return `
        import { ${storyContext.name} } from '@sk-web-gui/react';

${code}`;
      },
    },
    //
    // this applies to MDX and docs tab
    //
    container: ({ children, context }) => {
      const [isDark, setDark] = useState();

      useEffect(() => {
        // listen to DARK_MODE event
        channel.on(DARK_MODE_EVENT_NAME, setDark);
        return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
      }, [channel, setDark]);

      const theme = useMemo(
        () =>
          extendTheme({
            cursor: !isDark ? 'pointer' : 'default',
            colorSchemes: defaultTheme.colorSchemes,
          }),
        [isDark]
      );

      return (
        <div className="docs-wrapper">
          <DocsContainer context={context}>
            <GuiProvider theme={theme} colorScheme={isDark ? 'dark' : 'light'}>
              {children}
            </GuiProvider>
          </DocsContainer>
        </div>
      );
    },
  },
};

const withGui = (StoryFn) => {
  const [isDark, setDark] = useState(useDarkMode());

  useEffect(() => {
    // listen to DARK_MODE event
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  const theme = useMemo(
    () =>
      extendTheme({
        cursor: !isDark ? 'pointer' : 'default',
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [isDark]
  );

  return (
    <GuiProvider theme={theme} colorScheme={isDark ? 'dark' : 'light'}>
      <div id="story-wrapper">
        <StoryFn />
      </div>
    </GuiProvider>
  );
};

export const decorators: Preview['decorators'] = [withGui];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
