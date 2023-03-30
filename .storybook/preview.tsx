import React from 'react';
import { GuiProvider, extendTheme, defaultTheme } from '@sk-web-gui/react';
import { useState, useMemo } from 'react';
import { withPerformance } from 'storybook-addon-performance';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import './styles.css';

export const parameters = {
  viewMode: 'docs',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Intro', 'Identitet', 'Sidor', 'Komponenter', 'Design System'],
    },
    configureJSX: true,
    babelOptions: {},
    sourceLoaderOptions: null,
  },
};

const withGui = (StoryFn: Function) => {
  const [colorScheme, setColorScheme] = useState('light');
  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === 'light' ? 'pointer' : 'default',
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );

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

  return (
    <GuiProvider colorScheme={colorScheme}>
      <div id="story-wrapper">
        <StoryFn />
      </div>
    </GuiProvider>
  );
};

export const decorators = [withGui, withPerformance];
