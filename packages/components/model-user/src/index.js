module.exports = {
  ...require('./graphql'),
  modelName: 'User',
  model: require('./user'),
  server: () => app => require('./api_users')(app),
}
