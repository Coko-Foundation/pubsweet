const path = require('path')

module.exports = {
  ...require('./graphql'),
  modelName: 'Manuscript',
  model: require('./manuscript'),
  extending: path.resolve(__dirname, '..', '..', 'data-model-component'),
}
