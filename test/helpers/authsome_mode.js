const get = require('lodash/get')

async function teamPermissions (user, operation, object, context) {
  console.log(arguments)
  const collectionId = get(object, 'params.collectionId')

  if (collectionId) {
    const collection = await context.models.Collection.find(collectionId)

    // Go through a user's teams, if they belong to a team that's based around
    // this particular collection, check what membership in that team allows
    // and return accordingly

    for (const teamId of user.teams) {
      const team = await context.models.Team.find(teamId)

      if (team.teamType.permissions === 'POST' &&
          team.object.id === collection.id &&
          operation === 'POST') {
        return true
      } else if (team.teamType.permissions === 'PATCH' &&
          team.object.id === object.id &&
          operation === 'PATCH') {
        return true
      }
    }
  }
}

function unauthenticatedUser (operation, object) {
  // Public/unauthenticated users can GET /collections, filtered by 'published'
  if (operation === 'GET' && object && object.path === '/collections') {
    return {
      filter: (collection) => collection.published
    }
  }

  // Public/unauthenticated users can GET /collections/:id/fragments, filtered by 'published'
  if (operation === 'GET' && object && object.path === '/collections/:id/fragments') {
    return {
      filter: (fragment) => fragment.published
    }
  }

  // and filtered individual collection's properties: id, title, source, content, owners
  if (operation === 'GET' && object && object.type === 'collection') {
    if (object.published) {
      return {
        filter: (_, key) => ['id', 'title', 'owners'].includes(key)
      }
    }
  }

  if (operation === 'GET' && object && object.type === 'fragment') {
    if (object.published) {
      return {
        filter: (_, key) => ['id', 'title', 'source', 'presentation', 'owners'].includes(key)
      }
    }
  }

  return false
}

async function authenticatedUser (user, operation, object, context) {
  // Allow the authenticated user to POST a collection
  if (operation === 'POST' && object === '/collections/') {
    return true
  }

  // Allow the authenticated user to GET collections they own
  if (operation === 'GET' && object === '/collections/') {
    return {
      filter: (collection) => collection.owners.includes(user.id)
    }
  }

  // Allow owners of a collection to GET its teams, e.g.
  // GET /api/collections/1/teams
  if (operation === 'GET' && get(object, 'path') === '/teams') {
    const collectionId = get(object, 'params.collectionId')
    if (collectionId) {
      const collection = await context.models.Collection.find(collectionId)
      if (collection.owners.includes(user.id)) {
        return true
      }
    }
  }

  // Advanced example
  // Allow authenticated users to create a team based around a collection
  // if they are one of the owners of this collection
  if (['POST', 'PATCH'].includes(operation) && get(object, 'type') === 'team') {
    if (get(object, 'object.type') === 'collection') {
      const collection = await context.models.Collection.find(get(object, 'object.id'))
      if (collection.owners.includes(user.id)) {
        return true
      }
    }
  }

  if (user.teams.length !== 0) {
    const permissions = teamPermissions(user, operation, object, context)
    if (permissions) {
      return permissions
    }
  }

  if (get(object, 'type') === 'collection') {
    const collection = object

    // Owner user
    if (collection.owners.includes(user.id)) {
      if (['GET', 'DELETE', 'PATCH'].includes(operation)) {
        return true
      }
    }
  }

  if (get(object, 'type') === 'user' && get(object, 'id') === user.id) {
    if (['GET', 'DELETE', 'PATCH'].includes(operation)) {
      return true
    }
  }
  // If no individual permissions exist (above), fallback to unauthenticated
  // user's permission
  return unauthenticatedUser(operation, object)
}

var blog = async function (userId, operation, object, context) {
  console.log(arguments)

  // It's up to us to retrieve the relevant models for our
  // authorization/authsome mode, e.g.
  const user = await context.models.User.find(userId)

  // Admins can do anything
  if (user && user.admin === true) return true

  if (user) {
    return authenticatedUser(user, operation, object, context)
  }

  if (!user) {
    return unauthenticatedUser(operation, object)
  }

  // let collection

  // if (object.type === 'collection') {
  //   collection = object
  //   if (isOwner(user, collection)) {
  //     return true
  //   }

  //   if (teamPermissions(user, operation, collection)) {
  //     return true
  //   }
  // } else if (object.type === 'fragment') {
  //   let fragment = object

  //   if (isPublished(fragment) && operation === 'read') {
  //     return true
  //   }

  //   if (isOwner(user, fragment)) {
  //     return true
  //   }

  //   if (teamPermissions(user, operation, fragment)) {
  //     return true
  //   }

  //   if (Array.isArray(fragment.parents)) {
  //     collection = fragment.parents[0]
  //     return teamPermissions(user, operation, collection)
  //   }
  // } else if (object.type === 'user') {
  //   return user.id === object.id
  // }

  return false
}

module.exports = blog
