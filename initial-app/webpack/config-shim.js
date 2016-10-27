const config = require('config')

module.exports = Object.assign({}, {
  'pubsweet-backend': config.get('pubsweet-backend'),
  'pubsweet-frontend': config.get('pubsweet-frontend'),
  'pubsweet': config.get('pubsweet'),
  'authsome': config.get('authsome')
})
