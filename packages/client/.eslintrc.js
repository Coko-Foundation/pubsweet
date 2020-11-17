module.exports = {
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./packages/client/dev/*.js'],
      },
    ],
  },
}
