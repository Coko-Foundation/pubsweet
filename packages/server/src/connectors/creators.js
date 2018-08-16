const authsome = require('../helpers/authsome')
const AuthorizationError = require('../errors/AuthorizationError')
const NotFoundError = require('../errors/NotFoundError')

// check permissions or throw authorization error
async function can(userId, verb, entity) {
  const permission = await authsome.can(userId, verb, entity)
  if (!permission) {
    throw new AuthorizationError(
      `Operation not permitted: ${verb} ${entity.type || entity}`,
    )
  }
  // return identity if no filter function
  return permission.filter || (id => id)
}

// check 'read' permissions or throw not found error (to avoid leaking the existence of data)
async function canKnowAbout(userId, entity) {
  const permission = await authsome.can(userId, 'read', entity)
  if (!permission) {
    throw new NotFoundError(
      `Object not found: ${entity.type} with id ${entity.id}`,
    )
  }
  // return identity if no filter function
  return permission.filter || (id => id)
}

// create a function which creates a new entity and performs authorization checks
function createCreator(entityName, EntityModel) {
  return async (input, ctx) => {
    await can(ctx.user, 'create', entityName)
    const entity = new EntityModel(input)
    entity.setOwners([ctx.user])
    await can(ctx.user, 'create', entity)
    const output = await entity.save()
    const outputFilter = await canKnowAbout(ctx.user, output)
    return outputFilter(output)
  }
}

// create a function which deletes an entity and performs authorization checks
function deleteCreator(entityName, EntityModel) {
  return async (id, ctx) => {
    await can(ctx.user, 'delete', entityName)
    const entity = await EntityModel.find(id)
    const outputFilter = await canKnowAbout(ctx.user, entity)
    await can(ctx.user, 'delete', entity)

    return outputFilter(await entity.delete())
  }
}

// create a function which updates a new entity and performs authorization checks
function updateCreator(entityName, EntityModel) {
  return async (id, update, ctx) => {
    await can(ctx.user, 'update', entityName)
    const entity = await EntityModel.find(id)
    const outputFilter = await canKnowAbout(ctx.user, entity)
    const currentAndUpdate = { current: entity, update }
    const updateFilter = await can(ctx.user, 'update', currentAndUpdate)

    await entity.updateProperties(updateFilter(update))

    return outputFilter(await entity.save())
  }
}

// create a function which fetches all entities of the
// given model and performs authorization checks
function fetchAllCreator(entityName, EntityModel) {
  return async ctx => {
    await can(ctx.user, 'read', entityName)

    const entities = await EntityModel.all()
    // check permissions (in parallel) and swallow exceptions
    const permissions = await Promise.all(
      entities.map(entity => can(ctx.user, 'read', entity).catch(() => false)),
    )

    // apply permissions
    return entities.reduce((filtered, entity, index) => {
      const permissionOrFilter = permissions[index]

      if (permissionOrFilter) {
        filtered.push(permissionOrFilter(entity))
      }
      return filtered
    }, [])
  }
}

// create a function which fetches by ID a single entity
// of the given model and performs authorization checks
function fetchOneCreator(entityName, EntityModel) {
  return async (id, ctx) => {
    await can(ctx.user, 'read', entityName)

    const entity = await EntityModel.find(id)
    const outputFilter = await canKnowAbout(ctx.user, entity)
    return outputFilter(entity)
  }
}

// create a function which fetches a number of entities by ID
// and delegates authorization checks
function fetchSomeCreator(fetchOne) {
  return (ids, ctx) =>
    ids ? Promise.all(ids.map(id => fetchOne(id, ctx))) : []
}

// create a connector object with fetchers for all, one and some
function connectorCreator(entityName, EntityModel) {
  const create = createCreator(entityName, EntityModel)
  const del = deleteCreator(entityName, EntityModel)
  const update = updateCreator(entityName, EntityModel)
  const fetchAll = fetchAllCreator(entityName, EntityModel)
  const fetchOne = fetchOneCreator(entityName, EntityModel)
  const fetchSome = fetchSomeCreator(fetchOne)

  return { create, delete: del, update, fetchAll, fetchOne, fetchSome }
}

module.exports = { connectorCreator }
