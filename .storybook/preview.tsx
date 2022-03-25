import { GuiProvider, extendTheme, defaultTheme } from "@sk-web-gui/react";
import { useState, useMemo } from "react";
import { withPerformance } from "storybook-addon-performance";
//import { light, dark, /* midnight, pale, dawn, bee, cool */ } from "./themes";
//import { Button } from "@sk-web-gui/button";

import "./styles.css";

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: "^on[A-Z].*" },
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
            'Meny',
            'Länkar',
            'Filtering',
            'Tabeller',
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
          'Meny',
          'Länkar',
          'Filtering',
          'Tabeller',
          'WIP',
          '/**/Översikt',
          '/**/Komponent',
        ],
        'Guider',
        [
          'Att skapa nya komponenter',
          'Hur vi designar webbplatser för SiteVision',
          [
            'Webbvy',
            'Mobilvy'
          ]
        ],
        '*',
        'WIP'
      ],
    },
  },
};

const withGui = (StoryFn: Function) => {
  const [colorScheme, setColorScheme] = useState("light");
  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === "light" ? "pointer" : "default",
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );

  return (
    <GuiProvider /*theme={theme}*/ colorScheme={colorScheme}>
      <div
        id="story-wrapper"
        className="space-y-4"
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
