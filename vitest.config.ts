import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      // Unit tests (jsdom)
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['packages/*/src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.tsx'],
          clearMocks: true,
          restoreMocks: true,
          // Distinct groupOrder is required because the projects run with
          // different maxWorkers now that storybook is single-session.
          sequence: { groupOrder: 0 },
        },
      },
      // Storybook tests (browser via Playwright)
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            tags: { include: ['test'] },
          }),
        ],
        // Scan every story upfront so all third-party dependencies are
        // pre-bundled before tests start. Deps discovered mid-run trigger
        // a re-optimization that reloads the page, which kills the active
        // test session on cold CI caches.
        optimizeDeps: {
          entries: ['.storybook/preview.tsx', '.storybook/stories/**/*.tsx', 'packages/*/stories/**/*.stories.tsx'],
        },
        test: {
          name: 'storybook',
          // Per-file page reloads race against session teardown in
          // @vitest/browser ("Browser connection was closed while running
          // tests"), which on slow CI runners wedges the run until the job
          // times out. One session running all files back-to-back avoids
          // the reload churn entirely and is also much faster.
          fileParallelism: false,
          isolate: false,
          sequence: { groupOrder: 1 },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.tsx', '**/*.d.ts'],
      thresholds: {
        statements: 51,
        branches: 36,
        functions: 40,
        lines: 52,
      },
    },
  },
});
