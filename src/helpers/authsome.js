
const config = require('config')
const Authsome = require('authsome')
const models = require('../models')
const authsome = new Authsome(config.authsome, {
  // restrict methods passed to mode since these have to be shimmed on client
  // any changes here should be reflected in the `withAuthsome` component of `pubsweet-client`
  models: {
    Collection: {
      find: id => models.Collection.find(id)
    },
    Fragment: {
      find: id => models.Fragment.find(id)
    },
    User: {
      find: id => models.User.find(id)
    },
    Team: {
      find: id => models.Team.find(id)
    }
  }
})

module.exports = authsome
