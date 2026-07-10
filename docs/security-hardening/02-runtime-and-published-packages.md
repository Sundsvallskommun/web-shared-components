# Runtime och publicerade paket

## Mål

Ta bort alla sårbara runtime-kedjor och säkerställ att publicerade paket inte annonserar stöd för kända osäkra
peer-versioner. Den visuella designen ska bestå.

## Nuvarande och föreslagen ägare

| Kedja                     | Nuvarande ägare                            | Föreslagen kanonisk ägare                                                 |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------------------- |
| Next 15.5.3               | `packages/next*` dev- och peerDependencies | samma tre paket, med säkert peer-minimum                                  |
| Quill 2.0.3 och lodash-es | `packages/text-editor`                     | editor-neutralt publikt kontrakt i `packages/text-editor`                 |
| Speech SDK, uuid 9 och ws | `packages/ai`                              | `packages/ai` samt verifierad tillfällig resolution om upstream blockerar |
| mdast-util-to-hast        | `packages/ai` via react-markdown           | `react-markdown`-ägaren och lockfilen                                     |
| PostCSS                   | root, `packages/core` och Next             | respektive direkta manifest; visuella regler fortsatt i core              |
| qs/follow-redirects       | root `http-server`                         | ta bort oanvänd serverkedja eller ersätt med befintlig dev-server         |

## Arbete

### P0 – Next

- Uppgradera den installerade Next-versionen från 15.5.3 till minst 15.5.18, normalt senaste 15.5.x, i `packages/next`,
  `packages/next-card` och `packages/next-link`.
- Höj peer-minimum från 15.0.x till minst 15.5.18. Detta är ett medvetet konsumentkontrakt och ska behandlas som en
  releasepåverkande ändring av berörda paket utan manuella versionsediter.
- Lägg kontraktstest för wrapper-API:n kring `next/link` och `next/image`. Testa minst href/props-forwarding,
  bildmetadata och server-/client-importer som paketen stödjer.
- Next 16 är ett separat majorbeslut. Börja med den säkra 15.5-linjen för att minimera återställningskostnaden.

### P1 – övriga patchbara runtime-kedjor

- Uppdatera `react-markdown`-kedjan så att `mdast-util-to-hast` är minst 13.2.1.
- Uppdatera Speech SDK och ws. Om senaste Speech SDK fortfarande kräver uuid 9, verifiera uuid 11.1.1 eller senare
  genom en smal resolution och kör tal-/översättningskontrakt. Resolutionen ska tas bort när SDK:n deklarerar en
  säker uuid-linje.
- Ta bort root-beroendet `http-server` om `storybook:prod` inte används i deployment. Storybook/MCP-containern har
  redan en egen server. Om scriptet måste finnas ska en underhållen, låst server väljas och qs/follow-redirects
  verifieras som säkra.
- Uppdatera root och `packages/core` till aktuell säker PostCSS 8.5.x, minst 8.5.10. Next 15.5.x och även den
  granskade Next 16-linjen pinnar fortfarande PostCSS 8.4.31. Lägg därför en smal, dokumenterad override till en
  säker 8.5.x och verifiera en riktig Next-fixture tills upstream inte längre behöver overriden.

### P1 – ersätt Quill, inte bara XSS-mitigera

Quill 2.0.3 har ett runtime-XSS-fynd i HTML-export och ingen publicerad patch. Sanitering runt nuvarande API minskar
risk men stänger inte Dependabot. Nollmålet kräver att Quill tas bort eller att en ägd, patchad fork underhålls.

Rekommenderad ordning:

1. Karaktärisera nuvarande kontrakt: `TextEditorValue`, markup/plain text, toolbar tokens, read-only, visual zoom,
   selection/change-events, ref-API, listor, länkar och keyboard/tillgänglighet.
2. Definiera egna `TextEditorHandle`, change- och selection-typer. Publika typer får inte importera `Quill`, `Delta`
   eller `Range`.
3. Välj en aktiv editor-engine efter en kort spike. Kräv React 19-stöd, tillgängligt keyboardbeteende, kontrollerad
   HTML-import/export, licensgodkännande, liten dependency-yta och 0 kända alerts.
4. Implementera en tunn intern adapter. Sanera och normalisera både inkommande och exporterad markup vid den
   kanoniska HTML-gränsen.
5. Flytta Quill-specifika `.ql-*`-selectors i `packages/core/src/components/text-editor.ts` till engine-neutrala
   `.sk-texteditor-*`-states. Inga designvärden flyttas till komponentpaketet.
6. Ta bort Quill, lodash-es, Quill-CSS, Quill-listkonvertering och Quill-typer när motsvarande kontrakt är testat.

`@sk-web-gui/text-editor` exporteras inte via `packages/react`, så ingen ny umbrella-export ska läggas till.

## Återanvänd, flytta och ta bort

- Återanvänd `TextEditorValue`, toolbar-konfiguration, Storybook-scenarier och core-tokens som önskat
  produktkontrakt.
- Flytta engine-specifika event till en privat adapter och låt paketet äga stabila, engine-neutrala värdeobjekt.
- Ta bort `quill`, `lodash-es`, `quill/dist/quill.snow.css` och `.ql-*` först när ersättningen täcks av tester.
- Ta bort `http-server` och `storybook:prod` om usage-sökning och deploymentkontroll bekräftar att de är döda.

## Medvetet oförändrat

- Texteditorns visuella design, svenska labels och befintliga toolbar-funktioner ändras inte utan ett separat
  designbeslut.
- `packages/react` ändras inte.
- Next 16 och Tailwind 4 blandas inte in i runtime-saneringen om de inte blir tekniskt nödvändiga.

## Acceptanskriterier

- Alla 34 runtime-klassade Dependabot-alerts är stängda efter rescan.
- Next är minst 15.5.18 och peer-ranges tillåter inte sårbara 15.0–15.5.17 som lägsta supportnivå.
- Next-fixturen bevisar build/dev/start med den säkra PostCSS-overriden.
- Quill och lodash-es saknas i manifest, lockfil och SBOM.
- Texteditorns publika typer nämner inte vald editor-engine.
- HTML-regressionstest täcker script/event-attribut, farliga URL-scheman, listor och round-trip.
- Speech-, markdown-, Next- och texteditor-stories/kontrakt passerar.

## Validering

```sh
yarn why next
yarn why quill
yarn why lodash-es
yarn why uuid
yarn why ws
yarn why mdast-util-to-hast
yarn test:unit
yarn test:storybook
yarn build
yarn build:storybook
```

För texteditorn ska Storybook dessutom verifieras visuellt och med keyboard i Chromium.

## Risk och recovery

Next peer-minimum och texteditorns Quill-bundna typer kan påverka konsumenter. Publicera dem med korrekt
releaseklassificering via repoets releaseägare, inte genom manuella versioner. Texteditorbytet görs i en egen PR och
kan revertas oberoende. Om en editor-engine faller på kontrakten avbryts spiken innan Quill tas bort; en permanent
dismissal är inte recovery.
