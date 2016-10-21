module.exports = PUBSWEET_COMPONENTS.filter(
  component => component.frontend && component.frontend.actions
).map(
  component => component.frontend.actions
)
