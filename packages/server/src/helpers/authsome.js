const config = require('config')
const Authsome = require('authsome')
const models = require('../models')

const mode = require(config.get('authsome.mode'))

const authsome = new Authsome(
  { ...config.authsome, mode },
  {
    // restrict methods passed to mode since these have to be shimmed on client
    // any changes here should be reflected in the `withAuthsome` component of `pubsweet-client`
    models: {
      Collection: {
        find: id => models.Collection.find(id),
      },
      Fragment: {
        find: id => models.Fragment.find(id),
      },
      User: {
        find: id => models.User.find(id),
      },
      Team: {
        find: id => models.Team.find(id),
      },
    },
  },
)

module.exports = authsome
