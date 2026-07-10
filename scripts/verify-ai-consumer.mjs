import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const aiPackageDirectory = path.join(repoRoot, 'packages', 'ai');
const utilsPackageDirectory = path.join(repoRoot, 'packages', 'utils');
const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'sk-ai-consumer-'));
const artifactsDirectory = path.join(temporaryRoot, 'artifacts');
const consumerDirectory = path.join(temporaryRoot, 'consumer');

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed:\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout;
}

try {
  await Promise.all([mkdir(artifactsDirectory, { recursive: true }), mkdir(consumerDirectory, { recursive: true })]);
  const aiPackResult = JSON.parse(
    run('npm', ['pack', '.', '--json', '--pack-destination', artifactsDirectory], aiPackageDirectory)
  )[0];
  const utilsPackResult = JSON.parse(
    run('npm', ['pack', '.', '--json', '--pack-destination', artifactsDirectory], utilsPackageDirectory)
  )[0];
  const aiArchive = path.join(artifactsDirectory, aiPackResult.filename);
  const utilsArchive = path.join(artifactsDirectory, utilsPackResult.filename);

  await writeFile(
    path.join(consumerDirectory, 'package.json'),
    `${JSON.stringify(
      {
        name: 'sk-ai-consumer-check',
        private: true,
        type: 'module',
        dependencies: {
          '@sk-web-gui/ai': `file:${aiArchive}`,
          '@sk-web-gui/utils': `file:${utilsArchive}`,
        },
      },
      null,
      2
    )}\n`
  );
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], consumerDirectory);

  const speechDependencyResult = spawnSync('npm', ['ls', 'microsoft-cognitiveservices-speech-sdk', '--all', '--json'], {
    cwd: consumerDirectory,
    encoding: 'utf8',
  });
  if (speechDependencyResult.error) throw speechDependencyResult.error;
  if (![0, 1].includes(speechDependencyResult.status ?? -1)) {
    throw new Error(`Could not inspect the packed AI dependency tree:\n${speechDependencyResult.stderr}`);
  }
  if (speechDependencyResult.stdout.includes('microsoft-cognitiveservices-speech-sdk')) {
    throw new Error('The published AI package still installs the build-only Speech SDK.');
  }

  const speechBundle = await import(
    pathToFileURL(
      path.join(consumerDirectory, 'node_modules', '@sk-web-gui', 'ai', 'dist', 'esm', 'services', 'speech-sdk.js')
    )
  );
  const stream = speechBundle.AudioInputStream.createPushStream();
  const recognizer = new speechBundle.SpeechRecognizer(
    speechBundle.SpeechConfig.fromAuthorizationToken('test-token', 'swedencentral'),
    speechBundle.AudioConfig.fromStreamInput(stream)
  );
  recognizer.close();
  stream.close();

  const require = createRequire(import.meta.url);
  const commonJsSpeechBundle = require(
    path.join(consumerDirectory, 'node_modules', '@sk-web-gui', 'ai', 'dist', 'cjs', 'services', 'speech-sdk.js')
  );
  const commonJsStream = commonJsSpeechBundle.AudioInputStream.createPushStream();
  const commonJsRecognizer = new commonJsSpeechBundle.SpeechRecognizer(
    commonJsSpeechBundle.SpeechConfig.fromAuthorizationToken('test-token', 'swedencentral'),
    commonJsSpeechBundle.AudioConfig.fromStreamInput(commonJsStream)
  );
  commonJsRecognizer.close();
  commonJsStream.close();

  await writeFile(
    path.join(consumerDirectory, 'index.ts'),
    'import { useSpeechToText } from "@sk-web-gui/ai";\nvoid useSpeechToText;\n'
  );
  await writeFile(
    path.join(consumerDirectory, 'tsconfig.json'),
    `${JSON.stringify({
      compilerOptions: {
        jsx: 'react-jsx',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        noEmit: true,
        skipLibCheck: false,
        strict: true,
        target: 'ES2022',
      },
      include: ['index.ts'],
    })}\n`
  );
  run(
    process.execPath,
    [path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', 'tsconfig.json'],
    consumerDirectory
  );

  console.log(
    'Verified the packed AI artifact in an npm consumer: ESM/CJS Speech SDK smoke tests and strict TypeScript compile passed.'
  );
} finally {
  await rm(temporaryRoot, { force: true, recursive: true });
}
