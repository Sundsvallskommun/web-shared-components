import { spawnSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesDirectory = path.join(repoRoot, 'packages');
const testArtifactPattern = /(^|\/)[^/]+\.(test|spec)\.(?:[cm]?[jt]sx?|d\.ts)(?:\.map)?$/i;
const speechSdkName = 'microsoft-cognitiveservices-speech-sdk';
const nodeBuiltins = new Set(builtinModules.flatMap((moduleName) => [moduleName, `node:${moduleName}`]));
const expectedAiLicensePackages = new Set(['agent-base', 'bent', 'https-proxy-agent', speechSdkName, 'uuid', 'ws']);

async function collectFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path.join(directory, entry.name), relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

function runPack(packageDirectory) {
  const result = spawnSync('npm', ['pack', '.', '--dry-run', '--json'], {
    cwd: packageDirectory,
    encoding: 'utf8',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`npm pack failed in ${packageDirectory}:\n${result.stderr || result.stdout}`);
  }

  return JSON.parse(result.stdout)[0];
}

function dependencyNameFromSpecifier(specifier) {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
}

const packageDirectories = (await readdir(packagesDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(packagesDirectory, entry.name))
  .sort();

const violations = [];
let verifiedPackages = 0;
let aiLicensePackageCount = 0;

for (const packageDirectory of packageDirectories) {
  const packageJsonPath = path.join(packageDirectory, 'package.json');
  let packageJson;

  try {
    packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') continue;
    throw error;
  }

  if (packageJson.private) continue;

  const distDirectory = path.join(packageDirectory, 'dist');
  const distFiles = await collectFiles(distDirectory);
  const packed = runPack(packageDirectory);
  const packedFiles = (packed.files ?? []).map((file) => file.path);
  const publicDependencies = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.optionalDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]);

  if (!distFiles.includes('cjs/package.json')) {
    violations.push(`${packageJson.name}: dist/cjs/package.json is missing`);
  } else {
    const cjsBoundary = JSON.parse(await readFile(path.join(distDirectory, 'cjs', 'package.json'), 'utf8'));
    if (cjsBoundary.type !== 'commonjs') {
      violations.push(`${packageJson.name}: dist/cjs/package.json must declare type=commonjs`);
    }
  }

  if (!packedFiles.includes('dist/cjs/package.json')) {
    violations.push(`${packageJson.name}: npm pack omits dist/cjs/package.json`);
  }

  for (const file of distFiles) {
    if (testArtifactPattern.test(file)) {
      violations.push(`${packageJson.name}: dist/${file}`);
    }

    if (file.endsWith('.d.ts')) {
      const declaration = await readFile(path.join(distDirectory, file), 'utf8');
      if (declaration.includes(speechSdkName)) {
        violations.push(`${packageJson.name}: dist/${file} exposes the dev-only Speech SDK`);
      }

      for (const match of declaration.matchAll(/(?:from\s+|import\s*\()(['"])([^'".][^'"]*)\1/g)) {
        const specifier = match[2];
        const dependencyName = dependencyNameFromSpecifier(specifier);
        if (!nodeBuiltins.has(specifier) && !publicDependencies.has(dependencyName)) {
          violations.push(
            `${packageJson.name}: dist/${file} references undeclared public type dependency ${dependencyName}`
          );
        }
      }
    }
  }

  for (const file of packedFiles) {
    if (file.startsWith('dist/') && testArtifactPattern.test(file)) {
      violations.push(`${packageJson.name}: packed ${file}`);
    }
  }

  if (packageJson.name === '@sk-web-gui/ai') {
    if (packageJson.dependencies?.[speechSdkName] || packageJson.dependencies?.uuid) {
      violations.push('@sk-web-gui/ai: Speech SDK and uuid must remain build-only dependencies');
    }

    const licenseManifestPath = path.join(distDirectory, 'licenses', 'THIRD_PARTY_LICENSES.json');
    const licenseManifest = JSON.parse(await readFile(licenseManifestPath, 'utf8'));
    const licensedPackageNames = new Set(licenseManifest.packages?.map((entry) => entry.name));
    aiLicensePackageCount = licensedPackageNames.size;

    for (const expectedPackage of expectedAiLicensePackages) {
      if (!licensedPackageNames.has(expectedPackage)) {
        violations.push(`@sk-web-gui/ai: missing bundled license entry for ${expectedPackage}`);
      }
    }

    for (const entry of licenseManifest.packages ?? []) {
      if (!(entry.packageLicenseFiles ?? []).some((file) => file.endsWith('/NOTICE.txt'))) {
        violations.push(`@sk-web-gui/ai: missing package-specific NOTICE for ${entry.name}@${entry.version}`);
      }
      const requiredLicenseFiles = [entry.fullLicenseText, ...(entry.packageLicenseFiles ?? [])];
      for (const licenseFile of requiredLicenseFiles) {
        const packedLicensePath = `dist/licenses/${licenseFile}`;
        if (!packedFiles.includes(packedLicensePath)) {
          violations.push(`@sk-web-gui/ai: npm pack omits ${packedLicensePath}`);
        }
      }
    }

    for (const requiredFile of ['dist/licenses/THIRD_PARTY_LICENSES.json', 'dist/licenses/THIRD_PARTY_NOTICES.md']) {
      if (!packedFiles.includes(requiredFile)) {
        violations.push(`@sk-web-gui/ai: npm pack omits ${requiredFile}`);
      }
    }
  }

  verifiedPackages += 1;
}

if (violations.length > 0) {
  throw new Error(`Publishable test artifacts found:\n${violations.join('\n')}`);
}

console.log(
  `Verified ${verifiedPackages} publishable packages: no test/spec artifacts or leaked Speech SDK declarations; ` +
    `the AI artifact records ${aiLicensePackageCount} bundled third-party packages.`
);
