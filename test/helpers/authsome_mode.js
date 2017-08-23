const get = require('lodash/get')
// function isPublished (fragment) {
//   return fragment.published
// }

// function isOwner (user, object) {
//   if (!object || !object.owners || !user) {
//     return false
//   }

//   for (const ownerId of object.owners) {
//     if (ownerId === user.id) {
//       return true
//     }
//   }
// }

// function teamPermissions (user, operation, object) {
//   if (!user || !Array.isArray(user.teams)) {
//     return false
//   }

//   for (const team of user.teams) {
//     if (team.teamType.permissions === 'create' &&
//         team.object.id === object.id &&
//         operation === 'create') {
//       return true
//     } else if (team.teamType.permissions === 'update' &&
//         team.object.id === object.id &&
//         operation === 'update') {
//       return true
//     }
//   }

//   return false
// }

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

function authenticatedUser (user, operation, object) {
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

  if (get(object, 'type') === 'collection') {
    const collection = object

    // Owner user
    if (collection.owners.includes(user.id)) {
      if (operation === 'GET' || operation === 'DELETE' || operation === 'PATCH') {
        return true
      }
    }

    // If no individual permissions exist (above), return the unauthenticated
    // user's permission
    return unauthenticatedUser(operation, object)
  }
}

var blog = async function (userId, operation, object, context) {
  console.log(arguments)

  // It's up to us to retrieve the relevant models for our
  // authorization/authsome mode, e.g.
  const user = await context.models.User.find(userId)

  // Admins can do anything
  if (user && user.admin === true) return true

  if (user) {
    return authenticatedUser(user, operation, object)
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
