import type { StorybookConfig } from '@storybook/react-vite';
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
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', 'storybook-dark-mode'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      return mergeConfig(config, {
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
  core: { disableTelemetry: true },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['./public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Dokumentation', // set to change the name of generated docs entries
  },
};
export default config;
