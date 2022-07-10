// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'zammad'],
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '@vue/prettier',
    '@vue/typescript/recommended',
    'prettier',
  ],
  rules: {
    'zammad/zammad-copyright': 'error',
    'zammad/zammad-detect-translatable-string': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Loosen AirBnB's strict rules a bit to allow 'for .. of'
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      // "ForOfStatement",  // We want to allow this
      'LabeledStatement',
      'WithStatement',
    ],

    'no-param-reassign': 'off',

    'func-style': ['error', 'expression'],

    'no-restricted-imports': 'off',

    // Disable the following rule, because it's not relevant for the tool chain and test envoirment.
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'tailwind.config.js',
          'vite.config.ts',
          'app/frontend/build/**',
          'app/frontend/**/*.spec.*',
          'app/frontend/tests/**/*',
          'app/frontend/**/*.stories.ts',
          '.storybook/**/*',
          'app/frontend/cypress/**/*',
        ],
      },
    ],

    // Adding typescript file types, because airbnb doesn't allow this by default.
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/prefer-default-export': 'off',

    // TODO: Add import rule to not allow that "app/**/modules/**" can import from each other and also add a rule that apps/** can not import from other apps.

    /* We strongly recommend that you do not use the no-undef lint rule on TypeScript projects. The checks it provides are already provided by TypeScript without the need for configuration - TypeScript just does this significantly better (Source: https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors). */
    'no-undef': 'off',

    // We need to use the extended 'no-shadow' rule from typescript:
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',

    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['StrictPascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],

    'vue/script-setup-uses-vars': 'error',

    // Don't require a default value for the props.
    'vue/require-default-prop': 'off',

    // Don't require multi word component names.
    'vue/multi-word-component-names': 'off',

    // Enforce v-bind directive usage in short form as error instead of warning
    'vue/v-bind-style': ['error', 'shorthand'],

    // Enforce v-on directive usage in short form as error instead of warning
    'vue/v-on-style': ['error', 'shorthand'],

    // Enforce v-slot directive usage in short form as error instead of warning
    'vue/v-slot-style': ['error', 'shorthand'],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['.storybook/config/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: [
        'app/frontend/tests/**',
        'app/frontend/**/*.spec.*',
        'app/frontend/stories/**',
        'app/frontend/cypress/**',
        'app/frontend/**/*.stories.ts',
        '.eslint-plugin-zammad/**',
        '.eslintrc.js',
      ],
      rules: {
        'zammad/zammad-detect-translatable-string': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/first': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, './app/frontend')],
          ['@mobile', path.resolve(__dirname, './app/frontend/apps/mobile')],
          ['@shared', path.resolve(__dirname, './app/frontend/shared')],
          ['@tests', path.resolve(__dirname, './app/frontend/tests')],
          ['@stories', path.resolve(__dirname, './app/frontend/stories')],
          ['@cy', path.resolve(__dirname, './.cypress')],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        paths: [path.resolve(__dirname, '.storybook/node_modules/')],
      },
    },
    // Adding typescript file types, because airbnb doesn't allow this by default.
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // the typescript-parser for eslint, instead of tslint
    sourceType: 'module', // allow the use of imports statements
    ecmaVersion: 2020, // allow the parsing of modern ecmascript
  },
}
