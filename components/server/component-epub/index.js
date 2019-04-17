module.exports = {
  server: () => app => require('./EpubBackend')(app),
}
