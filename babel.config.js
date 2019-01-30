module.exports = api => {
  api.cache(true)
  const presets = [['@babel/preset-env', { targets: { node: true } }]]
  // const plugins = [ ... ];

  const overrides = [
    {
      test: ['./packages/ui', './packages/client'],
      extends: ['./packages/ui/babel.config.js'],
      // presets: ['@babel/preset-env', '@babel/preset-react'],
      // plugins: [
      //   '@babel/plugin-proposal-class-properties',
      //   '@babel/plugin-transform-runtime',
      // ],
    },

    {
      test: ['./packages/ui-toolkit'],
      presets: ['@babel/preset-env'],
    },
    {
      test: [/\/packages\/components\/(?!model-)/],
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
      ],
    },
    {
      test: ['./packages/components/model-*'],
      presets: [['@babel/preset-env', { targets: { node: true } }]],
    },
  ]

  return {
    presets,
    overrides,
    // plugins
  }
}
