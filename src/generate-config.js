const path = require('path')
const fs = require('fs-extra')

const configpath = mode => path.join(process.cwd(), 'config', `${mode}.js`)

const configfile = mode => `
const path = require('path')
const blogmode = require('authsome/src/modes/blog')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    dbPath: path.join(__dirname, '..', 'api', 'db'),
    API_ENDPOINT: '/api'
  },
  'pubsweet-client': {
    theme: 'PepperTheme'
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
  },
  validations: {
    fragment: {
      kind: Joi.string().required(),
      published: Joi.bool(),
      published_at: Joi.date().iso(),
      status: Joi.string().required()
    }
  }
}
`

const write = (path, content) => new Promise(
  (resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        // file doesn't yet exist
        fs.writeFile(
          path,
          content,
          err => {
            if (err) return reject(err)
            return resolve(path)
          }
        )
      } else {
        // file already exists, don't clobber
        return resolve(path)
      }
    })
  }
)

module.exports = () => {
  fs.mkdirsSync(path.join(process.cwd(), 'config'))
  return write(
    configpath(process.env.NODE_ENV), configfile(process.env.NODE_ENV)
  )
}
