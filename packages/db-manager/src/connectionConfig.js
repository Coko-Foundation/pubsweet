const config = require('config')

const connection =
  process.env.DATABASE_URL ||
  (config['pubsweet-server'] && config['pubsweet-server'].db)

module.exports = connection
