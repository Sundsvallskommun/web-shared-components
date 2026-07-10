# Nollkontroll och löpande drift

## Mål

Definiera ett maskinellt och mänskligt verifierbart slutvillkor samt en driftprocess som håller repot på noll.

## Noll betyder

- 0 öppna Dependabot-alerts som matchar default branch;
- 0 öppna CodeQL-alerts;
- 0 öppna secret-scanning-alerts;
- 0 blockerande containerfynd enligt beslutad, dokumenterad nollpolicy;
- inga dolda fynd genom permanent dismissal utan korrigerad kod/dependency graph.

Ett GitHub-alert kan ligga kvar kort efter merge. Arbetet är inte verifierat förrän dependency graph/CodeQL har
analyserat rätt `main`-SHA och API-resultatet är noll.

## Verifieringsordning per PR

1. Installera från ren checkout med frozen lock.
2. Kör lint, tester, builds och berörda kontrakt.
3. Kontrollera `yarn why` och lockdiff för berörda paket.
4. Bygg/scanna container om dependency graph eller Docker/MCP påverkas.
5. Merga först när required checks är gröna.
6. Vänta på GitHub-rescan av merge-SHA och verifiera alertdelta.
7. Uppdatera huvudplanens statustabell med PR och faktiskt stängda alerts.

## Lokala kvalitetskommandon

```sh
yarn install --frozen-lockfile
yarn lint
yarn test:coverage
yarn build
yarn test:storybook
yarn build:storybook
yarn audit --level low
git diff --check
```

Kör `yarn build:nocache` för toolchain-, lock- och cachepåverkande ändringar. MCP och container har ytterligare tester
enligt sin delplan.

## GitHub-kontroll

Dependabot:

```sh
gh api --paginate --slurp \
  -H 'Accept: application/vnd.github+json' \
  '/repos/Sundsvallskommun/web-shared-components/dependabot/alerts?state=open&per_page=100' \
  | jq 'add | length'
```

CodeQL:

```sh
gh api --paginate --slurp \
  -H 'Accept: application/vnd.github+json' \
  '/repos/Sundsvallskommun/web-shared-components/code-scanning/alerts?state=open&per_page=100' \
  | jq 'add | length'
```

Secret scanning:

```sh
gh api --paginate --slurp \
  -H 'Accept: application/vnd.github+json' \
  '/repos/Sundsvallskommun/web-shared-components/secret-scanning/alerts?state=open&per_page=100' \
  | jq 'add | length'
```

Alla tre ska skriva `0`. Spara även den analyserade `main`-SHA:n och SBOM-tidpunkten i slut-PR:n.

## Regressionstest av kontroller

I en kontrollerad, ej mergad test-PR:

- introducera en dependency-version med en känd advisory och verifiera att dependency review blockerar;
- skapa en säker uppdatering och verifiera att bot-PR:n får full CI;
- verifiera att en workflowfil inte får write-token utan explicit behov;
- verifiera att unresolved conversation/stale approval hindrar merge;
- stäng test-PR:n och säkerställ att ingen sårbar version når `main`.

## Drift och SLA

- Dependabot/Actions/Docker kör minst veckovis.
- Full SCA och CodeQL kör på schema samt på relevanta PR:er.
- Security owner triagerar nya alerts enligt SLA i CI-planen.
- En dependency-PR som blir äldre än sju dagar får utsedd ägare eller eskaleras.
- Kvartalsvis kontrolleras Node/Yarn-kontrakt, actions-SHA, base image, releaseprovenance och om tillfälliga resolutions
  kan tas bort.

## Undantag

Ett undantag kräver:

- advisory/CVE och berörd dependency path;
- konkret exploitability-analys för detta repo;
- kompensationskontroll;
- namngiven ägare;
- slutdatum och issue/PR för permanent fix.

Ett undantag får inte räknas som noll öppna problem. Om GitHub-alerten dismissas administrativt ska den fortfarande
redovisas separat tills dependency graph inte längre matchar.

## Slutrapport

När initiativet är klart ska en kort rapport innehålla:

- före/efter per severity och scope;
- borttagna rotberoenden och förtydligade ägare;
- resolutions som finns kvar och deras raderingsvillkor;
- CodeQL-fixar och skyddande beteendetester;
- container/MCP-SBOM och scannerresultat;
- required checks och repository-inställningar;
- verifierad `main`-SHA med 0/0/0 API-resultat.

## Risk och recovery

Audit-tjänster och dependency graph kan ha fördröjning. Kontrollera SHA/tidpunkt innan ett fynd klassas som kvarstående
eller stale. Vid scanneravbrott stoppas merge eller används dokumenterad break-glass; man sänker inte permanent
severity-tröskeln för att hålla flödet grönt.
