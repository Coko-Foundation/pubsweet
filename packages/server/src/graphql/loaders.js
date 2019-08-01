const config = require('config')
const DataLoader = require('dataloader')

const tryRequireRelative = require('../helpers/tryRequireRelative')

// Require components here so that the requires are done only once per app runtime
let components = []
if (
  config.has('pubsweet.components') &&
  Array.isArray(config.get('pubsweet.components'))
) {
  components = config.get('pubsweet.components')
  components = components.map(componentName =>
    tryRequireRelative(componentName),
  )
}

const defaultLoader = model =>
  new DataLoader(ids => model.query().whereIn('id', ids))

module.exports = () => {
  const loaders = {}

  components.forEach(component => {
    if (component.model && component.modelName && component.modelLoaders) {
      // Sets up the default loader, that gets model instances by id
      // You can use it with e.g. context.loaders.User.load(id)
      loaders[component.modelName] = defaultLoader(component.model)
      Object.keys(component.modelLoaders).forEach(loaderName => {
        loaders[component.modelName][loaderName] = new DataLoader(
          component.modelLoaders[loaderName],
        )
      })
    } else if (component.models) {
      // If there are multiple models specified in a single component
      // each can specify its own loaders
      component.models.forEach(model => {
        loaders[model.modelName] = defaultLoader(model.model)
        if (model.modelLoaders) {
          Object.keys(model.modelLoaders).forEach(loaderName => {
            loaders[model.modelName][loaderName] = new DataLoader(
              model.loaders[loaderName],
            )
          })
        }
      })
    }

    // Allows for top-level loaders, which you can use like so:
    // context.loaders.yourCustomLoader.load()
    if (component.loaders) {
      Object.keys(component.loaders).forEach(loaderName => {
        loaders[loaderName] = new DataLoader(component.loaders[loaderName])
      })
    }
  })

  return loaders
}
