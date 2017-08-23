const logger = require('pubsweet-logger')
const get = require('simple-get')

module.exports = {
  is: path => /^http/.test(path),
  exists: async url => new Promise(
    resolve => get(url, err => {
      logger.debug('Server err?', err)
      logger.debug('HTTP DB online? ', err ? 'no' : 'yes')
      resolve(!err)
    })
  )
}
