module.exports = {
  ...require('./graphql'),
  modelName: 'Collection',
  model: require('./blog'),
  extending: '@pubsweet/model-collection',
}
