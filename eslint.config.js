import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
]);
