const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')

module.exports = opts => () => new Promise(
  (resolve, reject) => {
    const dbPath = require('./db-path')(opts.appPath)
    const dbCheckPath = path.join(dbPath, 'CURRENT')
    fs.stat(dbCheckPath, err => {
      if (err) return resolve()
      logger.info('Database appears to already exist')
      if (opts.override && opts.override.clobber) {
        logger.info('Overwriting existing database due to --clobber flag')
        const dbdirs = fs.readdirSync(path.join(opts.appPath, 'api', 'db'))
        dbdirs.forEach(dbdir => {
          const parts = path.parse(dbdir)
          if ((new RegExp(process.env.NODE_ENV)).test(parts.base)) {
            fs.removeSync(dbdir)
          }
        })
        return resolve()
      } else {
        logger.error('If you want to overwrite the database, use --clobber')
        reject()
      }
    })
  }
)
