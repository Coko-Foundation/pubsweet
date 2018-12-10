const get = require('lodash/get')
const pickBy = require('lodash/pickBy')
const omit = require('lodash/omit')

async function teamPermissions(user, operation, object, context) {
  const collection = get(object, 'collection')

  if (collection) {
    // Go through a user's teams, if they belong to a team that's based around
    // this particular collection, check what membership in that team allows
    // and return accordingly

    // eslint-disable-next-line no-restricted-syntax
    for (const teamId of user.teams) {
      // eslint-disable-next-line no-await-in-loop
      const team = await context.models.Team.find(teamId)

      if (
        team.teamType === 'teamContributors' &&
        team.object.id === collection.id &&
        operation === 'POST'
      ) {
        return true
      } else if (
        team.teamType === 'teamCoauthors' &&
        team.object.id === object.id &&
        operation === 'PATCH'
      ) {
        return true
      }
    }
  }

  return false
}

function unauthenticatedUser(operation, object) {
  // Public/unauthenticated users can GET /collections, filtered by 'published'
  if (operation === 'GET' && object && object.path === '/api/collections') {
    return {
      filter: collections =>
        collections.filter(collection => collection.published),
    }
  }

  // Public/unauthenticated users can GET /collections/:id/fragments, filtered by 'published'
  if (
    operation === 'GET' &&
    object &&
    object.path === '/api/collections/:id/fragments'
  ) {
    return {
      filter: fragments => fragments.filter(fragment => fragment.published),
    }
  }

  // and filtered individual collection's properties: id, title, source, content, owners
  if (operation === 'GET' && object && object.type === 'collection') {
    if (object.published) {
      return {
        filter: collection =>
          pickBy(collection, (_, key) =>
            ['id', 'title', 'owners'].includes(key),
          ),
      }
    }
  }

  if (operation === 'GET' && object && object.type === 'fragment') {
    if (object.published) {
      return {
        filter: fragment =>
          pickBy(fragment, (_, key) =>
            ['id', 'title', 'source', 'presentation', 'owners'].includes(key),
          ),
      }
    }
  }

  return false
}

async function authenticatedUser(user, operation, object, context) {
  // Allow the authenticated user to POST a collection (but not with a 'filtered' property)
  if (operation === 'POST' && object.path === '/api/collections') {
    return {
      filter: collection => omit(collection, 'filtered'),
    }
  }

  if (operation === 'collection:create') {
    return {
      filter: payload => ({
        collection: pickBy(payload.collection, (_, key) =>
          ['id', 'title'].includes(key),
        ),
      }),
    }
  }

  // Allow the authenticated user to GET collections they own
  if (operation === 'GET' && object === '/collections/') {
    return {
      filter: collection => collection.owners.includes(user.id),
    }
  }

  // Allow owners of a collection to GET its teams, e.g.
  // GET /api/collections/1/teams
  if (operation === 'GET' && get(object, 'path') === '/api/teams') {
    const collectionId = get(object, 'params.collectionId')
    if (collectionId) {
      const collection = await context.models.Collection.find(collectionId)
      if (collection.owners.includes(user.id)) {
        return true
      }
    }
  }

  if (
    operation === 'GET' &&
    get(object, 'type') === 'team' &&
    get(object, 'object.type') === 'collection'
  ) {
    const collection = await context.models.Collection.find(
      get(object, 'object.id'),
    )
    if (collection.owners.includes(user.id)) {
      return true
    }
  }

  // Advanced example
  // Allow authenticated users to create a team based around a collection
  // if they are one of the owners of this collection
  if (get(object, 'path') === '/api/teams' && operation === 'POST') {
    if (operation === 'POST') {
      if (get(object, 'team.object.type') === 'collection') {
        const collectionId = get(object, 'team.object.id')
        const collection = await context.models.Collection.find(collectionId)
        if (collection.owners.includes(user.id)) {
          return true
        }
      }
    }
  }

  // Allow authenticated users to add/remove team members of a team based
  // around a collection if they are one of the owners of this collection
  if (get(object, 'current.type') === 'team' && operation === 'PATCH') {
    if (get(object, 'current.object.type') === 'collection') {
      const collectionId = get(object, 'current.object.id')
      const collection = await context.models.Collection.find(collectionId)
      if (collection.owners.includes(user.id)) {
        // But they shouldn't be able to change the object of the Team
        return {
          filter: team => omit(team, 'object'),
        }
      }
    }
  }

  if (user.teams.length !== 0) {
    const permissions = await teamPermissions(user, operation, object, context)

    if (permissions) {
      return permissions
    }
  }

  if (get(object, 'type') === 'fragment') {
    const fragment = object

    if (fragment.owners.includes(user.id)) {
      return true
    }
  }

  if (get(object, 'type') === 'collection') {
    const collection = object

    // Owner user
    if (collection.owners.includes(user.id)) {
      if (['GET', 'DELETE'].includes(operation)) {
        return true
      }
    }
  }

  if (operation === 'PATCH') {
    if (['collection', 'fragment'].includes(get(object, 'current.type'))) {
      if (get(object, 'current.owners').includes(user.id)) {
        return {
          filter: collection => omit(collection, 'filtered'),
        }
      }
    }

    // A user can PATCH itself, but not to become an admin
    if (
      get(object, 'current.type') === 'user' &&
      get(object, 'current.id') === user.id &&
      operation === 'PATCH'
    ) {
      if (get(object, 'current.admin') === true) {
        return true
      } else if (get(object, 'update.admin') === true) {
        return false
      }

      return true
    }
  }

  // A user can GET, DELETE itself
  if (get(object, 'type') === 'user' && get(object, 'id') === user.id) {
    if (['GET', 'DELETE'].includes(operation)) {
      return true
    }
  }

  // filter user properties on login
  if (operation === 'POST' && get(object, 'type') === 'user') {
    return {
      filter: body => omit(body, ['passwordHash']),
    }
  }

  // If no individual permissions exist (above), fallback to unauthenticated
  // user's permission
  return unauthenticatedUser(operation, object)
}

const authsomeMode = async (userId, operation, object, context) => {
  if (!userId) {
    return unauthenticatedUser(operation, object)
  }

  // It's up to us to retrieve the relevant models for our
  // authorization/authsome mode, e.g.
  const user = await context.models.User.find(userId)

  // Admins can do anything
  if (user && user.admin === true) return true

  if (user) {
    return authenticatedUser(user, operation, object, context)
  }

  return false
}

module.exports = authsomeMode
