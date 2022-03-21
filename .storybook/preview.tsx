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
      order: [
        'Intro',
        'Identitet',
        'Sidor',
        'DesignSystem',
        'Design System',
        'Komponenter',
        'Komponenter/**/Översikt',
        'Komponenter/**/Komponent',
        'Komponenter/Accordions',
        'Komponenter/Knappar',
        'Komponenter/Kort',
        'Komponenter/Toggel',
        'Komponenter/Radioknappar',
        'Komponenter/Kryssrutor',
        'Komponenter/Avdelare',
        'Komponenter/Brödsmulor',
        'Komponenter/Sök',
        'Komponenter/Etiketter/Taggar',
        'Komponenter/Dropdown',
        'Komponenter/Textfält',
        'Komponenter/Meny',
        'Komponenter/Länkar',
        'Komponenter/Filtering',
        'Komponenter/Tabeller',
        'Guider',
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
