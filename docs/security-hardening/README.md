# Säkerhetshärdning och noll öppna alerts

Status: implementerad på `fix/security-hardening`, stackad på PR #504; inväntar mergeordning och GitHub-rescan

Baslinje: `main@c09ddac0079c7b8434a15ee5a9b039b8882fa19e`

Senast uppdaterad: 2026-07-10

## Mål

Repot ska ha noll öppna, fortfarande tillämpliga säkerhetsfynd i Dependabot, CodeQL, secret scanning och den
beslutade container-scannern. Målet nås genom att åtgärda eller ta bort den sårbara koden och beroendekedjan, inte
genom att avfärda alerts för att få en grön siffra.

Startläget är 130 öppna Dependabot-alerts och två öppna CodeQL-alerts. Secret scanning har noll öppna alerts.

## Planer och underlag

1. [Dependabot-inventering](00-dependabot-inventory.md)
2. [Baslinje, triage och leveransordning](01-baseline-and-triage.md)
3. [Runtime och publicerade paket](02-runtime-and-published-packages.md)
4. [Utvecklingsverktyg och beroendegraf](03-development-toolchain.md)
5. [CI, Dependabot och repository-kontroller](04-ci-dependabot-and-repository-controls.md)
6. [Container, MCP och release supply chain](05-container-mcp-and-release-supply-chain.md)
7. [Nollkontroll och löpande drift](06-zero-alert-verification-and-operations.md)
8. [Implementeringsbevis och kvarstående aktivering](07-implementation-evidence.md)

## Problem och betydelse

GitHubs scanners är aktiverade, men deras resultat är inte kopplade till ett fungerande åtgärdsflöde eller
obligatoriska merge-gates. `main` saknar fortfarande det testworkflow som ligger i PR #504, branch protection kräver
inga status checks och tre gamla Dependabot-PR:er är konflikterande. Därför har sårbarheter kunnat ligga kvar även
när säkra versioner finns.

Dependabot-siffran är dessutom inte samma sak som 130 oberoende problem. Den består av 109 advisories över 36 paket
och flera alerts avser samma advisory i olika majorlinjer. Åtgärder ska därför göras hos den direkta ägaren till en
beroendekedja, inte genom att blint lägga 36 transitiva paket i root-manifestet.

## Ägarskapsmodell

| Koncept                                    | Kanonisk ägare                                                       |
| ------------------------------------------ | -------------------------------------------------------------------- |
| Direkt dependency selector                 | närmaste `package.json` som faktiskt använder paketet                |
| Transitiv version                          | den direkta föräldern och `yarn.lock`                                |
| Tillfällig säkerhets-resolution            | root `package.json`, med ägare, motivering och raderingsvillkor      |
| Visuell komponentstil                      | `packages/core`                                                      |
| Publikt komponent-API och runtime-beteende | respektive `packages/<component>`                                    |
| Repository-policy och automation           | `.github`, GitHub ruleset/branch protection och `SECURITY.md`        |
| MCP-runtime                                | en beslutad lockfilmodell; inte två oberoende, olåsta installationer |
| Observerbart beteende                      | Vitest-, Storybook- och kontraktstester                              |

## Principbeslut

- Sårbara transitiva paket uppgraderas via sin verkliga direkta ägare när en selector inte redan tillåter patchen.
- En lockfiluppdatering får inte samtidigt dölja orelaterade majoruppgraderingar eller radslutsnormalisering.
- `resolutions` används bara när upstream blockerar en säker version. Varje resolution får en verifierad
  kompatibilitetskontroll och ett konkret raderingsvillkor.
- Alerts som fortfarande matchar dependency graph avfärdas inte. Ett tidsbegränsat undantag är riskacceptans, inte
  ett uppnått nollmål.
- Manuella versionsändringar av repoets egna paket görs inte. Lerna/releaseflödet äger versionssättning.
- Styling stannar i `packages/core`, även när Quill ersätts i texteditorn.
- PR #503:s borttagna lodash-användning på `main` återanvänds. Säkerhetsbranchen är stackad på PR #504:s
  test-/Vite-baslinje så att samma 144 testfiler inte kopieras in i två PR-diffar. När PR #504 har mergats ska
  säkerhets-PR:n riktas om till `main`.
- De konflikterande Dependabot-PR:erna #488, #489 och #490 mergas inte som de är.

## Leveransordning

| Ordning | Prioritet | Resultat                                                                                         |
| ------- | --------- | ------------------------------------------------------------------------------------------------ |
| 0       | P0        | PR #504:s testbaslinje återanvänd, leveransfiler normaliserade till LF och verifierbar CI införd |
| 1       | P0        | 3 critical Dependabot-alerts, 27 relaterade alerts och 2 CodeQL-fynd lokalt undanröjda           |
| 2       | P1        | återstående selector-kompatibla dependency-fixar införda i små ägarbaserade PR:er                |
| 3       | P1        | blockerande toolchain-ägare uppgraderade, ersatta eller borttagna                                |
| 4       | P1        | Quill borttagen och texteditorns publika kontrakt frikopplat från editor-engine                  |
| 5       | P2        | CI, Dependabot, repository-, container-, MCP- och release-kontroller aktiverade                  |
| 6       | Gate      | 0 Dependabot, 0 CodeQL, 0 secret scanning och 0 blockerande containerfynd                        |

P0-fixar ska inte vänta på att hela toolchain-moderniseringen blir klar. Däremot ska varje beteendepåverkande
uppgradering ha testbaslinjen från PR #504.

## Medvetet oförändrat

- Tailwind 4, Next 16 och byte av Yarn-generation ingår inte automatiskt. De får göras om de behövs för att ta bort
  en blockerande kedja, men säkerhetsarbetet börjar med minsta säkra, supportade version.
- Designspråk, tokens och komponenternas visuella kontrakt ändras inte, förutom nödvändig intern texteditorstruktur.
- Inga nya komponenter läggs till i `packages/react`.
- Changelog och releaseversioner ändras inte som del av planeringsarbetet.

## Gemensam definition of done

- GitHub API visar 0 öppna Dependabot-alerts och 0 öppna CodeQL-alerts efter rescan av `main`.
- Secret scanning och push protection är fortsatt aktiverade och visar 0 öppna alerts.
- `yarn install --frozen-lockfile`, lint, tester, paketbyggen och Storybook-bygge passerar från en ren checkout.
- MCP-servern installeras reproducerbart och har smoke-/kontraktstest.
- Containerbygget använder låsta dependencies och den beslutade image-scannern visar 0 fynd enligt nollpolicyn.
- `main` kräver godkända CI-, CodeQL- och dependency-review-checks.
- Inga permanenta resolutions eller riskundantag saknar ägare och raderingsvillkor.

## Risk och recovery

Största risken är att en stor lockfilsdiff blandar säkra patchar med beteendeförändrande majors. Därför normaliseras
EOL mekaniskt först och arbetet delas per ägare. Varje PR ska kunna revertas utan att återställa andra säkerhetsfixar.
Vid regression revertas den fokuserade PR:n och alerten öppnas åter; ett alert får aldrig döljas som ersättning för
recovery.

## Uppföljning

| Plan                      | Status                    | Bevis/PR                                                  |
| ------------------------- | ------------------------- | --------------------------------------------------------- |
| Inventering               | Klar                      | snapshot 2026-07-10, `main@c09ddac0`                      |
| Baslinje och triage       | Klar                      | `fix/security-hardening` stackad direkt på PR #504        |
| Runtime/publicerade paket | Klar lokalt               | audit, tester, build och pack-/konsumentkontroll          |
| Toolchain                 | Klar lokalt               | frozen install, audit och full paket-/Storybook-build     |
| CI/repository-kontroller  | Kod klar, aktivering kvar | workflows/CODEOWNERS klara; GitHub-regler ändras efter PR |
| Container/MCP/release     | Kod klar, release kvar    | MCP-kontrakt, SBOM 289 komponenter/113 paket, Trivy 0     |
| Nollkontroll              | Lokal kontroll klar       | GitHub-default-branch-rescan krävs efter merge            |
