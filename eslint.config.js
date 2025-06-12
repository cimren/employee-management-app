// eslint.config.js
import globals from 'globals';
import babelParser from '@babel/eslint-parser';

export default [
  {
    ignores: [
      'src/generated/**/*',
      'dist/**',
      'node_modules/**',
      'coverage/**',
    ],
  },
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.mocha,
        chai: 'readonly',
      },
    },

    rules: {
      'no-unexpected-multiline': 'off',
    },
  },
  {
    files: ['rollup.config.js', 'web-test-runner.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
