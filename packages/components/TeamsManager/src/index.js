module.exports = {
  client: {
    components: [() => require('./TeamsManagerContainer')],
  },
  container: require('./TeamsManagerContainer'),
}
