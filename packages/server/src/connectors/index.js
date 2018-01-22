const { connectorCreator } = require('./creators')
const Collection = require('../models/Collection')
const Fragment = require('../models/Fragment')
const Team = require('../models/Team')
const User = require('../models/User')

module.exports = {
  collection: connectorCreator('collections', Collection),
  fragment: connectorCreator('fragments', Fragment),
  team: connectorCreator('teams', Team),
  user: connectorCreator('users', User),
}
