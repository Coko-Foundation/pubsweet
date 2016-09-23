const config = require('config')

// Config
const defaultConfig = {
  dbPath: './db/',
  secret: 'example'
}

config.util.setModuleDefaults('pubsweet-backend', defaultConfig)

module.exports = config
