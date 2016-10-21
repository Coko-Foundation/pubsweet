module.exports = PUBSWEET_COMPONENTS.filter(
  component => component.frontend && component.frontend.reducers
).map(
  component => component.frontend.reducers
)
