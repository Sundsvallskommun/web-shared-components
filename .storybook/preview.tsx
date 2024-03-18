import React, { useEffect } from 'react';
import { GuiProvider, extendTheme, defaultTheme } from '@sk-web-gui/theme';
import { useState, useMemo } from 'react';
import './styles.scss';
import { Canvas, DocsContainer, DocsContainerProps } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode';
import { addons } from '@storybook/preview-api';

export const ComponentPreview = ({ children }) => {
  return (
    <div className="docs-preview">
      <Canvas layout="fullscreen" sourceState="none" className="docs-preview-canvas">
        {children}
      </Canvas>
    </div>
  );
};

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
    // container: DocsContainer,
    container: (props: DocsContainerProps) => {
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
          <div className="docs-wrapper">
            <DocsContainer {...props} />
          </div>
        </GuiProvider>
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
