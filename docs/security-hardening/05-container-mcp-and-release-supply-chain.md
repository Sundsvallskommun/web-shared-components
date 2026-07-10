# Container, MCP och release supply chain

## Mål

Gör den faktiskt deployade MCP/Storybook-imagen och publiceringen reproducerbara, scanningsbara och minst privilegierade.

## Problem

- Root använder Yarn-lock, men `mcp-server` ligger utanför workspaces och saknar egen lockfil.
- Docker kör `npm install --omit=dev --no-package-lock` i runtime-steget och hämtar därför flytande dependencies vid
  varje build.
- Root-steget kör `yarn install` utan `--frozen-lockfile`.
- `.dockerignore` exkluderar inte `.env*`, `.npmrc`, coverage eller lokala byggartefakter innan `COPY . .`.
- CI bygger eller scannar inte containern.
- Releaseinstruktionen bygger på manuell `npm login`; releaseägarskapet är otydligt mellan Lerna och ett
  `changeset publish`-script utan komplett Changesets-konfiguration.
- Node-kontraktet varierar mellan README (20+), CI (22) och Docker (22.14), och `engines`/`packageManager` saknas.

## Föreslagen kanonisk ägare

Välj en dependency-modell för MCP:

1. Rekommenderat för den nuvarande minimala runner-imagen: behåll MCP fristående, commit:a
   `mcp-server/package-lock.json`, använd `npm ci` lokalt/CI/Docker och låt Dependabot bevaka katalogen.
2. Alternativt: inkludera `mcp-server` i root Yarn-workspace och låt root `yarn.lock` äga dess runtime-dependencies,
   men bara om Yarn 1-installationen kan producera en verifierat minimal runner utan flytande reinstall.

Två manifest får inte installera samma runtime-dependencies genom två olika, varav en olåst, vägar.

## Arbete

### Reproducerbar installation

- Efter PR #504:s React-resolution-fix: byt root Docker-installation till `yarn install --frozen-lockfile`.
- Välj MCP-modell och kopiera rätt manifest + lockfil före installation i Docker. Vid den rekommenderade modellen
  tas duplicerade MCP-runtime-dependencies bort från root och lokala scripts kör `npm ci --prefix mcp-server` innan
  servern startas.
- Använd offline/cacheoptimering endast om den inte försvagar frozen/ci-semantiken.
- Lägg `engines`, `packageManager` och en gemensam Node 22-fil/policy så lokal miljö, CI och Docker använder samma
  kontrakt. Uppdatera Dockerbasen kontrollerat via Dependabot.

### Containerhärdning

- Utöka `.dockerignore` med `.env*`, `.npmrc`, coverage, Storybook-output, dist, editorfiler och andra lokala
  artefakter som inte ska in i build context.
- Behåll non-root-användaren i runner-steget.
- Bygg image i CI, starta den och smoke-testa Storybook samt MCP-endpoint.
- Generera SBOM och kör beslutad image-scanner. Nollpolicyn ska ange om även OS-paketens low-fynd blockerar eller hur
  en base-image-fix hanteras utan att dölja alerts.
- Pinna base image med digest om driftmodellen stödjer det och låt Dependabot uppdatera tag/digest.

### MCP-tester

- Lägg lint/testscript i `mcp-server`.
- Testa manifestgenerering, serverstart, MCP-listning och minst ett representativt tool-anrop.
- Verifiera att inga devDependencies eller credentials finns i runner-imagen.

### Release supply chain

- Välj Lerna som enda releaseägare eller inför Changesets fullständigt; lämna inte två halvkonfigurerade vägar.
- Planera npm trusted publishing/OIDC med environment approval och provenance för publicerade paket.
- Kräv samma säkerhetschecks före release som före merge, plus pack-/smoketest av representativa paket.
- Ta bort instruktioner som kräver långlivad lokal npm-token när trusted publishing är infört.

## Återanvänd, flytta och ta bort

- Återanvänd Dockerfilets multi-stage-upplägg och non-root runner.
- Flytta MCP-dependency-ägarskap till vald lockfilmodell.
- Ta bort live `npm install --no-package-lock`, duplicerade runtime-dependencies och kommenterad alternativinstallation
  när modellen är vald.
- Ta bort den inaktuella kommentaren om React-resolution efter att frozen install bevisats.

## Medvetet oförändrat

- Storybook och MCP fortsätter dela samma runtime-image om smoke-, storleks- och säkerhetskrav klaras.
- Dockerarkitekturen skrivs inte om mer än vad reproducerbarhet och scanning kräver.
- Ingen release publiceras som del av saneringsplanen.

## Acceptanskriterier

- Ren containerbuild gör inga olåsta package-manager-installationer.
- Samma lockfil/versioner används lokalt, i CI och i Docker.
- MCP smoke-/kontraktstest och Storybook health check passerar på byggd image.
- Image-SBOM sparas som artifact och scanner visar 0 fynd enligt nollpolicyn.
- Build context innehåller inte `.env`, `.npmrc`, coverage eller lokala outputs.
- En enda dokumenterad releaseägare finns, och trusted publishing/provenance är planerad eller aktiverad med ansvarig.

## Validering

```sh
docker build --no-cache -t web-shared-components:security-check .
docker run --rm -p 8080:8080 web-shared-components:security-check
```

Kör därefter HTTP/MCP-smoketest, generera SBOM och scanna exakt den digest som avses deployas.

## Risk och recovery

Att flytta `mcp-server` in i workspaces kan ändra hoisting och imageinnehåll. Gör lockmodellsbytet i en egen PR med
före/efter-SBOM och endpointtest. Vid regression revertas modellen till den committade separata lockfilen; återgång
till live, olåst install är inte tillåten recovery.
