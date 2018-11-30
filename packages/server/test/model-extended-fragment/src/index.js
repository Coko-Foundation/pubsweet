module.exports = {
  ...require('./graphql'),
  modelName: 'Fragment',
  model: require('./extended_fragment'),
  extending: '@pubsweet/model-fragment',
}
