const fs = require('fs')
const logger = require('./logger')

module.exports = opts => () => new Promise(
  (resolve, reject) => {
    fs.stat(opts.appPath, (err, stats) => {
      if (err) return resolve()
      if (stats.isDirectory() && fs.readdirSync(opts.appPath).length > 0) {
        logger.info('Target directory exists aready and is non-empty')
        if (opts.override && opts.override.clobber) {
          logger.info('Overwriting any existing files due to --clobber flag')
          return resolve()
        } else {
          logger.error('If you want to overwrite existing files, use --clobber')
          reject()
        }
      } else {
        return resolve()
      }
    })
  }
)
