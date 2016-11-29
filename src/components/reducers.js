module.exports = PUBSWEET_COMPONENTS.filter(
  component => component.frontend && component.frontend.reducers
).map(
  component => {
    const reducers = component.frontend.reducers
    if (typeof reducers === 'function') return reducers()
    else return reducers.map(r => r())
  }
)
