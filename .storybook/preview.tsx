import { GuiProvider, extendTheme, defaultTheme } from '@sk-web-gui/react';
import { useState, useMemo } from 'react';
import { withPerformance } from 'storybook-addon-performance';
//import { light, dark, /* midnight, pale, dawn, bee, cool */ } from "./themes";
//import { Button } from "@sk-web-gui/button";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import './styles.css';

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      // includeName: true,
      order: [
        'Intro',
        'Identitet',
        'Sidor',
        'Design System',
        [
          'Komponenter',
          [
            'Accordions',
            'Knappar',
            'Kort',
            'Toggel',
            'Radioknappar',
            'Kryssrutor',
            'Avdelare',
            'Brödsmulor',
            'Sök',
            'Etiketter|Taggar',
            'Dropdown',
            'Textfält',
            'Kalender',
            'Meny',
            'Länkar',
            'Filtering',
            'Tabeller',
            'Pagination',
            'WIP',
            '/**/Översikt',
            '/**/Komponent',
          ],
        ],
        'Komponenter',
        [
          'Accordions',
          'Knappar',
          'Kort',
          'Toggel',
          'Radioknappar',
          'Kryssrutor',
          'Avdelare',
          'Brödsmulor',
          'Sök',
          'Etiketter|Taggar',
          'Dropdown',
          'Textfält',
          'Kalender',
          'Meny',
          'Länkar',
          'Filtering',
          'Tabeller',
          'Pagination',
          'WIP',
          '/**/Översikt',
          '/**/Komponent',
        ],
        'Guider',
        ['Att skapa nya komponenter', 'Hur vi designar webbplatser för SiteVision', ['Webbvy', 'Mobilvy']],
        '*',
        'WIP',
      ],
    },
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
  dayjs.locale('se');
  dayjs.extend(updateLocale);
  dayjs.updateLocale('se', {
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
    <GuiProvider /*theme={theme}*/ colorScheme={colorScheme}>
      <div
        id="story-wrapper"
        // className="space-y-4"
        /*style={{ minHeight: "100vh" }}*/
      >
        <div className="flex mb-4 justify-items-end">
          {/*<Button
            color="primary"
            variant="outline"
            onClick={() =>
              setColorScheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            Change theme
          </Button>*/}
        </div>
        <StoryFn />
      </div>
    </GuiProvider>
  );
};

export const decorators = [withGui, withPerformance];
