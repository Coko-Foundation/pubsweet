const STATUS = require('http-status-codes')

const api = require('./api')
const fixtures = require('../fixtures/fixtures')

module.exports = (members, collection, team) => {
  return api.users.authenticate.post(
    fixtures.user
  ).then(
    (token) => {
      team.name = 'Test team'
      team.members = members
      team.objectId = collection.id

      return api.teams.post(
        team, collection, token
      ).expect(
        STATUS.CREATED
      )
    }
  )
}
