// const components = require('./components')
const components = PUBSWEET_COMPONENTS

module.exports = components
  .map(component => {
    // handle old style component export
    const clientDef = component.client || component.frontend
    return clientDef && clientDef.reducers
  })
  // filter out falsy values
  .filter(Boolean)
  .map(reducers => {
    // backwards-compatibility: component exports a function or an array of functions
    if (typeof reducers === 'function' || Array.isArray(reducers)) {
      return [].concat(reducers)
        .reduce((output, reducerImporter) => {
          const reducer = reducerImporter().default
          output[reducer.name] = reducer
          return output
        }, {})
    }

    // component exports an object where each value is a function
    return Object.keys(reducers).reduce((output, key) => {
      output[key] = reducers[key]()
      return output
    }, {})
  })
