import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginBabel from '@rollup/plugin-babel';
import fs from 'fs';

function getPackages() {
  const packagesPath = path.resolve(__dirname, '../packages');
  return fs.readdirSync(packagesPath);
}

const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(tsx|mdx)', '../packages/*/stories/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', 'storybook-dark-mode'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    skipBabel: true,
    check: false,
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
            plugins: [rollupPluginBabel(), nodeResolve()],
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
        build: {
          rollupOptions: {
            //onwarn: https://github.com/TanStack/query/issues/5175#issuecomment-1482196558
            onwarn: (warning, warn) => {
              if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
              }
              warn(warning);
            },
            input: getPackages().map((packageName) => path.resolve(__dirname, `../packages/${packageName}/index.ts`)),
          },
        },
        resolve: {
          alias: getPackages().reduce((entries: Array<any>, packageName) => {
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
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  staticDirs: ['./public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Dokumentation', // set to change the name of generated docs entries
  },
};
export default config;
