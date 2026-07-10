import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const format = process.argv[2];

if (format !== 'cjs' && format !== 'esm') {
  throw new Error('Usage: node scripts/build-package.mjs <cjs|esm>');
}

function runNodeScript(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const swcCli = path.join(repoRoot, 'node_modules', '@swc', 'cli', 'bin', 'swc.js');
const outputDirectory = path.join('dist', format);
const swcConfig = path.join(repoRoot, format === 'esm' ? '.swcrc.esm' : '.swcrc');
const testFilePatterns = ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'];

runNodeScript(swcCli, [
  'src',
  '--out-dir',
  outputDirectory,
  '--delete-dir-on-start',
  '--ignore',
  testFilePatterns.join(','),
  '--strip-leading-paths',
  '--config-file',
  swcConfig,
]);

if (format === 'cjs') {
  writeFileSync(path.join(outputDirectory, 'package.json'), '{"type":"commonjs"}\n');
} else {
  runNodeScript(path.join(repoRoot, 'fix-esm-extensions.mjs'), [outputDirectory]);
}
