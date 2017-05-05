const fs = require('fs')
const path = require('path')
const logger = require('./logger')

module.exports = appPath => () => new Promise(
  (resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      // we use an in-memory DB during tests, so skip this check
      return resolve()
    }
    const dbCheckPath = path.join(require('./db-path')(appPath), 'CURRENT')
    fs.stat(dbCheckPath, err => {
      if (err) {
        logger.error('Database appears not to exist')
        logger.error('To create the database for an existing app, see `pubsweet help setupdb`')
        logger.error('To generate a new app, see `pubsweet help new`')
        reject()
      } else {
        return resolve()
      }
    })
  }
)
