module.exports = {
  server: () => app => require('./PollingServer')(app),
}
