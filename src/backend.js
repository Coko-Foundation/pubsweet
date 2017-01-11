const path = require('path')
const fs = require('fs')

module.exports = () => path.resolve(
  process.cwd(),
  '.', 'node_modules', 'pubsweet-backend'
)
