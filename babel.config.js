module.exports = api => {
  api.cache(true)
  const presets = [['@babel/preset-env', { targets: { node: true } }]]
  // const plugins = [ ... ];

  const overrides = [
    {
      test: ['./packages/ui', './docs', './node_modules/wax-prosemirror-core'],
      extends: './packages/ui/.babelrc',
    },
    {
      test: ['./packages/client'],
      extends: './packages/client/.babelrc',
    },
    {
      test: ['./packages/ui-toolkit'],
      presets: ['@babel/preset-env'],
    },
    {
      test: [/\/components\/client/],
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
      ],
    },
    {
      test: ['./components/server/*'],
      presets: [['@babel/preset-env', { targets: { node: true } }]],
    },
    {
      test: ['./packages/server'],
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
    },
  ]

  return {
    presets,
    overrides,
    // plugins
  }
}
