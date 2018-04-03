module.exports = {
  client: {
    components: [() => require('./UsersManagerContainer')],
  },
  container: require('./UsersManagerContainer'),
}
