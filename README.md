# SK Web GUI

Detta projekt innehåller styling och komponenter som används för att bygga avancerade webbappar för Sundsvalls Kommun.

## Installation

**NPM**

```bash
npm install @sk-web-gui/core @sk-web-gui/react
```

**Yarn**

```bash
yarn add @sk-web-gui/core @sk-web-gui/react
```

## Användning med Tailwind CSS 4

I din CSS-fil (t.ex. `globals.css` eller `app.css`):

```css
@import "tailwindcss";
@import "@sk-web-gui/core/style.css";
@source "@sk-web-gui/core";
```

`@import "tailwindcss"` | Laddar Tailwind CSS 4 
`@import "@sk-web-gui/core/style.css"` | Laddar tema, färger, typografi och komponent-stilar 
`@source "@sk-web-gui/core"` | Skannar biblioteket för använda Tailwind-klasser 

### Individuella imports

Om du vill ha mer kontroll över vad som laddas:

```css
@import "tailwindcss";

/* Bas */
@import "@sk-web-gui/core/theme.css";
@import "@sk-web-gui/core/base.css";
@import "@sk-web-gui/core/colors.css";
@import "@sk-web-gui/core/typography.css";
@import "@sk-web-gui/core/variants.css";

/* Endast de komponenter du behöver */
@import "@sk-web-gui/core/components/button.css";
@import "@sk-web-gui/core/components/card.css";
/* ... */

@source "@sk-web-gui/core";
```

### React-komponenter

Wrappa din React-app med `GuiProvider`:

```tsx
import { GuiProvider, Button } from "@sk-web-gui/react";

function App() {
  return (
    <GuiProvider>
      <Button>Hello World</Button>
    </GuiProvider>
  );
}
```

## Migrering från Tailwind CSS 3

### Före (TW3)

```js
// tailwind.config.js
module.exports = {
  content: ['./node_modules/@sk-web-gui/*/dist/**/*.js'],
  darkMode: 'selector',
  presets: [require('@sk-web-gui/core').preset()],
};
```

### Efter (TW4)

```css
/* globals.css */
@import "tailwindcss";
@import "@sk-web-gui/core/style.css";
@source "@sk-web-gui/core";
```

## För utveckling

**Prerequisites**: Node.js v20+, Yarn v1.22+

Efter kloning, kör:

1. `yarn` för att installera alla beroenden
2. `yarn dev` för att köra Storybook i utvecklingsläge

## För att skapa nya komponenter

### Styling

Styling för komponenter finns i `packages/core/src/components/`. Skapa en ny CSS-fil och importera den i `packages/core/src/style.css`.

### Komponenter

Skapa ett nytt paket i `packages` där du gör din React-komponent. Exportera den sedan via `packages/react`. Kom ihåg att även lägga till de nya paketen i `packages/react/package.json`. Använd Storybook för att testa och dokumentera komponenten.

## Release av npm-paket

Testa så den bygger riktigt samt kika över så komponentberoenden fungerar som tänkt:

```bash
npx lerna version --no-git-tag-version --no-push
```

Om allt ser bra ut:

```bash
git restore .
```

Sedan publicera release:

```bash
npx lerna version
npx lerna publish from-git
```
