// Generates mcp-server/manifest.json — the knowledge base the MCP server serves.
//
// For every Storybook story file we derive one component entry (name, category,
// import path, tags) and enrich it with props read from the matching `*Props`
// interface in the package source (via the TypeScript compiler — reliable for
// this codebase's forwardRef/polymorphic components, which react-docgen mishandles).
// Design tokens are read from the built @sk-web-gui/theme package.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');

// Storybook top-level sections we treat as real, discoverable components.
const COMPONENT_CATEGORIES = ['Komponenter', 'AI', 'Layout'];

// Hand-curated synonyms (mostly Swedish use-case words) to make find-component
// match how developers actually phrase intent. Keyed by component name (lowercase).
const KEYWORDS = {
  alert: ['varning', 'fel', 'error', 'meddelande', 'notis', 'banner', 'feedback'],
  callout: ['informationsruta', 'highlight', 'uppmärksamma', 'notis', 'tips'],
  snackbar: ['toast', 'notis', 'temporärt meddelande', 'feedback', 'bekräftelse'],
  button: ['knapp', 'cta', 'åtgärd', 'submit', 'skicka'],
  modal: ['dialog', 'popup', 'overlay', 'ruta', 'fönster'],
  tabs: ['flikar', 'tab', 'sektioner', 'navigering'],
  table: ['tabell', 'data', 'rader', 'kolumner', 'lista'],
  select: ['dropdown', 'rullgardin', 'val', 'lista', 'meny'],
  combobox: ['autocomplete', 'sök och välj', 'dropdown med sök'],
  input: ['textfält', 'inmatning', 'fält', 'formulär'],
  'text-field': ['textfält', 'inmatning', 'formulär'],
  textarea: ['flerradigt textfält', 'fritext', 'kommentar'],
  checkbox: ['kryssruta', 'flerval', 'formulär'],
  radio: ['alternativknapp', 'enkelval', 'formulär'],
  switch: ['växel', 'toggle', 'på av', 'inställning'],
  'date-picker': ['datumväljare', 'kalender', 'datum'],
  searchfield: ['sök', 'sökruta', 'sökfält'],
  pagination: ['sidnumrering', 'sidor', 'bläddra'],
  breadcrumb: ['brödsmulor', 'sökväg', 'navigering'],
  accordion: ['dragspel', 'expanderbar', 'fäll ut', 'collapse'],
  chip: ['tagg', 'etikett', 'filter', 'badge'],
  badge: ['märke', 'räknare', 'notifiering', 'antal'],
  avatar: ['profilbild', 'användarbild', 'initialer'],
  tooltip: ['hjälptext', 'verktygstips', 'hover'],
  spinner: ['laddar', 'loading', 'väntar'],
  'progress-bar': ['förlopp', 'laddning', 'procent'],
  'progress-stepper': ['steg', 'flersteg', 'wizard', 'förlopp'],
  link: ['länk', 'hyperlänk', 'navigering'],
  divider: ['avdelare', 'linje', 'separator'],
  'cookie-consent': ['kakor', 'samtycke', 'gdpr', 'cookies'],
  'user-menu': ['användarmeny', 'profilmeny', 'konto'],
  'popup-menu': ['kontextmeny', 'dropdownmeny', 'åtgärder'],
  'menu-vertical': ['sidomeny', 'navigation', 'meny'],
  filter: ['filtrering', 'urval', 'sortera'],
  label: ['etikett', 'fältnamn'],
  'file-upload': ['filuppladdning', 'ladda upp', 'bifoga', 'fil'],
};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Re-key the curated keywords by normalized name so kebab keys ("date-picker")
// match normalized component names ("datepicker").
const KEYWORDS_BY_NORM = Object.fromEntries(Object.entries(KEYWORDS).map(([k, v]) => [norm(k), v]));

function walk(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full, predicate, out);
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

// Pull the Storybook title and `component:` name out of a story's default export.
function parseStory(file) {
  const text = fs.readFileSync(file, 'utf8');
  const titleMatches = [...text.matchAll(/title:\s*(['"`])(.*?)\1/g)].map((m) => m[2]);
  const title = titleMatches.find((t) => COMPONENT_CATEGORIES.some((c) => t === c || t.startsWith(c + '/')));
  if (!title) return null;
  const segments = title.split('/');
  const name = segments[segments.length - 1];
  const category = segments.slice(0, -1).join(' / ') || segments[0];
  const componentMatch = text.match(/component:\s*([A-Za-z0-9_]+)/);
  const component = componentMatch ? componentMatch[1] : name;
  const tagsMatch = text.match(/tags:\s*\[([^\]]*)\]/);
  const tags = tagsMatch ? [...tagsMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]) : [];
  return { title, name, category, component, tags };
}

function jsdocOf(symbol, checker) {
  if (!symbol) return undefined;
  const text = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
  return text || undefined;
}

// Build a map: packageName -> { normalizedPropsName -> { description, props[] } }
// by reading every `*Props` interface / type alias in the source tree.
function extractAllProps(fileToPackage) {
  const files = [...fileToPackage.keys()];
  const program = ts.createProgram(files, {
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
    skipLibCheck: true,
    noEmit: true,
    target: ts.ScriptTarget.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  });
  const checker = program.getTypeChecker();
  const byPackage = {};

  // Resolve a props type to its own (repo-declared) members, flattening every
  // `extends`/intersection. Inherited DOM/React attributes (declared in
  // node_modules) are dropped so only component-specific props remain.
  const resolveProps = (symbol, location) => {
    const type = checker.getDeclaredTypeOfSymbol(symbol);
    return type
      .getProperties()
      .map((sym) => {
        const decl = sym.valueDeclaration || sym.declarations?.[0];
        if (decl && decl.getSourceFile().fileName.includes('node_modules')) return null;
        const propType = checker.typeToString(checker.getTypeOfSymbolAtLocation(sym, location)).replace(/\s+/g, ' ');
        if (propType.startsWith('typeof ')) return null; // compound-namespace member
        return {
          name: sym.getName(),
          type: propType,
          required: !(sym.flags & ts.SymbolFlags.Optional),
          description: jsdocOf(sym, checker),
        };
      })
      .filter(Boolean);
  };

  for (const sf of program.getSourceFiles()) {
    const pkg = fileToPackage.get(path.normalize(sf.fileName));
    if (!pkg) continue;
    ts.forEachChild(sf, (node) => {
      const isInterface = ts.isInterfaceDeclaration(node);
      const isTypeAlias = ts.isTypeAliasDeclaration(node);
      if ((!isInterface && !isTypeAlias) || !node.name.text.endsWith('Props')) return;
      // Skip the compound wrapper (the `X` namespace object type), which extends
      // ForwardRefExoticComponent and shadows the real props interface.
      const heritage = (node.heritageClauses || []).map((h) => h.getText(sf)).join(' ');
      if (heritage.includes('ForwardRefExoticComponent')) return;

      const symbol = checker.getSymbolAtLocation(node.name);
      if (!symbol) return;
      // `InternalSelectProps` -> key `select`; otherwise `<Name>Props` -> `<name>`.
      const key = norm(node.name.text.replace(/Props$/, '').replace(/^Internal/, ''));
      const entry = { description: jsdocOf(symbol, checker), props: resolveProps(symbol, node) };
      const existing = (byPackage[pkg] ||= {})[key];
      if (!existing || entry.props.length > existing.props.length) byPackage[pkg][key] = entry;
    });
  }
  return byPackage;
}

function flattenColors(obj, prefix = '', out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object') flattenColors(value, name, out);
    else out[name] = value;
  }
  return out;
}

async function buildTokens() {
  try {
    const theme = await import('@sk-web-gui/theme');
    return {
      colors: flattenColors(theme.primitives || {}),
      spacing: theme.spacing || {},
      radius: theme.radius || {},
      fontSizes: theme.fontSizes || {},
      lineHeights: theme.lineHeights || {},
      fonts: theme.fonts || {},
      screens: theme.screens || theme.breakpoints || {},
    };
  } catch (err) {
    console.warn(`! tokens unavailable (build @sk-web-gui/theme first): ${err.message}`);
    return null;
  }
}

async function main() {
  const pkgDirs = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(PACKAGES_DIR, d.name));

  // Map every source file to its package name, and find story files.
  const fileToPackage = new Map();
  const stories = []; // { file, pkgName }
  for (const pkgDir of pkgDirs) {
    let pkgName;
    try {
      pkgName = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8')).name;
    } catch {
      continue;
    }
    for (const f of walk(path.join(pkgDir, 'src'), (f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f))) {
      fileToPackage.set(path.normalize(f), pkgName);
    }
    for (const f of walk(path.join(pkgDir, 'stories'), (f) => f.endsWith('.stories.tsx'))) {
      stories.push({ file: f, pkgName });
    }
  }

  const propsByPackage = extractAllProps(fileToPackage);

  const components = [];
  const seen = new Set();
  for (const { file, pkgName } of stories) {
    const story = parseStory(file);
    if (!story || seen.has(story.title)) continue;
    seen.add(story.title);

    const keywords = KEYWORDS_BY_NORM[norm(story.name)] || [];
    const pkgProps = propsByPackage[pkgName] || {};
    // Real props may live under `XProps` or, for compound components, `XComponentProps`.
    const doc =
      pkgProps[norm(story.component)] ||
      pkgProps[norm(story.name)] ||
      pkgProps[norm(story.component) + 'component'] ||
      pkgProps[norm(story.name) + 'component'] ||
      {};
    components.push({
      name: story.name,
      category: story.category,
      package: pkgName,
      importPath: pkgName,
      description: doc.description,
      tags: story.tags,
      keywords,
      props: doc.props || [],
      storyFile: path.relative(ROOT, file),
    });
  }

  components.sort((a, b) => a.name.localeCompare(b.name));
  const tokens = await buildTokens();

  const manifest = {
    generatedAt: new Date().toISOString(),
    componentCount: components.length,
    note: 'Alla komponenter exporteras även samlat från @sk-web-gui/react.',
    components,
    tokens,
  };

  const outPath = path.join(__dirname, 'manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  const withProps = components.filter((c) => c.props.length).length;
  console.log(
    `✓ Wrote ${path.relative(ROOT, outPath)} — ${components.length} components ` +
      `(${withProps} with props), ${tokens ? Object.keys(tokens.colors).length : 0} color tokens`
  );
}

main();
