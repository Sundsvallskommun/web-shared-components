import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reloadStylesOnFolderChange } from './utils';

function getPackages() {
  const packagesPath = path.resolve(__dirname, '../packages');
  return fs.readdirSync(packagesPath);
}

const config: StorybookConfig = {
  stories: [
    './stories/intro/intro.mdx' /** child 0: Start/Index */,
    './stories/**/*.@(tsx|mdx)',
    '../packages/*/stories/**/*.stories.tsx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('storybook-dark-mode'),
  ],
  features: {
    developmentModeForBuild: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      return mergeConfig(config, {
        plugins: [tailwindcss()],
        build: {
          rollupOptions: {
            //onwarn: https://github.com/TanStack/query/issues/5175#issuecomment-1482196558
            onwarn: (warning, warn) => {
              if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
              }
              warn(warning);
            },
            input: getPackages().reduce((entries, packageName) => {
              entries[packageName] = path.resolve(__dirname, `../packages/${packageName}/dist/esm/index.js`);
              return entries;
            }, {}),
          },
        },
      });
    }
    if (configType === 'DEVELOPMENT') {
      return mergeConfig(config, {
        server: {
          fs: {
            allow: ['..'],
          },
          watch: {
            ignored: ['!../packages/core/src/components/**'],
          },
        },
        plugins: [
          tailwindcss(),
          react(),
          tsconfigPaths(),
          reloadStylesOnFolderChange(
            path.resolve(__dirname, '../packages/core/src/components'),
            path.resolve(__dirname, 'styles.scss')
          ),
        ],
        optimizeDeps: {
          exclude: ['@sk-web-gui/*', 'packages/*'],
        },
        build: {
          rollupOptions: {
            //onwarn: https://github.com/TanStack/query/issues/5175#issuecomment-1482196558
            onwarn: (warning, warn) => {
              if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
              }
              warn(warning);
            },
            input: [
              ...getPackages().map((packageName) => path.resolve(__dirname, `../packages/${packageName}/index.ts`)),
              path.resolve(__dirname, `../packages/core/src/components/**`),
            ],
          },
        },
        resolve: {
          alias: getPackages().reduce((entries: Array<unknown>, packageName) => {
            entries.push({
              find: `@sk-web-gui/${packageName}`,
              replacement: path.resolve(__dirname, `../packages/${packageName}/index.ts`),
            });
            return entries;
          }, []),
        },
      });
    }
    return config;
  },
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-vite',
      options: { fsCache: false },
    },
  },
  framework: getAbsolutePath('@storybook/react-vite'),
  staticDirs: ['./public'],
  docs: {
    // set to change the name of generated docs entries
    defaultName: 'Dokumentation',
  },
};
export default config;

function getAbsolutePath(value: string) {
  return path.dirname(require.resolve(path.join(value, 'package.json')));
}
