module.exports = {
  backend: () => app => require('./InkBackend')(app),
}
