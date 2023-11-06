import React, { useEffect } from 'react';
import { GuiProvider, extendTheme, defaultTheme } from '@sk-web-gui/theme';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import './styles.scss';
import { Canvas, DocsContainer, DocsContainerProps } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

export const ComponentPreview = ({ children }) => {
  return (
    <div className="docs-preview">
      <Canvas layout="fullscreen" sourceState="none" className="docs-preview-canvas">
        {children}
      </Canvas>
    </div>
  );
};

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
    //
    // this applies to MDX and docs tab
    //
    // container: DocsContainer,
    container: (props: DocsContainerProps) => {
      const [colorScheme, setColorScheme] = useState(useDarkMode() ? 'dark' : 'light');
      const theme = useMemo(
        () =>
          extendTheme({
            cursor: colorScheme === 'light' ? 'pointer' : 'default',
            colorSchemes: defaultTheme.colorSchemes,
          }),
        [colorScheme]
      );
      const darkMode = useDarkMode();

      useEffect(() => {
        setColorScheme(darkMode ? 'dark' : 'light');
      }, [darkMode]);

      return (
        <GuiProvider theme={theme} colorScheme={colorScheme}>
          <div id="docs-wrapper">
            <DocsContainer {...props} />
          </div>
        </GuiProvider>
      );
      // return (
      //   <div id="docs-wrapper">
      //     <DocsContainer {...props} />
      //   </div>
      // );
    },
  },
};

dayjs.extend(utc);
dayjs.locale('sv');
dayjs.extend(updateLocale);
dayjs.updateLocale('sv', {
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  weekdays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
  weekdaysShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'],
  weekdaysMin: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
});

const withGui = (StoryFn: Function) => {
  const [colorScheme, setColorScheme] = useState(useDarkMode() ? 'dark' : 'light');
  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === 'light' ? 'pointer' : 'default',
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );
  const darkMode = useDarkMode();

  useEffect(() => {
    setColorScheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  console.log('darkMode', darkMode, colorScheme);

  return (
    <GuiProvider theme={theme} colorScheme={colorScheme}>
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
