const expect = require('chai').expect

global.window = { localStorage: { token: 'mock' } }

const actions = require('../../src/actions/current_user')
const describeAction = require('../helpers/action')(actions)

describe('current user', () => {

  describeAction('getUser', action => {
    // TODO: test functionality here
  })

})
