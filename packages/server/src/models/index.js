const models = {
  Collection: './Collection',
  Fragment: './Fragment',
  User: './User',
  Team: './Team',
}

Object.keys(models).forEach((key, _) => {
  module.exports[key] = require(models[key])
})
