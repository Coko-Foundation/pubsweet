module.exports = {
  ...require('./graphql'),
  modelName: 'Team',
  model: require('./team'),
  server: () => app => require('./api_teams')(app),
}
