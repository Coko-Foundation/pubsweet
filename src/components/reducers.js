// const components = require('./components')
const components = PUBSWEET_COMPONENTS
const clientComponent = (component) => component.client || component.frontend

module.exports = components
  .filter(component => clientComponent(component).reducers)
  .map(component => clientComponent(component).reducers)
  .map(reducers => {
    // backwards-compatibility: component exports a function
    if (typeof reducers === 'function') {
      const reducer = reducers()

      return {
        [reducer.default.name]: reducer.default
      }
    }

    // backwards-compatibility: component exports an array of functions
    if (Array.isArray(reducers)) {
      return reducers.map(reducer => reducer())
    }

    // component exports an object where each value is a function
    return Object.keys(reducers).reduce((output, key) => {
      output[key] = reducers[key]()
      return output
    }, {})
  })
