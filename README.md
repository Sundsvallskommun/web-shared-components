# GUI

Detta projekt innehåller styling och komponenter som används för att bygga avancerade webbappar för Sundsvalls Kommun.

## För implementation i app

Det finns just nu komponenter endast för React och för att använda stylingen så måste du ha Tailwindcss i projektet.

**NPM**

```
npm i @sk-web-gui/core @sk-web-gui/react && npm i --save-dev @tailwindcss/forms @tailwindcss/container-queries
```

**Yarn**

```
yarn add @sk-web-gui/core @sk-web-gui/react && yarn add -D @tailwindcss/forms @tailwindcss/container-queries
```

Lägg till `sk-web-gui/core`, `tailwindcss/forms` och `tailwindcss/container-queries` i din Tailwindcss-configfil.

```TypeScript
// tailwind.config.js
module.exports = {
  content: [
    //...
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  theme: {
    // extend: {
    // if you want to override max content width
    // maxWidth: {
    //   content: screens['desktop-max'], // default in core is based on screens
    // },
  },
  darkMode: 'selector', // or 'media' or 'selector'
  plugins: [require('@tailwindcss/forms'), require('@sk-web-gui/core')],
};
```

eller använd som preset med valbara inställningar (default inkluderar exempelvis @tailwindcss/forms samt @tailwindcss/container-queries):

```Typescript
// tailwind.config.js
module.exports = {
  content: [
    //...
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  theme: {
    // extend: {
    // if you want to override max content width
    // maxWidth: {
    //   content: screens['desktop-max'], // default in core is based on screens
    // },
  },
  darkMode: 'selector', // or 'media' or 'selector'
  presets: [require('@sk-web-gui/core').preset()],
};
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

## För utveckling

**Prerequisites**: Node.js v20+, Yarn v1.22+

Efter kloning, kör:

1. `yarn` för att installera alla beroenden
2. `yarn dev` för att köra Storybook i utvecklingsläge

## För att skapa nya komponenter

### Styling

Styling för komponenter finns/läggs till i `packages/core`. Skapa en ny komponentfil där stylingen skrivs sedan exportera den i index.

### Komponenter

Skapa ett nytt paket i `packages` där du gör din react-komponent. Exportera den sedan via `packages/react`. Kom ihåg att även lägga till de nya paketen i `packages/react/package.json`. Använd Storybook för att testa och dokumentera komponenten.

## Release av npm-paket

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
