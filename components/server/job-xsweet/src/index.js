// TODO: No support for job runners in the core. Must run standalone.
module.exports = {
  server: () => app => require('./endpoint')(app),
  ...require('./graphql'),
}
