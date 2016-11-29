module.exports = PUBSWEET_COMPONENTS.filter(
  component => component.frontend && component.frontend.actions
).map(
  component => {
    const actions = component.frontend.actions
    if (typeof actions === 'function') return actions()
    else return actions.map(r => r())
  }
)
