const path = require('path')
const fs = require('fs-extra')
const logger = require('./logger')
const uuid = require('node-uuid')

const configpath = mode => path.join(process.cwd(), 'config', `${mode}.js`)

const configfile = mode => `
const path = require('path')
const blogmode = require('authsome/src/modes/blog')

module.exports = {
  'pubsweet-backend': {
    dbPath: path.join(__dirname, '..', 'api', 'db'),
    secret: '${uuid.v4()}',
    API_ENDPOINT: '/api'
  },
  'pubsweet-frontend': {
    theme: 'PepperTheme',
    routes: 'app/routes.jsx',
    navigation: 'app/components/Navigation/Navigation.jsx'
  },
  authsome: {
    mode: blogmode,
    teams: {
      teamContributors: {
        name: 'Contributors',
        permissions: 'create'
      },
      teamCoauthors: {
        name: 'Coauthors',
        permissions: 'update'
      }
    }
  },
  pubsweet: {
    components: ['pubsweet-component-signup', 'pubsweet-component-login']
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
  fs.mkdirsSync(path.join(process.cwd(), 'config'))
  return write(
    configpath(process.env.NODE_ENV), configfile(process.env.NODE_ENV)
  ).catch(
    err => {
      logger.error(err.stack)
      process.exit(1)
    }
  )
}
