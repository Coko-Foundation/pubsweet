const pick = require('lodash/pick')
const AuthorizationError = require('../errors/AuthorizationError')
const NotFoundError = require('../errors/NotFoundError')

module.exports = {
  authorizationError: (username, operation, object) => {
    username = username || 'public'
    const msg = `User ${username} is not allowed to ${operation} ${object}`
    return new AuthorizationError(msg)
  },

  // Build an object containing only the id
  objectId: object => ({ id: object.id }),

  // Build an object containing only the fields of `output` that were in `input`
  // TODO: build a real diff, in case other fields were updated indirectly?
  buildChangeData: (input, output) => {
    const data = {}

    Object.keys(input).forEach(key => {
      // TODO: compare and only add if changed?
      data[key] = output[key]
    })

    return data
  },

  fieldSelector: req => {
    const fields = req.query.fields ? req.query.fields.split(/\s*,\s*/) : null

    return item => fields ? pick(item, fields.concat('id')) : item
  },

  getTeams: async (opts) => {
    let teams
    try {
      teams = await opts.Team.findByField({
        'object.id': opts.id,
        'object.type': opts.type
      })

      teams = await Promise.all(teams.map(async team => {
        let permission = await opts.authsome.can(opts.req.user, opts.req.method, team)
        if (permission) {
          return team
        }
      }))

      teams = teams.filter(team => team !== undefined)
    } catch (err) {
      if (err instanceof NotFoundError) {
        teams = []
      } else {
        throw err
      }
    }

    return teams
  },

  filterFragments: async (opts) => {
    let fragments = opts.fragments

    fragments = await Promise.all(fragments.map(fragment => {
      return opts.authsome.can(opts.req.user, opts.req.method, fragment).then(permission => {
        // Filter fragments' properties
        if (permission.filter) {
          return permission.filter(fragment)
        } else if (permission) {
          return fragment
        }
      })
    }))

    fragments = fragments.filter(fragment => fragment !== undefined)

    // Decorate owners with usernames
    fragments = await Promise.all(fragments.map(f => opts.User.ownersWithUsername(f)))
    fragments = fragments.map(opts.fieldSelector(opts.req))

    return fragments
  }
}
