const config = require('config')
const Authsome = require('authsome')

const mode = require(config.get('authsome.mode'))

const models = require('../models')

// be lenient with custom/extended data models based on BaseModel
// and allow them through to authsome in their entirety. If you use this
// you are responsible for providing a similar interface in the client
// as well - if you want your authsome modes to be usable on both platforms.
const context = { models: Object.assign({}, models) }

// more restrictive with core models, restrict methods passed to mode since
// these have to be shimmed in the client (withAuthsome, AuthorizeWithGraphQL)
context.models.Collection = {
  find: models.Collection.find.bind(models.Collection),
}
context.models.Fragment = {
  find: models.Fragment.find.bind(models.Fragment),
}
context.models.User = {
  find: models.User.find.bind(models.User),
}
context.models.Team = {
  find: models.Team.find.bind(models.Team),
}

const authsome = new Authsome({ ...config.authsome, mode }, context)

module.exports = authsome
