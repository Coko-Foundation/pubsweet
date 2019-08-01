const { ref, lit } = require('objection')

// create a function which creates a new entity and performs authorization checks
const createCreator = (entityName, EntityModel) => async (
  input,
  ctx,
  options,
) => {
  await ctx.helpers.can(ctx.user, 'create', entityName)
  const entity = new EntityModel(input)
  entity.setOwners([ctx.user])
  if (entity.owners) {
    input.owners = entity.owners
  }
  // Filter input based on authorization
  const inputFilter = await ctx.helpers.can(ctx.user, 'create', entity)
  const filteredInput = inputFilter(input)

  let query = EntityModel.query().insertGraphAndFetch(filteredInput, options)

  query = options && options.eager ? query.eager(options.eager) : query
  const output = await query
  // Filter output based on authorization
  const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, output)
  return outputFilter(output)
}

// create a function which deletes an entity and performs authorization checks
const deleteCreator = (entityName, EntityModel) => async (id, ctx) => {
  await ctx.helpers.can(ctx.user, 'delete', entityName)
  const entity = await EntityModel.find(id)
  const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, entity)
  await ctx.helpers.can(ctx.user, 'delete', entity)

  return outputFilter(await entity.delete())
}

// create a function which updates a new entity and performs authorization checks
const updateCreator = (entityName, EntityModel) => async (
  id,
  update,
  ctx,
  options,
) => {
  await ctx.helpers.can(ctx.user, 'update', entityName)
  const entity = await EntityModel.find(id)
  const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, entity)
  const currentAndUpdate = { current: entity, update }
  const updateFilter = await ctx.helpers.can(
    ctx.user,
    'update',
    currentAndUpdate,
  )

  const filteredUpdate = updateFilter(update)
  // The default is data consistency / data loss minimizing
  options = { relate: true, unrelate: true, ...options }

  let query = EntityModel.query().upsertGraphAndFetch(
    {
      id,
      ...filteredUpdate,
    },
    options,
  )

  query = options && options.eager ? query.eager(options.eager) : query
  const updated = await query

  return outputFilter(updated)
}

// create a function which fetches all entities of the
// given model and performs authorization checks
const fetchAllCreator = (entityName, EntityModel) => async (
  where,
  ctx,
  options,
) => {
  await ctx.helpers.can(ctx.user, 'read', entityName)

  let query
  if (where) {
    const { _json } = where
    delete where._json
    query = EntityModel.query().where(where)

    // Add appropriate JSON conditionals
    if (_json) {
      _json.forEach(condition => {
        query = query.where(
          ref(condition.ref),
          '=',
          lit(condition.value).castJson(),
        )
      })
    }

    const { _relations } = where
    delete where._relations

    // Add conditionals for related ids
    if (_relations) {
      _relations.forEach(condition => {
        if (condition.ids) {
          condition.ids.forEach((id, index) => {
            const alias = `${condition.relation}_${index}`
            query = query
              .joinRelation(`${condition.relation} as ${alias}`)
              .where(`${alias}.id`, id)
          })
        } else if (condition.object) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, value] of Object.entries(condition.object)) {
            query = query
              .joinRelation(condition.relation)
              .where(`${condition.relation}.${key}`, value)
          }
        }
      })
    }
  } else {
    query = EntityModel.query()
  }

  query = options && options.eager ? query.eager(options.eager) : query
  const entities = await query

  return ctx.helpers.filterAll(ctx.user, entities)
}

// create a function which fetches by ID a single entity
// of the given model and performs authorization checks
const fetchOneCreator = (entityName, EntityModel) => async (
  id,
  ctx,
  options,
) => {
  await ctx.helpers.can(ctx.user, 'read', entityName)

  const entity = await ctx.loaders[entityName].load(id)

  const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, entity)
  return outputFilter(entity)
}

// create a function which fetches a number of entities by ID
// and delegates authorization checks
const fetchSomeCreator = fetchOne => (ids, ctx) =>
  ids ? Promise.all(ids.map(id => fetchOne(id, ctx))) : []

const fetchRelatedCreator = (entityName, EntityModel) => async (
  id,
  relation,
  where,
  ctx,
) => {
  let entities
  const entity = await ctx.loaders[entityName].load(id)
  if (where) {
    entities = await entity.$relatedQuery(relation).where(where)
  } else {
    entities = await entity.$relatedQuery(relation)
  }
  if (Array.isArray(entities)) {
    return ctx.helpers.filterAll(ctx.user, entities)
  }
  const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, entities)
  return outputFilter(entities)
}

// create a connector object with fetchers for all, one and some
module.exports = function connector(entityName, EntityModel) {
  const create = createCreator(entityName, EntityModel)
  const del = deleteCreator(entityName, EntityModel)
  const update = updateCreator(entityName, EntityModel)
  const fetchAll = fetchAllCreator(entityName, EntityModel)
  const fetchOne = fetchOneCreator(entityName, EntityModel)
  const fetchSome = fetchSomeCreator(fetchOne)
  const fetchRelated = fetchRelatedCreator(entityName, EntityModel)

  return {
    create,
    delete: del,
    update,
    fetchAll,
    fetchOne,
    fetchSome,
    fetchRelated,
    model: EntityModel,
  }
}
