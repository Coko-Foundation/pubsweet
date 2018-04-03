module.exports = {
  backend: () => app => require('./EpubBackend')(app),
}
