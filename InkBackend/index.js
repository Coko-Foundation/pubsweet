module.exports = {
  backend: () => app => require('./InkBackend.js')(app)
}
