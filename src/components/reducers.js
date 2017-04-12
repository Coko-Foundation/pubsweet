module.exports = PUBSWEET_COMPONENTS.filter(
  component => component.frontend && component.frontend.reducers
).map(
  component => {
    const reducers = component.frontend.reducers
    if (typeof reducers === 'function') {
      const r = reducers()
      const re = {}
      re[r.default.name] = r.default
      return re
    } else {
      return reducers.map(r => r())
    }
  }
)
