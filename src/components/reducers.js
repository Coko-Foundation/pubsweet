// const components = require('./components')
const components = PUBSWEET_COMPONENTS

module.exports = components
  .filter(component => component.frontend.reducers)
  .map(component => component.frontend.reducers)
  .map(reducers => {
    if (typeof reducers === 'function') {
      const reducer = reducers()

      return {
        [reducer.default.name]: reducer.default
      }
    }

    return reducers.map(reducer => reducer())
  })
