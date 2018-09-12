const path = require('path')
const config = require('config')

const resolveRelative = m => require.resolve(m, { paths: [process.cwd()] })
const requireRelative = m => require(resolveRelative(m))

module.exports = () => {
  const migrationsPaths = []

  // load migrations from pubsweet-server
  migrationsPaths.push(
    path.resolve(
      path.dirname(resolveRelative('pubsweet-server')),
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
            path.dirname(resolveRelative(name)),
            component.migrationsPath,
          ),
        )
      }
    })
  }

  return migrationsPaths
}
