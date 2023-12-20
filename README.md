# GUI

Detta projekt innehåller styling och komponenter som används för att bygga avancerade webbappar för Sundsvalls Kommun.

## Installation

Det finns just nu komponenter endast för React och för att använda stylingen så måste du ha Tailwindcss i projektet.

**NPM**

```
npm i @sk-web-gui/core @sk-web-gui/react @tailwindcss/forms
```

**Yarn**

```
yarn add @sk-web-gui/core @sk-web-gui/react @tailwindcss/forms
```

Lägg till `sk-web-gui/core` och `tailwindcss/forms` i din Tailwindcss-configfil.

```TypeScript
// tailwind.config.js
module.exports = {
  mode: "jit",
  content: [
    // ...
    './node_modules/@sk-web-gui/*/dist/**/*.js', // path to sk-web-gui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1140px',
      // => @media (min-width: 1280px) { ... }
    },
    maxWidth: {
      content: '150rem' //Set max width for content
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@sk-web-gui/core"),
  ],
};
```

eller använd som preset med valbara inställningar:

```Typescript
// tailwind.config.js
module.exports = {
  ...
  content: [
    // ...
    './node_modules/@sk-web-gui/*/dist/**/*.js', // path to sk-web-gui
  ],
  presets: [require('@sk-web-gui/core').preset({ tailwindForms: true, plugin: { colors: [], cssBase: true } })],
  ...
}
```

Wrappa din React-app med `GuiProvider` för att få stylingen.

```TypeScript
import React from "react";
import { GuiProvider, Button } from "@sk-web-gui/react";
​
function App() {
  return (
    <GuiProvider>
      <Button>Hello World</Button>
    </GuiProvider>
  );
}
```

## Development

**Prerequisites**: Node.js v12+, Yarn v1.22+

Efter kloning, kör:

1. `yarn boot` för att installera alla beroenden samt för att bygga paketen.
2. `yarn dev` för att köra Storybook

## För att skapa nya komponenter

### Styling

Styling för komponenter finns/läggs till i `packages/core`. Skapa en ny komponentfil där stylingen skrivs sedan exportera den i index.

### Komponenter

Skapa ett nytt paket i `packages` där du gör din react-komponent exportera den sedan via `packages/react`. Kom igår att även lägga till de nya paketen i `packages/react/package.json`. Använd Storybook för att testa och dokumentera komponenten.

## Release

Testa så den bygger riktigt samt kika över så komponentberoenden fungerar som tänkt:

```
npx lerna version --no-git-tag-version --no-push
```

Om allt ser bra ut:

```
git restore .
```

Sedan publicera release:

```
npx lerna version
npx lerna publish from-git
```
