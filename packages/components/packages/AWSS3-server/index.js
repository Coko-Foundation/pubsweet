require('dotenv').config()

module.exports = {
  backend: () => app => require('./src/FileBackend')(app),
}
