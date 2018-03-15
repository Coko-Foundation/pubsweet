require('dotenv').config()

module.exports = {
  server: () => app => require('./src/EmailBackend')(app),
}
