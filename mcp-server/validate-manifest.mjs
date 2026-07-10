import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(
  process.argv[2] || process.env.MCP_MANIFEST_PATH || path.join(__dirname, 'manifest.json')
);

if (!fs.existsSync(manifestPath)) throw new Error(`Manifest does not exist: ${manifestPath}`);

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!Array.isArray(manifest.components) || manifest.components.length === 0) {
  throw new Error('Manifest must contain at least one component.');
}
if (manifest.componentCount !== manifest.components.length) {
  throw new Error(`componentCount ${manifest.componentCount} does not match ${manifest.components.length} components.`);
}
if (!manifest.generatedAt || Number.isNaN(Date.parse(manifest.generatedAt))) {
  throw new Error('Manifest generatedAt must be an ISO-compatible timestamp.');
}
if (!manifest.tokens || typeof manifest.tokens !== 'object' || Array.isArray(manifest.tokens)) {
  throw new Error('Manifest must contain generated design tokens.');
}

for (const [index, component] of manifest.components.entries()) {
  for (const field of ['name', 'category', 'package', 'importPath', 'storyFile']) {
    if (typeof component[field] !== 'string' || component[field].trim() === '') {
      throw new Error(`Component ${index} has an invalid ${field}.`);
    }
  }
  if (!Array.isArray(component.props) || !Array.isArray(component.tags) || !Array.isArray(component.keywords)) {
    throw new Error(`Component ${component.name} has invalid list fields.`);
  }
  if (path.isAbsolute(component.storyFile) || component.storyFile.split(/[\\/]/).includes('..')) {
    throw new Error(`Component ${component.name} exposes a story path outside the repository.`);
  }
}

console.log(`Validated ${manifest.components.length} components in ${path.relative(process.cwd(), manifestPath)}.`);
