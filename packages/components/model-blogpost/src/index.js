module.exports = {
  ...require('./graphql'),
  modelName: 'Fragment',
  model: require('./blogpost'),
  extending: '@pubsweet/model-fragment',
}
