const config = require('config')

module.exports = config.get(
  'pubsweet.components'
).map(
  require
).filter(
  component => component.frontend && component.frontend.reducers
).map(
  component => component.frontend.reducers
)
