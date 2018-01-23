module.exports = {
  backend: () => app => require('./PollingBackend')(app),
}
