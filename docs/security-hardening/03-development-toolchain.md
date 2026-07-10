# Utvecklingsverktyg och beroendegraf

## Mål

Stäng alla development-alerts genom att uppgradera, ersätta eller ta bort deras verkliga rotägare och lämna en
begriplig lockfil utan onödiga verktygskedjor.

## Problem

96 av 130 Dependabot-alerts är development-scope. En stor del kommer från några få direkta ägare:

- Lerna 8.2.3 och dess Nx/npm/pacote/conventional-changelog-kedjor;
- det gamla `swc`-metapaketet 1.0.11;
- exakt Vite 7.1.1;
- direkta `npm`, `install`, `glob`, `rimraf`, `concurrently` och Storybook-paket;
- gamla, men selector-kompatibla, lockposter.

84 alerts totalt, inklusive P0, kan nå en publicerad patch inom nuvarande selectors. De ska inte lösas genom att
lägga transitiva paket som direkta root dependencies. Resterande patchbara alerts kräver byte av ägare eller en
kortlivad resolution.

## Föreslagen kanonisk ägare

| Alertfamilj                                       | Rotägare/åtgärd                                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| axios, form-data, delar av minimatch/js-yaml/tmp  | uppgradera Lerna till 9.x och låt dess Nx-range landa på säker 22.x                             |
| handlebars                                        | Lerna conventional changelog, locka 4.7.9                                                       |
| tar, js-yaml 4.x, sigstore/core, diff, ip-address | ta bort direkt `npm`; uppgradera Lerna/pacote och använd smal resolution vid exakt upstream-pin |
| cross-spawn, file-type, brace-expansion           | ersätt `swc` med direkta `@swc/cli` och `@swc/core`                                             |
| Vite, Rollup, esbuild                             | återanvänd PR #504:s Vite 8; uppgradera Storybook och locka esbuild minst 0.28.1                |
| shell-quote                                       | uppgradera Concurrently till en version som äger 1.8.4                                          |
| glob/minimatch/@isaacs/brace-expansion            | uppgradera direkta glob/rimraf och Lerna/SWC-föräldrar                                          |
| flatted, ajv, @babel/core                         | uppgradera ESLint/Storybook-kedjor eller deras tillåtna lockposter                              |
| immutable                                         | uppgradera Sass                                                                                 |
| picomatch/yaml                                    | uppdatera till tillåtna patchar; Tailwind 4 endast som separat majorbeslut                      |

## Arbetsordning

### P1 – selector-kompatibla patchar

Dela lockuppdateringen per direkta ägare. En PR får gärna stänga flera alerts när de har samma rot, men blanda inte
runtime, Lerna, Storybook och CSS-toolchain i en enda Dependabot-grupp.

För varje grupp:

1. dokumentera före-version, selector och dependency path med `yarn why`;
2. uppdatera den tillåtna lockposten eller den direkta patch/minor-versionen;
3. verifiera att inga nya versioner utanför deklarerade selectors smygs in;
4. kör full CI och kontrollera ny SBOM/Dependabot-rescan efter merge.

### P1 – ta bort döda direkta dependencies

- `npm` används som CLI i README/Docker, inte som importerad root-modul. Ta bort root `npm` efter att release- och
  Lerna-kommandon verifierats med den Node-distribuerade CLI:n. Det kapar en stor tar/pacote/sigstore/diff-kedja.
- Paketet `install` har ingen identifierad användning. Ta bort det efter ren checkout och full build.
- `http-server` hanteras i runtime-planen och tas bort om `storybook:prod` saknar verklig konsument.

### P1 – modernisera byggägare

- Ersätt `swc` 1.0.11 med explicita, kompatibla `@swc/cli` och `@swc/core`. Alla paket fortsätter använda samma
  `.swcrc`-filer och buildscriptens observerbara output ska vara oförändrad.
- Uppgradera Lerna till 9.x och använd senaste kompatibla Nx 22.x inom Lernas deklarerade range. Kontrollera
  oberoende versionering, `lerna run`, Nx-cache och releasekommandon. Lerna 9.0.7 är inte ensamt tillräckligt: den
  pinnar fortfarande tar 7.5.11 och js-yaml 4.1.1. Använd smala overrides till minst tar 7.5.16 och js-yaml 4.2.0
  tills Lerna uppdaterat sina pins. Tvinga inte alla js-yaml-konsumenter till v4; vissa behöver den patchade 3.x-linjen.
- Återanvänd Vite 8.1.4-migreringen i PR #504. Den tar bort Vite 7/Rollup-kedjan och ersätter
  `vite-tsconfig-paths` med Vites inbyggda path resolution i den testade konfigurationen.
- Uppgradera Storybook-familjen atomiskt till samma patchversion. Säkerställ att dess esbuild-range tillåter minst
  0.28.1 och att alla Storybook-paket fortsätter ha exakt samma version. Ta bort direkt `@storybook/cli` om
  `storybook`-paketet fortsatt levererar samma CLI; det minskar codemod/Babel/tmp/glob-kedjan.
- Uppgradera Concurrently inom v9 till en version som äger shell-quote 1.8.4, samt glob och rimraf till supportade
  versioner för Node 22.
- Uppgradera ESLint-familjen inom v9, Sass inom v1 och Tailwind inom v3 innan majors övervägs. Detta räcker för
  flatted/ajv/immutable och delar av picomatch/yaml utan att blanda in ESLint 10 eller Tailwind 4.

### Tillfälliga resolutions

En resolution får bara införas när senaste direkta ägaren fortfarande pinnar en sårbar leaf. Kandidater är exempelvis
`tar` minst 7.5.16, js-yaml 4.2.0 för en v4-kedja, `esbuild` minst 0.28.1, PostCSS säker 8.5.x för Next och uuid minst
11.1.1. Innan merge krävs:

- bevis att leaf-API:t som föräldern använder är kompatibelt;
- riktade tester av förälderns kommando/runtime;
- kommentar eller planrad med upstream-issue och raderingsvillkor;
- kontroll att resolutionen inte tvingar andra konsumenter över en inkompatibel major.

## Återanvänd, flytta och ta bort

- Återanvänd PR #504:s tester, Vite 8 och Node 22-körning.
- Flytta SWC-ägarskapet från ett övergivet metapaket till officiella CLI/core-paket.
- Ta bort `npm`, `install`, `vite-tsconfig-paths`, gammalt `swc` och deras döda lockkedjor när verifiering passerar.
- Sammanfoga inte Lerna/Nx-uppgradering med mekanisk EOL-normalisering.

## Medvetet oförändrat

- Yarn 1 byts inte i denna sanering. Lägg `packageManager`/Node-kontrakt, men gör en eventuell Yarn-migrering separat.
- Tailwind 4-PR #465 återupplivas inte enbart för picomatch/yaml-patchar.
- Egna paketversioner ändras inte manuellt.

## Acceptanskriterier

- 0 development-scope Dependabot-alerts efter rescan.
- `yarn why` visar inga sårbara versioner från inventeringen.
- Root-manifestet innehåller inte transitiva leaf-paket enbart för att tysta scanner, med undantag för dokumenterade
  tillfälliga resolutions.
- `npm`, `install`, `http-server`, `swc` och `vite-tsconfig-paths` är borttagna om verifieringen bekräftar att de är
  ersatta eller döda.
- Lerna run/build/version dry-run och Nx-cache fungerar på Node 22.
- ESM-, CJS- och type-output för representativa paket är oförändrade eller uttryckligt godkända.

## Validering

```sh
yarn install --frozen-lockfile
yarn lint
yarn test:coverage
yarn build:nocache
yarn test:storybook
yarn build:storybook
yarn lerna list
yarn audit --level low
```

Kör dessutom `yarn why <paket>` för samtliga 36 paket i inventeringen och jämför lockfilens versionsmängd före/efter.

## Risk och recovery

Lerna, Nx, SWC, Vite och Storybook är djupa ägare med stor blast radius. De ska vara separata PR:er med full CI. En
resolution som bryter en exakt upstream-pin tas bort och PR:n blockeras tills föräldern kan uppgraderas eller ersättas.
Revert av en toolchain-PR får inte samtidigt återställa redan mergade P0-fixar.
