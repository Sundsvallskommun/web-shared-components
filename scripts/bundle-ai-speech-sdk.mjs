import { build } from 'esbuild';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const aiPackageDirectory = path.join(repoRoot, 'packages', 'ai');
const format = process.argv[2];

if (format !== 'cjs' && format !== 'esm') {
  throw new Error('Usage: node scripts/bundle-ai-speech-sdk.mjs <cjs|esm>');
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

const speechSdkDirectory = path.join(repoRoot, 'node_modules', 'microsoft-cognitiveservices-speech-sdk');
const uuidDirectory = path.join(repoRoot, 'node_modules', 'uuid');
const speechSdkPackage = await readJson(path.join(speechSdkDirectory, 'package.json'));
const uuidPackage = await readJson(path.join(uuidDirectory, 'package.json'));

if (speechSdkPackage.version !== '1.50.0' || speechSdkPackage.dependencies?.uuid !== '^9.0.0') {
  throw new Error(
    'The installed Speech SDK no longer matches the reviewed 1.50.0/uuid ^9.0.0 graph. ' +
      'Reassess GHSA-w5hq-g745-h8pq before changing the bundled adapter.'
  );
}

if (uuidPackage.version !== '11.1.1') {
  throw new Error(`The Speech SDK bundle requires uuid 11.1.1, found ${uuidPackage.version}.`);
}

const outputDirectory = path.join(aiPackageDirectory, 'dist', format, 'services');
await mkdir(outputDirectory, { recursive: true });
const buildResult = await build({
  absWorkingDir: repoRoot,
  bundle: true,
  entryPoints: [path.join(aiPackageDirectory, 'src', 'services', 'speech-sdk.ts')],
  format,
  legalComments: 'none',
  metafile: true,
  outfile: path.join(outputDirectory, 'speech-sdk.js'),
  platform: 'browser',
  sourcemap: true,
  target: 'es2018',
});

const externalImports = Object.values(buildResult.metafile.outputs).flatMap((output) =>
  output.imports.filter((imported) => imported.external).map((imported) => imported.path)
);
const bundledUuidInputs = Object.keys(buildResult.metafile.inputs).filter((input) =>
  input.includes('node_modules/uuid/')
);

if (externalImports.length > 0) {
  throw new Error(`The Speech SDK bundle has unexpected runtime imports: ${externalImports.join(', ')}`);
}

if (bundledUuidInputs.length === 0) {
  throw new Error('The reviewed uuid implementation was not included in the Speech SDK bundle.');
}

const licensesDirectory = path.join(aiPackageDirectory, 'dist', 'licenses');
await rm(licensesDirectory, { force: true, recursive: true });
await mkdir(licensesDirectory, { recursive: true });

function packageDirectoryFromInput(input) {
  const normalizedInput = input.replace(/^\(disabled\):/, '');
  const segments = normalizedInput.split('/');
  const nodeModulesIndex = segments.lastIndexOf('node_modules');
  if (nodeModulesIndex < 0) return undefined;

  const packageEnd = segments[nodeModulesIndex + 1]?.startsWith('@') ? nodeModulesIndex + 3 : nodeModulesIndex + 2;
  return path.join(repoRoot, ...segments.slice(0, packageEnd));
}

const bundledPackages = new Map();
for (const input of Object.keys(buildResult.metafile.inputs)) {
  const packageDirectory = packageDirectoryFromInput(input);
  if (!packageDirectory) continue;

  const packageJson = await readJson(path.join(packageDirectory, 'package.json'));
  bundledPackages.set(`${packageJson.name}@${packageJson.version}`, {
    directory: packageDirectory,
    license: packageJson.license,
    name: packageJson.name,
    version: packageJson.version,
  });
}

const mitLicenseText = `MIT License

Copyright (c) [year] [copyright holder]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
const standardLicenseTexts = {
  'Apache-2.0': await readFile(path.join(repoRoot, 'node_modules', '@azure', 'core-auth', 'LICENSE'), 'utf8'),
  MIT: mitLicenseText,
};
const copiedStandardLicenses = new Set();
const licenseManifest = [];

for (const bundledPackage of [...bundledPackages.values()].sort((a, b) =>
  `${a.name}@${a.version}`.localeCompare(`${b.name}@${b.version}`, 'en')
)) {
  const standardLicenseText = standardLicenseTexts[bundledPackage.license];
  if (!standardLicenseText) {
    throw new Error(
      `No reviewed full license text is configured for ${bundledPackage.name}@${bundledPackage.version} ` +
        `(${bundledPackage.license ?? 'missing license declaration'}).`
    );
  }

  const standardLicenseFile = `SPDX-${bundledPackage.license}.txt`;
  if (!copiedStandardLicenses.has(standardLicenseFile)) {
    await writeFile(path.join(licensesDirectory, standardLicenseFile), standardLicenseText);
    copiedStandardLicenses.add(standardLicenseFile);
  }

  const packageLicenseDirectoryName = `${bundledPackage.name.replace(/^@/, '').replace('/', '__')}@${bundledPackage.version}`;
  const packageLicenseDirectory = path.join(licensesDirectory, packageLicenseDirectoryName);
  const packageFiles = await readdir(bundledPackage.directory, { withFileTypes: true });
  const licenseFiles = packageFiles
    .filter(
      (entry) =>
        entry.isFile() && /^(?:licen[cs]e|notice|copying|copyright|redist)(?:\..*)?$/i.test(entry.name)
    )
    .map((entry) => entry.name)
    .sort();

  await mkdir(packageLicenseDirectory, { recursive: true });
  if (licenseFiles.length > 0) {
    await Promise.all(
      licenseFiles.map((file) =>
        copyFile(path.join(bundledPackage.directory, file), path.join(packageLicenseDirectory, file))
      )
    );
  }

  const packageJson = await readJson(path.join(bundledPackage.directory, 'package.json'));
  let readmeLicenseSection;
  if (licenseFiles.length === 0) {
    const readme = await readFile(path.join(bundledPackage.directory, 'README.md'), 'utf8').catch(() => '');
    const licenseHeading = readme.match(/(?:^|\n)License\r?\n-+\r?\n([\s\S]*)$/i);
    readmeLicenseSection = licenseHeading?.[1]?.trim();
  }

  const packageNotice = [
    `Package: ${bundledPackage.name}`,
    `Version: ${bundledPackage.version}`,
    `Declared license: ${bundledPackage.license}`,
    `Author: ${typeof packageJson.author === 'string' ? packageJson.author : JSON.stringify(packageJson.author ?? null)}`,
    `Repository: ${
      typeof packageJson.repository === 'string'
        ? packageJson.repository
        : packageJson.repository?.url ?? 'not declared'
    }`,
    `Full license text: ../${standardLicenseFile}`,
    '',
    ...(readmeLicenseSection
      ? ['License and copyright text included in the published package README:', '', readmeLicenseSection, '']
      : []),
  ];
  await writeFile(path.join(packageLicenseDirectory, 'NOTICE.txt'), packageNotice.join('\n'));

  licenseManifest.push({
    name: bundledPackage.name,
    version: bundledPackage.version,
    license: bundledPackage.license,
    fullLicenseText: standardLicenseFile,
    packageLicenseFiles: [
      `${packageLicenseDirectoryName}/NOTICE.txt`,
      ...licenseFiles.map((file) => `${packageLicenseDirectoryName}/${file}`),
    ],
  });
}

const notices = [
  '# Bundled third-party software',
  '',
  'This file is generated from the esbuild metafile. Every bundled or browser-disabled third-party package is listed.',
  '',
  '| Package | Version | Declared license | Full license text | Package files |',
  '| --- | --- | --- | --- | --- |',
  ...licenseManifest.map(
    (entry) =>
      `| ${entry.name} | ${entry.version} | ${entry.license} | ${entry.fullLicenseText} | ` +
      `${entry.packageLicenseFiles.join(', ') || 'No package-specific file; SPDX text applies'} |`
  ),
  '',
];
await writeFile(path.join(licensesDirectory, 'THIRD_PARTY_NOTICES.md'), notices.join('\n'));
await writeFile(
  path.join(licensesDirectory, 'THIRD_PARTY_LICENSES.json'),
  `${JSON.stringify({ packages: licenseManifest }, null, 2)}\n`
);

console.log(
  `Bundled Speech SDK ${speechSdkPackage.version} with uuid ${uuidPackage.version} for ${format}; ` +
    `recorded ${licenseManifest.length} third-party packages.`
);
