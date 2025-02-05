import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['build/*', '.next/*', 'node_modules/*'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        lib: ['dom', 'dom.iterable', 'esnext'],
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
    },
  },
  {
    files: ['jest.config.js', 'jest.setup.js'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];