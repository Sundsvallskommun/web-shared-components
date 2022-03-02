# GUI

Detta projekt innehåller styling och komponenter som används för att bygga advancerade webbappar för Sundsvalls Kommun.

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

Efter du installerad paketen så måste du lägga till `sk-web-gui/core` och `tailwindcss/forms` i din Tailwindcss-configfil.

```TypeScript
// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: [
    // ...
    "./node_modules/@sk-web-gui/**/*.{js,ts,jsx,tsx}", // path to sk-web-gui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
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
Wrappa din React-app med `GuiProvider` för att få stylingen.

```TypeScript
import * as React from "react";
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
2. `yarn start` för att köra Storybook

## För att skapa nya komponenter

### Styling

Styling för komponenter finns/läggs till i `packages/core`. Skapa en ny komponentfil där stylingen skrivs sedan exportera den i index.

### Komponenter

Skapa ett nytt paket i `packages` där du gör din react-komponent exportera den sedan via `packages/react`. Använd Storybook för att testa och dokumentera komponenten.
