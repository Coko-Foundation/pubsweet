module.exports = {
  server: () => app => require('./endpoint')(app),
  // TODO: No support for job components in the core. Must run standalone.
}
