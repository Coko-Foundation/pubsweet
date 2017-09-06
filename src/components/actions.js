// const components = require('./components')
const components = PUBSWEET_COMPONENTS

module.exports = components
  .map(component => {
    // handle old style component export
    const clientDef = component.client || component.frontend
    return clientDef && clientDef.actions
  })
  // filter out falsy values
  .filter(Boolean)
  .map(actions => {
    if (typeof actions === 'function') {
      return actions()
    }

    return actions.reduce((output, actionImporter) => ({...output, ...actionImporter()}), {})
  })
  .reduce((output, actions) => ({...output, ...actions}), {})
