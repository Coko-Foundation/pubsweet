const path = require('path')
const config = require('config')
const requireRelative = require('require-relative')

module.exports = () => {
  const migrationsPaths = []

  // load migrations from pubsweet-server
  migrationsPaths.push(
    path.resolve(
      path.dirname(requireRelative.resolve('pubsweet-server')),
      '..',
      'migrations',
    ),
  )

  // load migrations from app
  if (config.has('dbManager.migrationsPath')) {
    migrationsPaths.push(path.resolve(config.get('dbManager.migrationsPath')))
  }

  // load migrations from components
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(name => {
      const component = requireRelative(name)
      if (component.migrationsPath) {
        migrationsPaths.push(
          path.resolve(
            path.dirname(requireRelative.resolve(name)),
            component.migrationsPath,
          ),
        )
      }
    })
  }

  return migrationsPaths
}
