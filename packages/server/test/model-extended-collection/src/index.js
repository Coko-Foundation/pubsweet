module.exports = {
  ...require('./graphql'),
  modelName: 'Collection',
  model: require('./extended_collection'),
  extending: '@pubsweet/model-collection',
}
