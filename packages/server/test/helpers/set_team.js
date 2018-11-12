const STATUS = require('http-status-codes')

const api = require('./api')
const fixtures = require('../fixtures/fixtures')

module.exports = (members, collection, team) =>
  api.users.authenticate.post(fixtures.user).then(token => {
    team.name = 'Test team'
    team.members = members
    team.object = {
      objectId: collection.id,
      objectType: 'collection',
    }

    return api.teams.post(team, token).expect(STATUS.CREATED)
  })
