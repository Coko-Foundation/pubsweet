const _ = require('lodash')
const AuthorizationError = require('../errors/AuthorizationError')
const NotFoundError = require('../errors/NotFoundError')

const Util = {}
Util.authorizationError = (username, operation, object) => {
  const errorDetails = object.type
    ? `${object.type} ${object.id}`
    : JSON.stringify(object)

  username = username || 'public'
  const msg = `User ${username} is not allowed to ${operation} ${errorDetails}`

  return new AuthorizationError(msg)
}

// Build an object containing only the id
Util.objectId = object => ({ id: object.id })

// Build an object containing only the fields of `output` that were in `input`
// TODO: build a real diff, in case other fields were updated indirectly?
Util.buildChangeData = (input, output) => {
  const data = {}

  Object.keys(input).forEach(key => {
    // TODO: compare and only add if changed?
    data[key] = output[key]
  })

  return data
}

Util.createFilterFromQuery = query => {
  const filterPaths = _.difference(_.keys(query), ['fields'])
  return item =>
    filterPaths.every(
      filterPath =>
        _.has(item, filterPath) &&
        String(_.get(item, filterPath)) === query[filterPath],
    )
}

Util.fieldSelector = req => {
  const fields = req.query.fields ? req.query.fields.split(/\s*,\s*/) : null

  return item => (fields ? _.pick(item, fields.concat('id', 'rev')) : item)
}

Util.getTeams = async opts => {
  const authsome = require('../helpers/authsome')

  let teams
  try {
    teams = await opts.Team.query().where(
      'object',
      JSON.stringify({
        id: opts.id,
        type: opts.type,
      }),
    )

    teams = await Promise.all(
      teams.map(async team => {
        const permission = await authsome.can(
          opts.req.user,
          opts.req.method,
          team,
        )
        return permission ? team : undefined
      }),
    )

    teams = teams.filter(team => team !== undefined)
  } catch (err) {
    if (err instanceof NotFoundError) {
      teams = []
    } else {
      throw err
    }
  }

  return teams
}

/**
 * Load a fragment from the database, using `:fragmentId` from the route.
 *
 * @param {object} opts Options
 * @param {object} opts.req Request
 * @param {object} opts.Collection Collection model
 * @param {object} opts.Fragment Fragment model
 *
 * @throws {NotFoundError} Thrown if the Collection doesn't exist, the collection doesn't contain the given Fragment, or the fragment doesn't exist.
 *
 * @returns {Promise<Fragment>}
 */
Util.getFragment = async opts => {
  const collection = await opts.Collection.find(opts.req.params.collectionId)
  const { fragmentId } = opts.req.params
  if (!collection.fragments.includes(fragmentId)) {
    throw new NotFoundError(
      `collection ${collection.id} does not contain fragment ${fragmentId}`,
    )
  }

  return opts.Fragment.find(fragmentId)
}

/**
 * Check that the current user can perform this action (HTTP verb) on the given object or route.
 *
 * If required, the output is filtered.
 * @param {object} opts Options
 * @param {object} opts.req Request
 * @param {*} opts.target The subject of the permissions check
 * @param {*} opts.filterable An optional thing to be filtered instead of the target
 * @param {*} opts.authorizationError AuthorizationError
 *
 * @throws {AuthorizationError} if permission is not granted.
 *
 * @returns {Promise} The (possibly filtered) target, if permission is granted
 */
Util.applyPermissionFilter = async opts => {
  const authsome = require('../helpers/authsome')
  const permission = await authsome.can(
    opts.req.user,
    opts.req.method,
    opts.target,
  )

  if (!permission) {
    throw Util.authorizationError(opts.req.user, opts.req.method, opts.target)
  }

  const object = opts.filterable || opts.target
  return permission.filter ? permission.filter(object) : object
}

module.exports = Util
