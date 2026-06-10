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
   - curated Swedish/English keywords for better use-case matching,
   - design tokens read from the built `@sk-web-gui/theme`.
2. **`server.mjs`** loads `manifest.json` and serves it over MCP + the static
   styleguide on one port.

`manifest.json` is generated (git-ignored) — regenerate it whenever components
change.

## Local development

```bash
# Build packages first so tokens resolve (one-off):
yarn boot:esm

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

## Deployment

The `Dockerfile` builds the styleguide, generates the manifest, and ships a slim
runner that installs only this folder's runtime deps and runs `server.mjs` on
port 8080. Behind the styleguide's reverse proxy, `/mcp` is then reachable at
`https://stilguide.sundsvall.se/mcp`.

Clients connect with:

```json
{ "mcpServers": { "sk-web-gui": { "type": "http", "url": "https://stilguide.sundsvall.se/mcp" } } }
```
