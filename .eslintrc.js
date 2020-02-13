module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
  },
  extends: ['pubsweet'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'react/no-unused-state': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'sort-keys': 0,
  },
  overrides: [
    {
      files: ['*_test.js', '*.test.js', '*.test.jsx', '**/test/**/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
}
