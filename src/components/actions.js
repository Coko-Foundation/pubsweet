// const config = require('config')

module.exports = CONFIG.pubsweet.components.map(
  require
).filter(
  component => component.frontend && component.frontend.actions
).map(
  component => component.frontend.actions
)
