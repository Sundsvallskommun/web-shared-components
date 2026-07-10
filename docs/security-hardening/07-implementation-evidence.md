# Implementeringsbevis och kvarstående aktivering

## Leveransläge

Arbetet är implementerat på `fix/security-hardening`, stackat direkt på PR #504:s head
`origin/feature/vitest-unit-tests@2c67dbe45349076730e56c44c0564c1d8cb5a185`. Testbranchens merge-base är aktuell
`origin/main@c09ddac0079c7b8434a15ee5a9b039b8882fa19e`. Det gör att säkerhets-PR:n bara visar säkerhetsändringarna och
inte kopierar PR #504:s 144 filer. När PR #504 har mergats ska säkerhets-PR:n riktas om till `main`. De konflikterande
Dependabot-brancherna #488–#490 har granskats men inte mergats.

Inga alerts har avfärdats och inga versionsnummer för repoets egna paket har ändrats manuellt. Leveransen är uppdelad
i fyra fokuserade conventional commits: dependency/runtime, CodeQL-verktygsfixar, CI/MCP/container och dokumentation.

## Före och lokal efterkontroll

| Scope                 | `main` före åtgärd     | Lokal branch efter åtgärd                                     |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| Dependabot            | 130 öppna              | 0 av de 130 sårbarhetsintervallen matchar aktuell `yarn.lock` |
| CodeQL                | 2 öppna                | båda kodvägarna åtgärdade och regressionstestade              |
| Secret scanning       | 0 öppna                | fortsatt 0; push protection lämnas aktiverad                  |
| Root dependency audit | alerts i låsfilen      | `yarn audit --level low`: 0                                   |
| MCP dependency audit  | ingen låst modell      | separat `package-lock.json`, `npm audit --audit-level=low`: 0 |
| Container             | ingen blockerande gate | SBOM med 289 komponenter/113 paket; Trivy: 0 fynd             |

GitHubs webbvy fortsätter visa 130 Dependabot- och två CodeQL-alerts eftersom default branch ännu pekar på den gamla
dependency graphen och koden. Det är förväntat: siffrorna kan först bli noll efter commit, push, PR, merge till
`main` och slutförd Dependabot-/CodeQL-rescan. Definitionen av done kräver den efterkontrollen; lokal nollmatchning
är inte en administrativ ersättning för den.

## Genomförda säkerhetsåtgärder

### Kod och publicerade paket

- Slug-normalisering använder linjär trimning i stället för den CodeQL-flaggade reguljära uttrycksvägen.
- `deepmerge`, `pick` och `omit` blockerar prototypmuterande nycklar och ärver inte angriparkontrollerade egenskaper.
- Quill har tagits bort. TextEditor använder ett engine-neutralt Lexical-kontrakt och sanerar kontrollerad import,
  paste, toolbar-stilar, länkar och export genom samma allowlist.
- TextEditors `clean` återställer inline-, länk-, block-, list-, alignment-, direction- och indent-formatering.
- Klientgränsen verifieras genom en riktig Next-produktionsfixture.
- Microsoft Speech SDK läggs inte längre i AI-paketets publicerade runtime dependency graph. Den byggs som en intern,
  versionsvaktad browseradapter med säker UUID-implementation och medföljande tredjepartslicenser.
- SWC-bygget har en gemensam ägare och publicerar inte längre `*.test.*`/`*.spec.*`. Pack-gaten kontrollerar samtliga
  publicerbara paket, ESM/CJS-gränser och att publika deklarationer inte använder odeklarerade typberoenden.
- Den bundle:ade Speech-adaptern har ett deterministiskt licensmanifest och notices för samtliga sex inbäddade
  tredjepartspaket.

TextEditor-migreringen tar av säkerhetsskäl bort Quill-specifika refs/callbacks samt osäkra `image`, `video` och
`formula`-embeds. Det är en dokumenterad breaking change och `@sk-web-gui/text-editor` ska få en major release.

Next-paketens peer-kontrakt kräver nu minst Next 15.5.20 för att inte acceptera kända sårbara 15.x-versioner. Den
avsiktliga kontraktsinsnävningen är också breaking; `@sk-web-gui/next`, `@sk-web-gui/next-card` och
`@sk-web-gui/next-link` ska därför få major releases tillsammans med säkerhetsleveransen.

### Beroendegraf och verktyg

- Node/Yarn-kontraktet är Node 22 och Yarn 1.22.22; Lerna, Nx, SWC, Storybook, Vite, Vitest, Next, Tailwind, PostCSS
  och övriga direkta ägare är uppgraderade till testade säkra versioner.
- Phantom dependencies i sex publicerbara paket har flyttats till respektive kanoniska manifestägare.
- MCP har en separat npm-lockfil; flytande runtime-installationer och duplicerade rootberoenden är borttagna.
- Leveransens textfiler och lockfil följer den nya LF-policyn.

Kvarvarande säkerhetsresolutions är begränsade till upstreamkedjor som ännu deklarerar en osäker version:

| Resolution                                              | Ägare/anledning                              | Raderingsvillkor                                     |
| ------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `handlebars@4.7.9`                                      | Lerna conventional-changelog                 | Lerna-kedjan deklarerar minst 4.7.9                  |
| `lerna/js-yaml@4.2.0`                                   | Lerna låser en äldre 4.x-selector            | Lerna deklarerar en säker selector                   |
| `lerna/tar@7.5.19`                                      | Lerna/pacote låser äldre tar                 | hela Lerna-kedjan accepterar minst 7.5.19            |
| `**/microsoft-cognitiveservices-speech-sdk/uuid@11.1.1` | käll-/testgrafen för den bundle:ade adaptern | Speech SDK släpper en verifierat säker uuid-selector |
| `next/postcss@8.5.16`                                   | stabil Next låser PostCSS 8.4.31             | stabil Next deklarerar säker PostCSS                 |
| `storybook/esbuild@0.28.1`                              | Storybook låser en äldre esbuild             | Storybook deklarerar minst 0.28.1                    |

Rootens React-resolutioner är kompatibilitetsägare för monorepot och räknas inte som sårbarhetsundantag.

### CI, MCP och container

- Full-SHA-pinnade Actions, dependency review på low, frozen audit, test/build/Storybook, package-content-gate och
  CodeQL-status är avsedda merge-gates.
- Audit- och container-workflows kör på varje PR till `main`, så required checks kan inte fastna som `Pending` på
  grund av path-filter.
- MCP har Host-validering, 256 KiB bodygräns, schema-/token-/längdgränser, max antal samtidiga anrop, timeouts,
  defensiva headers och fångad graceful shutdown.
- Runtime-imagen kör som UID 1001 med read-only root, tmpfs, borttagna capabilities och `no-new-privileges`; npm,
  Yarn och Corepack saknas i runnern.
- Containergrinden blockerar varje `UNKNOWN`, `LOW`, `MEDIUM`, `HIGH` och `CRITICAL`. Ett tillfälligt undantag kräver
  exakt versionerad PURL, ansvarig, motivering, åtgärdsplan och ett slutdatum inom 90 dagar.

## Verifiering

Följande resultat är körda på den lokala branchen:

- `yarn lint`: 0 fel; 21 befintliga warnings.
- Ren installation: rootens `yarn install --frozen-lockfile` och MCP:s `npm ci` godkända utan omresolution.
- `yarn test:coverage`: 63 testfiler och 408 tester godkända.
- TextEditor: 26 säkerhets- och beteendetester godkända, inklusive sanering och full clean-semantik.
- Paketbygge: typer, ESM och CJS för 49 paket godkända.
- Packkontroll: 49/49 paket utan test-/spec-artefakter.
- Next 15.5.20 production fixture: godkänd.
- Storybook browser suite: 91 storyfiler och 197 tester godkända.
- Storybook production build: godkänd; default- och read-only-editor har även kontrollerats visuellt.
- MCP: 6/6 kontraktstest, lint och audit godkända.
- AI-konsumenttest: ESM, CJS och strikt TypeScript-konsument godkända utan installerad Speech SDK.
- Container: `sha256:02c413d5210f9eee757a0508ab6ade653d046d81c345e65ffe72b9ee5a3cd824`; runtime-smoke-test godkänt för 90
  komponenter, Syft 1.46.0 skapade en CycloneDX-SBOM med 289 komponenter (113 paketartefakter) och Trivy 0.72.0
  rapporterade 0 fynd över UNKNOWN–CRITICAL.
- `actionlint`, Zizmor, Compose, Docker static check, Trivy-policytest och `git diff --check`: godkända.

## Kvarstår efter kodgranskning

Följande steg kräver extern state efter att den stackade PR:n har öppnats:

1. Merga PR #504, rikta om säkerhets-PR:n från `feature/vitest-unit-tests` till `main`, kör om alla checks och merga.
2. Gör `Audit dependency lockfiles`, `Build, smoke test, and scan`, `Lint`, `MCP contract`, `Test and build`,
   `Dependency review` och CodeQL `Analyze (javascript-typescript)` obligatoriska.
3. Kräv CODEOWNER-/last-push-approval, stale-review-dismissal, lösta conversations och samma regler för admins.
4. Sätt default `GITHUB_TOKEN` till read-only, stäng av workflow-PR-approvals och begränsa Actions till godkända,
   full-SHA-pinnade actions.
5. Kör Lerna-versionering efter merge och publicera de påverkade paketen. Nuvarande npm-releaser innehåller ännu
   äldre interna `@sk-web-gui/*`-versioner; en gemensam säker release krävs innan konsumenternas graf är uppdaterad.
6. Aktivera npm trusted publishing/OIDC och provenance när release-environment och ansvarig är beslutade.
7. Vänta på GitHub-rescan av den mergade SHA:n och verifiera 0 Dependabot, 0 CodeQL och 0 secret-scanning-alerts.

Inga GitHub-inställningar och ingen npm-release har muterats som del av det lokala arbetet.
