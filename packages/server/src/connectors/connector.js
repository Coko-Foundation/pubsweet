const { can, canKnowAbout, filterAll } = require('../helpers/authorization')

// create a function which creates a new entity and performs authorization checks
const createCreator = (entityName, EntityModel) => async (input, ctx) => {
  await can(ctx.user, 'create', entityName)
  const entity = new EntityModel(input)
  entity.setOwners([ctx.user])
  await can(ctx.user, 'create', entity)
  const output = await entity.save()
  const outputFilter = await canKnowAbout(ctx.user, output)
  return outputFilter(output)
}

// create a function which deletes an entity and performs authorization checks
const deleteCreator = (entityName, EntityModel) => async (id, ctx) => {
  await can(ctx.user, 'delete', entityName)
  const entity = await EntityModel.find(id)
  const outputFilter = await canKnowAbout(ctx.user, entity)
  await can(ctx.user, 'delete', entity)

  return outputFilter(await entity.delete())
}

// create a function which updates a new entity and performs authorization checks
const updateCreator = (entityName, EntityModel) => async (id, update, ctx) => {
  await can(ctx.user, 'update', entityName)
  const entity = await EntityModel.find(id)
  const outputFilter = await canKnowAbout(ctx.user, entity)
  const currentAndUpdate = { current: entity, update }
  const updateFilter = await can(ctx.user, 'update', currentAndUpdate)

  await entity.updateProperties(updateFilter(update))

  return outputFilter(await entity.save())
}

// create a function which fetches all entities of the
// given model and performs authorization checks
const fetchAllCreator = (entityName, EntityModel) => async ctx => {
  await can(ctx.user, 'read', entityName)

  const entities = await EntityModel.all()
  return filterAll(ctx.user, entities)
}

// create a function which fetches by ID a single entity
// of the given model and performs authorization checks
const fetchOneCreator = (entityName, EntityModel) => async (id, ctx) => {
  await can(ctx.user, 'read', entityName)

  const entity = await EntityModel.find(id)
  const outputFilter = await canKnowAbout(ctx.user, entity)
  return outputFilter(entity)
}

// create a function which fetches a number of entities by ID
// and delegates authorization checks
const fetchSomeCreator = fetchOne => (ids, ctx) =>
  ids ? Promise.all(ids.map(id => fetchOne(id, ctx))) : []

// create a connector object with fetchers for all, one and some
module.exports = function connector(entityName, EntityModel) {
  const create = createCreator(entityName, EntityModel)
  const del = deleteCreator(entityName, EntityModel)
  const update = updateCreator(entityName, EntityModel)
  const fetchAll = fetchAllCreator(entityName, EntityModel)
  const fetchOne = fetchOneCreator(entityName, EntityModel)
  const fetchSome = fetchSomeCreator(fetchOne)

  return {
    create,
    delete: del,
    update,
    fetchAll,
    fetchOne,
    fetchSome,
  }
}
