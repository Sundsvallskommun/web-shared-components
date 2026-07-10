# Baslinje, triage och leveransordning

## Mål

Skapa en reproducerbar baslinje som gör varje säkerhetsfix reviewbar och bevisbar innan dependency graph ändras.

## Verifierat startläge

Snapshoten togs 2026-07-10 mot `main@c09ddac0079c7b8434a15ee5a9b039b8882fa19e` efter merge av PR #503.

Den nuvarande arbetsbranchen `feature/radix-component-foundation` ligger två commits efter `origin/main`. Den måste
rebasas/mergas med `c09ddac0` innan något säkerhetsarbete återanvänds där; annars återinför branchen äldre
`forms@2.4.5`, uuid 11.1.0, lodash och lodash.set-kedjor som PR #503 redan tog bort.

| Källa           |                                  Öppna fynd |
| --------------- | ------------------------------------------: |
| Dependabot      | 130: 3 critical, 66 high, 49 medium, 12 low |
| CodeQL          |                         2: 1 high, 1 medium |
| Secret scanning |                                           0 |

Dependabot-fynden är 96 development och 34 runtime. Samtliga 130 matchar fortfarande en version på `main`; inget får
avfärdas som stale. 129 har en publicerad patch. Quill 2.0.3 är enda advisory utan patch.

CodeQL-fynden är:

- high `js/polynomial-redos` i `packages/utils/src/slug.ts:2`;
- medium `js/prototype-pollution-utility` i `packages/utils/src/object.ts:54`.

## Nuvarande och föreslagen ägare

GitHub Advanced Security producerar fynden, men någon merge-gate eller dokumenterad responder äger inte utfallet.
Föreslagen ägare är `@Sundsvallskommun/web-developers`, kodifierad i `CODEOWNERS`, med SLA och required checks enligt
[CI- och repository-planen](04-ci-dependabot-and-repository-controls.md).

## Återanvänd, separera och ta bort

- Återanvänd PR #503:s borttagna direkta lodash/lodash.set-användning. Alerten kvarstår eftersom Lerna och Quill
  fortfarande drar in lodash-varianter.
- Merga PR #504 som test- och Vite 8-baslinje när dess checks är gröna. Den ger enhets-, browser-, build- och
  Storybook-verifiering som säkerhetsuppgraderingarna behöver.
- Normalisera `yarn.lock` från CRLF till LF i en separat mekanisk commit och lägg en `.gitattributes`-regel. Verifiera
  att parsad dependency graph är oförändrad. Detta hindrar Dependabot från att skapa diffar på cirka 12 000 + 12 000
  rader för en enda patch.
- Stäng eller återskapa #488, #489 och #490 efter EOL-commit och uppdaterad `main`. De är konflikterande, äldre än 30
  dagar och grupperar orelaterade majors.

## Arbetsordning

### P0.1 – verifierbar bas

1. Merga PR #504 eller flytta dess testbaslinje till en egen reviewbar PR om den inte kan mergas intakt.
2. Lägg `yarn lint` i testworkflow och kör hela baslinjen på `main`.
3. Normalisera lockfilens EOL separat, utan dependency-förändring.
4. Ta en ny alert- och SBOM-snapshot efter GitHubs rescan.

### P0.2 – kritiska dependency-fynd

Gör tre ägarstyrda ändringar som tillsammans ska stänga 30 alerts:

| Ägare                        | Från              | Minsta säkra mål                      | Förväntat stängda alerts |
| ---------------------------- | ----------------- | ------------------------------------- | -----------------------: |
| tre Next-paket               | Next 15.5.3       | minst 15.5.18, normalt senaste 15.5.x |                       21 |
| Lerna/conventional changelog | Handlebars 4.7.8  | 4.7.9                                 |                        8 |
| Concurrently                 | shell-quote 1.8.3 | 1.8.4                                 |                        1 |

Detta stänger alla tre criticals. Next-arbetet ska även höja paketens peer-minimum så att publicerade paket inte
annonserar stöd för kända sårbara Next-versioner.

### P0.3 – CodeQL

- Ersätt trim-regexen i `toSlug` med en linjär operation och lägg ett regressionsfall med mycket lång whitespace.
- Gör `deepmerge` säker mot `__proto__`, `prototype` och `constructor` på varje nivå, kontrollera egna properties och
  testa både JSON-parsade payloads och nästlade attacker.
- Behåll funktionernas publika resultat för normala indata. Testerna ska verifiera observerbart beteende och att
  `Object.prototype` förblir oförändrad.

CodeQL-fixen bör vara en egen liten PR så att den kan mergas oberoende av lockfilen.

## Acceptanskriterier

- PR #504:s testworkflow finns på `main` och kör även lint.
- EOL-PR:n har ingen semantisk dependency-förändring.
- GitHub visar 0 critical Dependabot-alerts.
- CodeQL visar 0 öppna alerts efter analys av `main`.
- Ingen alert har dismissats för att nå siffrorna.

## Validering

```sh
yarn install --frozen-lockfile
yarn lint
yarn test:coverage
yarn build
yarn test:storybook
yarn build:storybook
git diff --check
```

Verifiera dessutom alertstatus med kommandona i
[nollkontrollplanen](06-zero-alert-verification-and-operations.md).

## Risk och recovery

En EOL-normalisering kan dölja dependency-förändringar i en stor textdiff. Jämför därför både Yarn-lockens parsade
nyckel/version-par och SBOM före/efter. Vid fel revertas endast den mekaniska committen. P0 dependency-fixar hålls
separerade så att en Next-regression inte behöver återöppna Handlebars- eller shell-quote-riskerna.
