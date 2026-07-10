import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = process.cwd();
const sourceDirectory = path.relative(repositoryRoot, path.join(packageRoot, 'src')).split(path.sep).join('/');
const withCoverage = process.argv.includes('--coverage');

if (!sourceDirectory.startsWith('packages/')) {
  throw new Error('Package tests must be run from a workspace under packages/.');
}

const args = [
  path.join(repositoryRoot, 'node_modules/vitest/vitest.mjs'),
  'run',
  '--config',
  path.join(repositoryRoot, 'vitest.config.ts'),
  '--project=unit',
  '--passWithNoTests',
  sourceDirectory,
];

if (withCoverage) {
  args.push(
    '--coverage',
    `--coverage.include=${sourceDirectory}/**/*.{ts,tsx}`,
    '--coverage.thresholds.statements=0',
    '--coverage.thresholds.branches=0',
    '--coverage.thresholds.functions=0',
    '--coverage.thresholds.lines=0'
  );
}

const result = spawnSync(process.execPath, args, {
  cwd: repositoryRoot,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
