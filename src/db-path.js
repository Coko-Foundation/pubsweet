const path = require('path')

module.exports = appPath => path.join(
  appPath, 'api', 'db', process.env.NODE_ENV
)
