import antfu from '@antfu/eslint-config';

import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default antfu(
  {
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
    markdown: true,
    nextjs: true,
  },
  {
    ignores: [
      '**/node_modules',
      '**/.next',
      '**/dist',
      '**/build',
      '**/out',
      '**/output',
      '**/public',
      '**/coverage',
      '**/test-results',
      '.agents',
      '.serena',
      'pnpm-lock.yaml',
      'next-env.d.ts',
      '.eslintcache',
    ],
  },
  {
    rules: {
      'new-cap': 'off',
      'vars-on-top': 'off',
      'no-console': 'off',
      'no-empty': 'off',
      'no-restricted-globals': 'off',

      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-useless-escape': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',

      'antfu/consistent-chaining': 'off',
      'antfu/consistent-list-newline': 'off',
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'antfu/no-import-dist': 'off',

      'style/brace-style': 'off',
      'style/comma-dangle': 'off',
      'style/member-delimiter-style': 'off',
      'style/operator-linebreak': 'off',
      'style/quote-props': 'off',

      'ts/ban-ts-comment': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-explicit-any': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unused-vars': 'off',
      'ts/strict-boolean-expressions': 'off',
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/no-nested-component-definitions': 'off',
      'react-dom/no-missing-button-type': 'off',
      '@tanstack/query/no-rest-destructuring': 'off',
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'prettier/prettier': ['warn', { parser: 'markdown' }],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      'prettier/prettier': ['warn', { parser: 'html' }],
    },
  },
  {
    files: ['**/*.css'],
    rules: {
      'prettier/prettier': [
        'warn',
        {
          parser: 'css',
          printWidth: 120,
        },
      ],
    },
  },
);
