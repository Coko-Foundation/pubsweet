const logger = require('@pubsweet/logger')

const tryRequireRelative = m => {
  let component
  try {
    component = require(require.resolve(m, { paths: [process.cwd()] }))
  } catch (err) {
    logger.warn(
      `Unable to load component ${m} on the server (likely a client component).`,
    )
    component = {}
  }
  return component
}

module.exports = tryRequireRelative
