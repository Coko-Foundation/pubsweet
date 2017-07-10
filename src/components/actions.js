// const components = require('./components')
const components = PUBSWEET_COMPONENTS

module.exports = components
  .filter(component => component.frontend.actions)
  .map(component => component.frontend.actions)
  .map(actions => {
    if (typeof actions === 'function') {
      return actions()
    }

    return actions.map(action => action())
  })
  .reduce((output, actions) => ({...output, ...actions}), {})
