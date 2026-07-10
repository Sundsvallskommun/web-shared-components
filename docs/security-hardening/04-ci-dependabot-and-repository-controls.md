# CI, Dependabot och repository-kontroller

## Mål

Gör säkerhet till en merge-gate och en ägd driftprocess så att en ny backlog på 130 alerts inte kan byggas upp.

## Nuvarande läge

- Dependabot security updates, CodeQL default setup, secret scanning och push protection är aktiverade.
- `main` har ännu inget repoägt testworkflow; `.github/workflows/test.yml` finns på PR #504.
- Branch protection kräver en approval men inga status checks. Admins kan kringgå, stale approvals avvisas inte och
  unresolved review conversations tillåts.
- Default `GITHUB_TOKEN` har write-behörighet och workflows får godkänna PR:er.
- `.github/dependabot.yml`, `SECURITY.md` och `CODEOWNERS` saknas.
- Dependabot-PR #488–#490 är konflikterande och ogranskbara. En orsak är CRLF i `yarn.lock`.

## Föreslagen kanonisk ägare

`.github` äger deklarativ automation. GitHub ruleset/branch protection äger enforcement. Teamet
`@Sundsvallskommun/web-developers` äger säkerhetskritiska filer och alert-SLA.

## Arbete

### CI på varje PR

Utgå från PR #504 och kräv minst:

- frozen install;
- `yarn lint`;
- unit/coverage;
- ESM/CJS/type build;
- Storybook browser tests och produktionsbygge;
- dependency review som blockerar nyintroducerade vulnerabilities på beslutad nollnivå;
- CodeQL.

Lägg en schemalagd/full SCA-kontroll på `main`. Dependency review ser bara diffen och ersätter inte backlog-scanning.
API-anrop till Dependabot ska använda minimal `security-events: read` och aldrig exponera token i fork-PR:er.

### Dependabot-konfiguration

Lägg `.github/dependabot.yml` och gör Dependabot till enda dependency-bot. Konfigurera:

- npm/Yarn för root `/`;
- GitHub Actions `/`;
- Docker `/`;
- `/mcp-server` endast om planen väljer en separat committad lockfil där.

Kör minst veckovis. Gruppera endast närliggande paketfamiljer, exempelvis Storybook-familjen och testfamiljen. Gruppera
inte alla säkerhetsuppdateringar eller majors i en enda PR. Sätt rimlig PR-limit och reviewers så att boten inte
blockeras av sin egen backlog.

Efter EOL-normalisering ska #488, #489 och #490 stängas som superseded eller återskapas från färsk `main`.

### Branch protection/ruleset

Kräv på `main`:

- pull request och minst en approval;
- dismiss stale approvals och approval efter senaste push;
- resolution av review conversations;
- gröna checks för test, lint, build/Storybook, CodeQL och dependency review;
- blockering av force-push/deletion;
- samma regler för admins eller dokumenterad break-glass-process.

Byt repository-default för `GITHUB_TOKEN` till read och stäng av workflow-PR-approvals. Varje workflow deklarerar
minsta möjliga `permissions`.

### Kodägare och policy

- Lägg `CODEOWNERS` för `package.json`, `yarn.lock`, `packages/*/package.json`, `.github/**`, `Dockerfile`,
  `.dockerignore`, `mcp-server/**` och releasekonfiguration.
- Lägg `SECURITY.md` med supportade versioner, privat rapporteringsväg, svarstider och disclosureprocess.
- Pinna Actions till full commit-SHA och låt Dependabot uppdatera SHA:n.

Föreslagen alert-SLA:

| Severity | Triage          | Fix/mitigation mergad |
| -------- | --------------- | --------------------- |
| Critical | samma arbetsdag | 24 timmar             |
| High     | 1 arbetsdag     | 7 dagar               |
| Medium   | 3 arbetsdagar   | 30 dagar              |
| Low      | 10 arbetsdagar  | 90 dagar              |

## Medvetet oförändrat

- CodeQL default setup behålls så länge den täcker JavaScript/TypeScript med extended queries.
- Renovate införs inte parallellt med Dependabot.
- Auto-merge av security-PR:er aktiveras inte förrän required checks och reviewbara grupper bevisats stabila.

## Acceptanskriterier

- Alla PR:er till `main` måste passera test, lint, build, Storybook, CodeQL och dependency review.
- Ett kontrollerat test med ett känt sårbart dependency bevisar att dependency review blockerar PR:n.
- Dependabot skapar små, ägarbaserade PR:er utan full lockfils-EOL-diff.
- Default token är read, workflow-approval är av och varje workflow har explicit permissions.
- `SECURITY.md` och `CODEOWNERS` finns och pekar på en verklig responder.
- Ingen critical/high kan ligga längre än SLA utan synlig, tidsbegränsad riskacceptans.

## Validering

- Öppna en test-PR som endast ändrar dokumentation och verifiera förväntade required checks.
- Kör `actionlint` eller motsvarande på workflowfiler.
- Validera Dependabot-YAML mot GitHubs schema och trigga en manuell update run.
- Läs branch protection/ruleset via GitHub API efter ändringen; verifiera faktisk enforcement, inte bara filinnehåll.

## Risk och recovery

Felaktiga required checks kan låsa `main`. Aktivera därför checks först efter en grön körning på default branch och
behåll en dokumenterad break-glass-ägare. Vid instabil extern audit-tjänst tas inte säkerhetskravet bort permanent;
workflowet isoleras eller ersätts och beslutet tidsbegränsas.
