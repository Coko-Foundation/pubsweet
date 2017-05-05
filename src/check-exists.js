const fs = require('fs')
const logger = require('./logger')

module.exports = appPath => () => new Promise(
  (resolve, reject) => {
    fs.stat(appPath, (err, stats) => {
      if (err) return reject(err)
      if (stats.isDirectory()) return resolve()
      logger.error('Path must be a directory containing a pubsweet app')
      logger.error('The path you provided is not a directory')
      logger.error('To generate a new app, see `pubsweet help new`')
      reject()
    })
  }
)
