// const components = require('./components')
const isPlainObject = require('lodash/isPlainObject')

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
    if (typeof reducers === 'function') {
      const reducer = reducers()
      return {
        [reducer.default.name]: reducer.default,
      }
    } else if (isPlainObject(reducers)) {
      // component exports an object where each value is a function
      return Object.keys(reducers).reduce((output, key) => {
        output[key] = reducers[key]()
        return output
      }, {})
    }

    throw new Error("Component's reducers are exported incorrectly")
  })
