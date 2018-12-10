module.exports = {
  ...require('./graphql'),
  modelName: 'Collection',
  model: require('./collection'),
  server: () => app => require('./api_collections')(app),
}
