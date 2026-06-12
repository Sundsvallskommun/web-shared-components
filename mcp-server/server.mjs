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

function buildMcpServer() {
  const server = new McpServer({ name: '@sk-web-gui/mcp', version: '0.1.0' });

  server.registerTool(
    'find-component',
    {
      title: 'Hitta komponent',
      description:
        'Hitta vilka @sk-web-gui-komponenter som passar ett behov. Sök på funktion/use-case ' +
        '(t.ex. "visa ett felmeddelande", "datumväljare", "dropdown med sök"). Returnerar en ' +
        'rankad lista. Anropa get-component för fullständiga props.',
      inputSchema: { query: z.string().describe('Behov/use-case eller komponentnamn'), limit: z.number().int().min(1).max(25).optional() },
    },
    async ({ query, limit }) => {
      const results = findComponents(query, limit ?? 8);
      return text({ query, count: results.length, results, note: REACT_NOTE });
    }
  );

  server.registerTool(
    'list-components',
    {
      title: 'Lista komponenter',
      description: 'Lista alla tillgängliga komponenter, valfritt filtrerat på kategori.',
      inputSchema: { category: z.string().optional().describe('Filtrera på kategori, t.ex. "Komponenter" eller "AI"') },
    },
    async ({ category }) => {
      const list = manifest.components
        .filter((c) => !category || c.category.toLowerCase().includes(category.toLowerCase()))
        .map((c) => ({ name: c.name, category: c.category, importPath: c.importPath }));
      return text({ count: list.length, components: list, note: REACT_NOTE });
    }
  );

  server.registerTool(
    'get-component',
    {
      title: 'Hämta komponent',
      description:
        'Hämta fullständig information om en komponent: import-väg, beskrivning, alla props ' +
        '(typ, om de krävs, beskrivning) och tags.',
      inputSchema: { name: z.string().describe('Komponentnamn, t.ex. "Button"') },
    },
    async ({ name }) => {
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
    }
  );

  server.registerTool(
    'get-design-tokens',
    {
      title: 'Hämta design-tokens',
      description:
        'Hämta designsystemets tokens (colors, spacing, radius, fontSizes, lineHeights, fonts, screens). ' +
        'Använd dessa istället för hårdkodade värden.',
      inputSchema: {
        group: z.enum(['colors', 'spacing', 'radius', 'fontSizes', 'lineHeights', 'fonts', 'screens', 'all']).optional(),
        filter: z.string().optional().describe('Filtrera token-namn, t.ex. "blue" eller "primary"'),
      },
    },
    async ({ group, filter }) => {
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
    }
  );

  return server;
}

// --- HTTP ------------------------------------------------------------------

const app = express();
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

// Stateless mode has no server-initiated streams, so GET/DELETE are not supported.
const methodNotAllowed = (_req, res) =>
  res.status(405).json({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null });
app.get('/mcp', methodNotAllowed);
app.delete('/mcp', methodNotAllowed);

// Serve the static styleguide for everything else (same host as /mcp).
if (fs.existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR));
} else {
  console.warn(`! ${path.relative(ROOT, STATIC_DIR)} not found — styleguide will 404 until you run "yarn build:storybook".`);
}

app.listen(PORT, () => {
  console.log(`@sk-web-gui MCP server on :${PORT}`);
  console.log(`  MCP endpoint:  http://localhost:${PORT}/mcp`);
  console.log(`  Styleguide:    http://localhost:${PORT}/`);
  console.log(`  Components:     ${manifest.componentCount}`);
});
