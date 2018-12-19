module.exports = {
  ...require('./graphql'),
  modelName: 'Fragment',
  model: require('./fragment'),
  server: () => app => require('./api_fragments')(app),
}
