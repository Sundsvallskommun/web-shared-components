# @sk-web-gui MCP server

A standalone [MCP](https://modelcontextprotocol.io) server that exposes the
`@sk-web-gui` design system to AI agents (Claude Code, Codex, Cursor …) so they
can find the right component and use it correctly during AI-driven development.

Unlike Storybook's built-in MCP addon — which only runs while `storybook dev` is
running locally — this server is a small, deployable Node service. It runs on the
**same host as the hosted styleguide** (`stilguide.sundsvall.se`) and serves the
MCP endpoint at **`/mcp`**, so every developer gets it without running anything
locally.

## What it exposes

Tools (over streamable HTTP at `/mcp`):

| Tool | Purpose |
| --- | --- |
| `find-component` | Find components by use-case ("visa ett felmeddelande", "datumväljare"). Returns a ranked list. |
| `list-components` | List all components, optionally filtered by category. |
| `get-component` | Full info for a component: import path, description, props (type, required, description), tags. |
| `get-design-tokens` | Design tokens (colors, spacing, radius, fontSizes, lineHeights, fonts, screens). |

It also serves the static styleguide for every non-`/mcp` route, and a
`GET /healthz` health check.

## How it works

1. **`generate-manifest.mjs`** scans `packages/*` at build time and produces
   `manifest.json`:
   - one entry per Storybook story (name, category, import path, tags),
   - props read from each component's `*Props` type via the TypeScript compiler
     (handles the forwardRef/polymorphic components react-docgen misses),
   - curated keywords from **`keywords.json`** (bilingual sv + en),
   - design tokens read from the built `@sk-web-gui/theme`.
2. **`server.mjs`** loads `manifest.json` and serves it over MCP + the static
   styleguide on one port.

`manifest.json` is generated (git-ignored) — regenerate it whenever components
change.

### Improving search

`find-component` folds diacritics (`datumvaljare` matches `datumväljare`),
indexes both Swedish and English keywords, and tolerates a single typo
(`buton` → Button) — so queries in either language, with or without accents,
still hit. To tune matching, edit `mcp-server/keywords.json` (one entry per
component with `sv` and `en` synonym arrays) and regenerate the manifest.

## Local development

```bash
# Build packages first so tokens resolve (one-off):
yarn boot:esm

# Install the MCP server's exact, separately locked dependencies:
npm ci --prefix mcp-server

# Generate the manifest and start the server (defaults to PORT 8080):
yarn mcp:serve
```

Then:

```bash
curl http://localhost:8080/healthz
# point an MCP client at http://localhost:8080/mcp
```

To serve the styleguide too, run `yarn build:storybook` first so
`storybook-static/` exists (otherwise non-`/mcp` routes 404).

Run the standalone contract checks with:

```bash
npm run lint --prefix mcp-server
npm test --prefix mcp-server
```

### Network configuration

The server listens on `HOST=0.0.0.0` and `PORT=8080` by default. Requests to the
MCP endpoint validate the HTTP `Host` header to prevent DNS rebinding. The
default allowlist is `localhost`, loopback addresses, and
`stilguide.sundsvall.se`. Set `MCP_ALLOWED_HOSTS` to a comma-separated list of
hostnames (without ports) when deploying under another hostname. Do not use a
wildcard.

`MCP_PUBLIC_URL` controls the hosted URL displayed on the documentation page
when the server is opened locally. `MCP_MANIFEST_PATH` exists for isolated tests
and should normally be left unset in production. `MCP_MAX_IN_FLIGHT` caps
concurrent MCP requests per process and defaults to `32`; enforce an additional
rate limit at the ingress when running more than one replica.

Slow connections are closed by explicit HTTP limits: headers have 10 seconds,
the complete request has 15 seconds, and idle keep-alive sockets have 5 seconds.
The bounded `MCP_HEADERS_TIMEOUT_MS`, `MCP_REQUEST_TIMEOUT_MS`, and
`MCP_KEEP_ALIVE_TIMEOUT_MS` settings can tighten these values for a deployment;
they must preserve `keep-alive < headers <= request`.

## Deployment

The `Dockerfile` builds the styleguide, validates the generated manifest, and
ships a slim non-root runner. Both the root Yarn install and the MCP npm install
are immutable and lockfile-backed. Package managers are removed from the final
runtime image after installation. Behind the styleguide's reverse proxy, `/mcp`
is then reachable at `https://stilguide.sundsvall.se/mcp`.

Run the image with a read-only root filesystem, all Linux capabilities dropped,
and `no-new-privileges`. The CI container smoke test enforces this runtime
contract.

Clients connect with:

```json
{ "mcpServers": { "sk-web-gui": { "type": "http", "url": "https://stilguide.sundsvall.se/mcp" } } }
```
