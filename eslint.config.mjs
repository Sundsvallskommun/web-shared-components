import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';
import hooksPlugin from 'eslint-plugin-react-hooks';
import js from '@eslint/js';

export default [
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      storybook: storybook,
      'react-hooks': hooksPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    ignores: ['**/dist/**', 'packages/*/eslint.config.mjs', '**/*.d.ts', 'ecosystem.config.js'],
  },
  {
    files: ['packages/*/stories/**/*.tsx', '.storybook/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-implicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
