module.exports = {
  server: () => app => require('./InkBackend')(app),
}
