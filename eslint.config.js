export default tseslint.config(eslint.configs.recommended, {
  plugin: ['storybook/recommended'],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  overrides: [
    {
      files: ['**/src/**/*.ts', '**/src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-implicit-any': 'error',
      },
    },
    {
      files: ['**/stories/**/*.ts', '**/stories/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-implicit-any': 'off',
      },
    },
  ],
});
