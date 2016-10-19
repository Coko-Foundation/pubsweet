module.exports = CONFIG.pubsweet.components.map(
  require
).filter(
  component => component.frontend && component.frontend.reducers
).map(
  component => component.frontend.reducers
)
