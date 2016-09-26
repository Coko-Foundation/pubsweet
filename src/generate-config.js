const path = require('path')
const fs = require('fs')
const logger = require('./logger')
const uuid = require('node-uuid')

const configpath = mode => path.join(process.cwd(), 'config', `${mode}.js`)

const configfile = mode => `
const path = require('path')

module.exports = {
  'pubsweet-backend': {
    dbPath: path.join(__dirname, '..', 'api', 'db'),
    secret: '${uuid.v4()}'
  }
}
`

const write = (path, content) => new Promise(
  (resolve, reject) => fs.writeFile(
    path,
    content,
    err => {
      if (err) return reject(err)
      return resolve()
    }
  )
)

module.exports = () => {
  return write(
    configpath('dev'), configfile('dev')
  ).then(
    write(configpath('production'), configfile('production'))
  ).then(
    () => {
      logger.info('Generated app config files')
      require('config') // load config now so it uses the NODE_CONFIG_DIR we set
    }
  ).catch(
    logger.error
  )
}
