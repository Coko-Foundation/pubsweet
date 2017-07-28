// const components = require('./components')
const components = PUBSWEET_COMPONENTS
const clientComponent = (component) => component.client || component.frontend

module.exports = components
  .filter(component => clientComponent(component).reducers)
  .map(component => clientComponent(component).reducers)
  .map(reducers => {
    if (typeof reducers === 'function') {
      const reducer = reducers()

      return {
        [reducer.default.name]: reducer.default
      }
    }

    return reducers.map(reducer => reducer())
  })
