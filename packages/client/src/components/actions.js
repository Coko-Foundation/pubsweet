// const components = require('./components')
const components = PUBSWEET_COMPONENTS

module.exports = components
  .map(component => {
    // handle old style component export
    const clientDef = component.client || component.frontend
    const actions = clientDef && clientDef.actions

    if (actions && typeof actions === 'function') {
      return actions
    }

    if (actions) {
      throw new Error("Component's actions are not exported as a function")
    }

    return null
  })
  // filter out falsy values
  .filter(Boolean)
  .map(actions => actions())
  .reduce((output, actions) => ({ ...output, ...actions }), {})
