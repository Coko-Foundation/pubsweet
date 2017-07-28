// const components = require('./components')
const components = PUBSWEET_COMPONENTS
const clientComponent = (component) => component.client || component.frontend

module.exports = components
  .filter(component => clientComponent(component).actions)
  .map(component => clientComponent(component).actions)
  .map(actions => {
    if (typeof actions === 'function') {
      return actions()
    }

    return actions.map(action => action())
  })
  .reduce((output, actions) => ({...output, ...actions}), {})
