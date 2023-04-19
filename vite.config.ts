// / <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { join } from 'path';
import glob from 'fast-glob';

import commonjs from 'vite-plugin-commonjs';

const entries = {};
glob
  .sync(['./packages/*/src/index.ts', './packages/core/src/index.js', './node_modules/@sk-web-gui/react'])
  .map((file) => {
    const key = file.match(/.*(?=\.js)/);
    if (key) {
      entries[key[0]] = file;
    }
  });
// const entries = Object.fromEntries(files);

export default defineConfig({
  // plugins: [react(), commonjs()],
  cacheDir: './node_modules/.vite/sk-web-gui',

  // plugins: [
  //   dts({
  //     entryRoot: './packages',
  //     tsConfigFilePath: join(__dirname, 'tsconfig.json'),
  //     skipDiagnostics: true,
  //   }),
  //   react(),
  //   viteTsConfigPaths({
  //     root: './',
  //   }),
  // ],

  // optimizeDeps: { include: [join(__dirname, './packages/core')] },

  // optimizeDeps: {
  //   include: [
  //     '@sk-web-gui/react',
  //     // '@storybook/addon-a11y/preview.js',
  //     // '@storybook/addon-actions/preview.js',
  //     // '@storybook/addon-backgrounds/preview.js',
  //   ],
  // },
  build: {
    // sourcemap: true,
    // commonjsOptions: {
    //   // transformMixedEsModules: true,
    //   include: [join(__dirname, 'packages/core'), '@sk-web-gui/react'],
    // },
    lib: {
      entry: entries,
      // formats: ['umd'],
    },
  },
});
