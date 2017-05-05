module.exports = {
  backend: () => app => require('./EpubBackend.js')(app)
}
