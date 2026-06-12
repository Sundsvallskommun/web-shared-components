// Standalone MCP server for the @sk-web-gui design system.
//
// Serves two things on one HTTP port:
//   - the static Storybook build (storybook-static) — the public styleguide
//   - an MCP endpoint at /mcp that lets AI agents discover components, read their
//     props/usage, and look up design tokens during AI-driven development.
//
// The MCP endpoint is stateless: each request gets a fresh server + transport,
// which scales cleanly behind a load balancer for many concurrent agents.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MANIFEST_PATH = path.join(__dirname, 'manifest.json');
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(`Manifest not found at ${MANIFEST_PATH}. Run: node mcp-server/generate-manifest.mjs`);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const STATIC_DIR = path.join(ROOT, 'storybook-static');

const PORT = process.env.PORT || 8080;
const REACT_NOTE = manifest.note;

// --- search ---------------------------------------------------------------

// Common Swedish/English filler words that would otherwise cause spurious
// substring hits (e.g. "med" inside "meddelande").
const STOP_WORDS = new Set([
  'och', 'att', 'som', 'med', 'för', 'ett', 'en', 'det', 'den', 'till', 'av', 'på', 'är', 'kan',
  'vill', 'ha', 'jag', 'vi', 'min', 'mitt', 'eller', 'samt', 'der', 'sa',
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'for', 'with', 'show', 'need', 'want', 'how', 'use', 'that', 'this',
]);

// Lowercase + strip diacritics so ascii queries ("datumvaljare", "forlopp")
// match accented terms ("datumväljare", "förlopp") and EN/SV input both work.
function fold(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// Bounded Levenshtein: returns true if a and b are within `max` edits. Used for
// light typo tolerance ("buton" -> "button"). Cheap over our small word lists.
function withinEdits(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return false;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    let rowMin = prev[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = a[i - 1] === b[j - 1] ? diag : 1 + Math.min(diag, prev[j], prev[j - 1]);
      diag = tmp;
      if (prev[j] < rowMin) rowMin = prev[j];
    }
    if (rowMin > max) return false; // whole row already exceeds budget
  }
  return prev[b.length] <= max;
}

// Two words "match" if equal, one contains the other (>=3 chars, so
// "felmeddelande" hits "meddelande"), or within one edit (>=5 chars, typos).
function wordMatch(a, b) {
  if (a === b) return true;
  if (a.length >= 3 && b.length >= 3 && (a.includes(b) || b.includes(a))) return true;
  if (a.length >= 5 && b.length >= 5 && withinEdits(a, b, 1)) return true;
  return false;
}

// Precompute a folded search index per component once at startup.
const INDEX = manifest.components.map((c) => ({
  c,
  name: fold(c.name),
  keywords: (c.keywords || []).map(fold),
  description: fold(c.description || ''),
  hay: fold(
    [c.name, c.category, c.package, ...(c.keywords || []), ...(c.tags || []), ...c.props.map((p) => p.name)].join(' ')
  ),
}));

function scoreEntry(entry, tokens, rawQuery) {
  const { name, keywords, description, hay } = entry;
  const matched = new Set();
  let score = 0;
  for (const t of tokens) {
    if (name === t) (score += 12), matched.add(t);
    else if (name.startsWith(t)) (score += 8), matched.add(t);
    else if (t.length >= 4 && name.includes(t)) (score += 5), matched.add(t);
    const kw = keywords.find((k) => wordMatch(k, t));
    if (kw) (score += 6), matched.add(kw);
    if (t.length >= 4 && description.includes(t)) (score += 3), matched.add(t);
    else if (t.length >= 4 && hay.includes(t)) (score += 2), matched.add(t);
  }
  if (rawQuery.length >= 5 && hay.includes(rawQuery)) score += 3;
  return { score, matched: [...matched] };
}

function findComponents(query, limit) {
  const raw = fold(query.trim());
  const tokens = raw.split(/\s+/).filter((t) => t.length >= 3 && !STOP_WORDS.has(t));
  return INDEX.map((entry) => ({ c: entry.c, ...scoreEntry(entry, tokens, raw) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ c, matched }) => ({
      name: c.name,
      category: c.category,
      importPath: c.importPath,
      description: c.description,
      propCount: c.props.length,
      matched,
    }));
}

function getComponents(name) {
  const n = name.trim().toLowerCase();
  // Exact name match first; fall back to substring. May return several when a
  // name is reused (e.g. a top-level Button and Accordion's Disclosure Button).
  let matches = manifest.components.filter((c) => c.name.toLowerCase() === n);
  if (!matches.length) matches = manifest.components.filter((c) => c.name.toLowerCase().includes(n));
  return matches;
}

// --- MCP server -----------------------------------------------------------

function text(obj) {
  return { content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }] };
}

// Single source of truth for the tools: this list both registers them on the
// MCP server and renders the human-readable /docs page, so the two can't drift.
// `example` is the argument object shown in the /docs example call.
const TOOLS = [
  {
    name: 'find-component',
    title: 'Hitta komponent',
    description:
      'Hitta vilka @sk-web-gui-komponenter som passar ett behov. Sök på funktion/use-case ' +
      '(t.ex. "visa ett felmeddelande", "datumväljare", "dropdown med sök"). Returnerar en ' +
      'rankad lista. Anropa get-component för fullständiga props.',
    inputSchema: {
      query: z.string().describe('Behov/use-case eller komponentnamn'),
      limit: z.number().int().min(1).max(25).optional().describe('Max antal träffar (1–25, default 8)'),
    },
    example: { query: 'datumväljare' },
    handler: async ({ query, limit }) => {
      const results = findComponents(query, limit ?? 8);
      return text({ query, count: results.length, results, note: REACT_NOTE });
    },
  },
  {
    name: 'list-components',
    title: 'Lista komponenter',
    description: 'Lista alla tillgängliga komponenter, valfritt filtrerat på kategori.',
    inputSchema: {
      category: z.string().optional().describe('Filtrera på kategori, t.ex. "Komponenter" eller "AI"'),
    },
    example: { category: 'AI' },
    handler: async ({ category }) => {
      const list = manifest.components
        .filter((c) => !category || c.category.toLowerCase().includes(category.toLowerCase()))
        .map((c) => ({ name: c.name, category: c.category, importPath: c.importPath }));
      return text({ count: list.length, components: list, note: REACT_NOTE });
    },
  },
  {
    name: 'get-component',
    title: 'Hämta komponent',
    description:
      'Hämta fullständig information om en komponent: import-väg, beskrivning, alla props ' +
      '(typ, om de krävs, beskrivning) och tags.',
    inputSchema: { name: z.string().describe('Komponentnamn, t.ex. "Button"') },
    example: { name: 'Button' },
    handler: async ({ name }) => {
      const matches = getComponents(name);
      if (!matches.length) {
        const suggestions = findComponents(name, 5).map((r) => r.name);
        return text({ error: `Hittade ingen komponent "${name}".`, suggestions });
      }
      return text({
        note: REACT_NOTE,
        results: matches.map((c) => ({
          name: c.name,
          category: c.category,
          importPath: c.importPath,
          description: c.description,
          tags: c.tags,
          props: c.props,
        })),
      });
    },
  },
  {
    name: 'get-design-tokens',
    title: 'Hämta design-tokens',
    description:
      'Hämta designsystemets tokens (colors, spacing, radius, fontSizes, lineHeights, fonts, screens). ' +
      'Använd dessa istället för hårdkodade värden.',
    inputSchema: {
      group: z
        .enum(['colors', 'spacing', 'radius', 'fontSizes', 'lineHeights', 'fonts', 'screens', 'all'])
        .optional()
        .describe('Token-grupp att hämta (default: alla)'),
      filter: z.string().optional().describe('Filtrera token-namn, t.ex. "blue" eller "primary"'),
    },
    example: { group: 'colors', filter: 'primary' },
    handler: async ({ group, filter }) => {
      const tokens = manifest.tokens || {};
      if (!group || group === 'all') {
        if (!filter) return text(tokens);
        const f = filter.toLowerCase();
        const out = {};
        for (const [g, entries] of Object.entries(tokens)) {
          const hit = Object.fromEntries(Object.entries(entries).filter(([k]) => k.toLowerCase().includes(f)));
          if (Object.keys(hit).length) out[g] = hit;
        }
        return text(out);
      }
      const entries = tokens[group] || {};
      const filtered = filter
        ? Object.fromEntries(Object.entries(entries).filter(([k]) => k.toLowerCase().includes(filter.toLowerCase())))
        : entries;
      return text({ group, tokens: filtered });
    },
  },
];

function buildMcpServer() {
  const server = new McpServer({ name: '@sk-web-gui/mcp', version: '0.1.0' });
  for (const t of TOOLS) {
    server.registerTool(t.name, { title: t.title, description: t.description, inputSchema: t.inputSchema }, t.handler);
  }
  return server;
}

// --- human-readable docs page ---------------------------------------------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Describe a tool's zod input shape as plain rows for the docs table, derived
// from the same schema MCP validates against (via zod's JSON Schema export).
function paramsOf(inputSchema) {
  const js = z.toJSONSchema(z.object(inputSchema));
  const required = new Set(js.required || []);
  return Object.entries(js.properties || {}).map(([name, p]) => ({
    name,
    type: Array.isArray(p.enum) ? p.enum.join(' | ') : p.type || 'any',
    required: required.has(name),
    description: p.description || '',
  }));
}

const DOCS_CSS = `
  :root { --fg:#1a1d23; --muted:#5b6573; --line:#e3e7ec; --bg:#fff; --code-bg:#f5f7fa; --accent:#0a5ad4; --req:#b4232c; }
  * { box-sizing: border-box; }
  body { margin:0; font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; color:var(--fg); background:var(--bg); }
  main { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
  h1 { font-size: 2rem; margin: 0 0 .25rem; }
  h2 { font-size: 1.25rem; margin: 2.5rem 0 .75rem; padding-bottom:.3rem; border-bottom:1px solid var(--line); }
  h3 { font-size: 1.05rem; margin: 0 0 .4rem; }
  a { color: var(--accent); }
  .muted { color: var(--muted); }
  .lead { font-size: 1.1rem; color: var(--muted); }
  code { font-family: ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size: .9em; background: var(--code-bg); padding: .1em .35em; border-radius: 4px; }
  pre { background: var(--code-bg); padding: 1rem; border-radius: 8px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  .tool { border: 1px solid var(--line); border-radius: 10px; padding: 1.1rem 1.25rem; margin: 1rem 0; }
  .tool h3 code { background: none; padding: 0; color: var(--accent); font-size: 1.05rem; }
  .tool .title { color: var(--muted); font-weight: 400; font-size: .9rem; margin-left:.4rem; }
  table { width: 100%; border-collapse: collapse; margin: .5rem 0 .25rem; font-size: .92rem; }
  th, td { text-align: left; padding: .4rem .5rem; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { color: var(--muted); font-weight: 600; font-size: .82rem; text-transform: uppercase; letter-spacing: .02em; }
  .req { color: var(--req); font-size: .82rem; font-weight:600; }
  .opt { color: var(--muted); font-size: .82rem; }
  details summary { cursor: pointer; color: var(--accent); font-size: .9rem; margin-top:.5rem; }
  .badges { color: var(--muted); }
`;

function renderDocsHtml(base) {
  const endpoint = `${base}/mcp`;
  // The page is served from both the hosted instance and a local `yarn mcp:serve`.
  // Show the hosted *and* local ways to connect regardless of which one you're on.
  const isLocal = /\/\/(localhost|127\.0\.0\.1|\[?::1\]?)/i.test(base);
  const publicUrl = process.env.MCP_PUBLIC_URL ? process.env.MCP_PUBLIC_URL.replace(/\/+$/, '') : null;
  const hostedEndpoint = isLocal ? (publicUrl ? `${publicUrl}/mcp` : null) : endpoint;
  const localEndpoint = isLocal ? endpoint : `http://localhost:${PORT}/mcp`;

  const connectBlock = (url) =>
    `<pre><code>${escapeHtml(`claude mcp add --transport http sk-web-gui ${url}`)}</code></pre>` +
    `<p class="muted">…eller i <code>mcp.json</code>:</p>` +
    `<pre><code>${escapeHtml(JSON.stringify({ mcpServers: { 'sk-web-gui': { url, transport: 'http' } } }, null, 2))}</code></pre>`;

  const hostedBlock = hostedEndpoint
    ? `<p>Anslut din agent till den alltid-på-servern — inget att installera, alltid senaste komponenterna:</p>${connectBlock(hostedEndpoint)}`
    : `<p>I drift nås servern på sin publika adress med <code>/mcp</code> på slutet (samma mönster som den här sidan). Sätt miljövariabeln <code>MCP_PUBLIC_URL</code> så visas den exakta adressen här.</p>`;

  const localBlock =
    `<p>Kör servern i det här repot — användbart offline eller när du jobbar mot en egen branch av komponenterna:</p>` +
    `<pre><code>yarn            # installera beroenden
yarn mcp:serve  # genererar manifestet och startar servern på :${PORT}</code></pre>` +
    `<p class="muted">Anslut sedan till <code>${escapeHtml(localEndpoint)}</code>:</p>` +
    connectBlock(localEndpoint);

  const toolCards = TOOLS.map((t) => {
    const params = paramsOf(t.inputSchema);
    const rows = params.length
      ? params
          .map(
            (p) =>
              `<tr><td><code>${escapeHtml(p.name)}</code></td><td><code>${escapeHtml(p.type)}</code></td>` +
              `<td>${p.required ? '<span class="req">krävs</span>' : '<span class="opt">valfri</span>'}</td>` +
              `<td>${escapeHtml(p.description)}</td></tr>`
          )
          .join('')
      : '<tr><td colspan="4"><em>Inga parametrar.</em></td></tr>';
    const reqBody = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: t.name, arguments: t.example },
    });
    const curl = [
      `curl -X POST ${endpoint} \\`,
      `  -H 'Content-Type: application/json' \\`,
      `  -H 'Accept: application/json, text/event-stream' \\`,
      `  -d '${reqBody}'`,
    ].join('\n');
    return (
      `<section class="tool">` +
      `<h3><code>${escapeHtml(t.name)}</code><span class="title">${escapeHtml(t.title)}</span></h3>` +
      `<p>${escapeHtml(t.description)}</p>` +
      `<table><thead><tr><th>Parameter</th><th>Typ</th><th></th><th>Beskrivning</th></tr></thead>` +
      `<tbody>${rows}</tbody></table>` +
      `<details><summary>Exempelanrop</summary><pre><code>${escapeHtml(curl)}</code></pre></details>` +
      `</section>`
    );
  }).join('');

  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>@sk-web-gui · MCP-server</title>
<style>${DOCS_CSS}</style>
</head>
<body>
<main>
  <h1>@sk-web-gui <span class="muted">MCP-server</span></h1>
  <p class="lead">Ett API för AI-agenter (Claude Code, Cursor m.fl.) att utforska designsystemet @sk-web-gui — hitta komponenter, läsa deras props och slå upp design-tokens.</p>
  <p class="badges"><strong>${manifest.componentCount}</strong> komponenter · <a href="/">Styleguide</a> · <a href="/healthz">Hälsokoll</a></p>

  <h2>Vad används det till?</h2>
  <p>Använd servern när du <strong>bygger andra appar med @sk-web-gui</strong>. Din AI-agent kan fråga vilka komponenter som finns, läsa deras props och hämta design-tokens — och därmed skriva kod som följer designsystemet istället för att gissa.</p>
  <p class="muted">Agenter pratar med servern via <code>POST ${escapeHtml(endpoint)}</code> (MCP över streamable HTTP). Öppnar du samma adress i en webbläsare får du den här sidan.</p>

  <h2>Anslut</h2>
  <h3>Hostad <span class="muted">· rekommenderas</span></h3>
  ${hostedBlock}
  <h3>Lokalt</h3>
  ${localBlock}

  <h2>Verktyg</h2>
  ${toolCards}

  ${REACT_NOTE ? `<h2>Att tänka på</h2><p class="muted">${escapeHtml(REACT_NOTE)}</p>` : ''}
</main>
</body>
</html>`;
}

// --- HTTP ------------------------------------------------------------------

const app = express();
app.set('trust proxy', true); // behind Traefik — honour X-Forwarded-Proto for absolute URLs
app.use(express.json({ limit: '4mb' }));

app.get('/healthz', (_req, res) => res.json({ ok: true, components: manifest.componentCount }));

// Stateless MCP: a fresh server + transport per request.
app.post('/mcp', async (req, res) => {
  try {
    const server = buildMcpServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on('close', () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error('MCP request error:', err);
    if (!res.headersSent) res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal error' }, id: null });
  }
});

// Stateless mode has no server-initiated streams, so GET/DELETE aren't supported
// by the protocol. But a person opening /mcp in a browser should see what the
// server offers, so serve the human-readable docs to HTML-preferring requests
// (browsers) and return the protocol's 405 to MCP clients (event-stream/json).
const methodNotAllowed = (_req, res) =>
  res.status(405).json({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null });
app.get('/mcp', (req, res) => {
  if (req.accepts(['text/event-stream', 'application/json', 'html']) === 'html') {
    return res.type('html').send(renderDocsHtml(`${req.protocol}://${req.get('host')}`));
  }
  return methodNotAllowed(req, res);
});
app.delete('/mcp', methodNotAllowed);

// Serve the static styleguide for everything else (same host as /mcp).
if (fs.existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR));
} else {
  console.warn(`! ${path.relative(ROOT, STATIC_DIR)} not found — styleguide will 404 until you run "yarn build:storybook".`);
}

app.listen(PORT, () => {
  console.log(`@sk-web-gui MCP server on :${PORT}`);
  console.log(`  MCP endpoint:  http://localhost:${PORT}/mcp  (POST: protocol · GET in browser: docs)`);
  console.log(`  Styleguide:    http://localhost:${PORT}/`);
  console.log(`  Components:     ${manifest.componentCount}`);
});
