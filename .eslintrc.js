const path = require('path');

module.exports = {
  // JavaScript 文件的配置
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['unicorn'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['/android', '/ios'],
      },
    ],
  },
  overrides: [
    // TypeScript 文件的配置
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'tailwindcss',
        'simple-import-sort',
      ],
      extends: [
        'plugin:tailwindcss/recommended',
        '@react-native-community',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'max-params': ['error', 3], // 限制函數參數數量，建議使用對象
        'max-lines-per-function': ['error', 70], // 限制函數每行數量
        'react/destructuring-assignment': 'off', // VSCode 不支持自動解構，添加新變量比較麻煩
        'react/require-default-props': 'off', // 允許未定義的 React props 為 undefined
        '@typescript-eslint/comma-dangle': 'off', // 避免 ESLint 和 Prettier 規則衝突
        '@typescript-eslint/consistent-type-imports': 'error', // 確保在必要時使用 `import type`
        'import/prefer-default-export': 'off', // 使用命名導出更易於自動重構
        'tailwindcss/classnames-order': [
          'warn',
          {
            officialSorting: true,
          },
        ], // 跟隨官方插件 `prettier-plugin-tailwindcss` 的排序
        'simple-import-sort/imports': 'error', // `eslint-plugin-simple-import-sort` 的導入配置
        'simple-import-sort/exports': 'error', // `eslint-plugin-simple-import-sort` 的導出配置
        '@typescript-eslint/no-unused-vars': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
    // 配置翻譯文件 (i18next)
    {
      files: ['src/translations/*.json'],
      extends: ['plugin:i18n-json/recommended'],
      rules: {
        'i18n-json/valid-message-syntax': [
          2,
          {
            syntax: path.resolve('./scripts/i18next-syntax-validation.js'),
          },
        ],
        'i18n-json/valid-json': 2,
        'i18n-json/sorted-keys': [
          2,
          {
            order: 'asc',
            indentSpaces: 2,
          },
        ],
        'i18n-json/identical-keys': [
          2,
          {
            filePath: path.resolve('./src/translations/en.json'),
          },
        ],
        'prettier/prettier': [
          0,
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
      },
    },
    // 測試文件的配置
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
